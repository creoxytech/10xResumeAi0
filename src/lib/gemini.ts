import { GoogleGenAI } from "@google/genai";
import type { ResumeData } from "../types/resume";

const FALLBACK_KEYS = (import.meta.env.VITE_GEMINI_API_KEYS || "")
  .split(",")
  .map((k: string) => k.trim())
  .filter(Boolean);

let currentKeyIndex = 0;

function getAvailableKey(): string | null {
  if (FALLBACK_KEYS.length === 0) return null;
  return FALLBACK_KEYS[currentKeyIndex];
}

function rotateKey() {
  currentKeyIndex = (currentKeyIndex + 1) % FALLBACK_KEYS.length;
  console.log("Rotated to next Gemini API key");
}

export type ChatMessage = { role: "user" | "model"; content: string };

export async function chatRespond(chatHistory: ChatMessage[]): Promise<string> {
  const attempts = Math.max(FALLBACK_KEYS.length, 1);
  for (let attempt = 0; attempt < attempts; attempt++) {
    const apiKey = getAvailableKey();
    if (!apiKey) {
      return "No Gemini API keys configured. Please add VITE_GEMINI_API_KEYS to your .env.local file.";
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `
You are an elite, concise AI Resume Assistant. Help the user build a stunning, ATS-optimized resume.
When greeting for the first time, briefly introduce yourself.
RULE 1 (BE CONCISE):
Never output long text, full resume drafts, or raw JSON/markdown in chat.
Use chat only for sharp questions, quick suggestions, and confirmations.
The resume preview canvas shows the actual content — let it speak.
RULE 2 (AUTO-APPLY CHANGES):
When you say you're making a change, it is automatically applied.
- Templates: "classic", "modern", "minimal", "professional", "creative", "executive", "academic", "tech"
- Text Sizing: "small" (to fit more on one page), "normal", "large"
- Spacing: "compact" (tighter margins), "normal", "relaxed"
- Custom Sections (e.g., Projects, Languages, Certifications)
- Layout modes: "list", "progress-bars", "tags", "grid"
- Content Upgrades: rewrite/improve structure and bullet points
Guide efficiently. Suggest strong structures. Keep responses short and focused on the next action.
`;
      const contents = chatHistory.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      // In the @google/genai version, we pass 'contents' to 'generateContent'
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return response.text || "I'm sorry, I couldn't understand that.";
    } catch (error) {
      console.error("Gemini Chat API Error:", error);
      const err = error as Error & { status?: number };
      if (err?.status === 429 || err?.message?.toLowerCase().includes("quota")) {
        console.warn("Rate limited on chat, rotating key...");
        rotateKey();
      } else {
        rotateKey();
      }
    }
  }

  return "I'm having trouble connecting right now due to API rate limits. Please try again soon.";
}

export async function extractResumeData(
  chatHistory: ChatMessage[],
  currentData: ResumeData
): Promise<ResumeData | null> {
  const attempts = Math.max(FALLBACK_KEYS.length, 1);

  for (let attempt = 0; attempt < attempts; attempt++) {
    const apiKey = getAvailableKey();
    if (!apiKey) {
      return null;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are a precise data extractor module. Your entire goal is to review a conversation between a Resume Assistant and a User, and then output an updated structured JSON object for their resume.
You MUST output ONLY valid JSON matching exactly the structure Below. NO markdown formatting, NO extra conversational text.

Current Resume State:
${JSON.stringify(currentData, null, 2)}

Chat History:
${JSON.stringify(chatHistory, null, 2)}

Instructions:
1. Merge any new information from the Chat History into the Current Resume State.
2. If the user provided their name, email, phone, update personalInfo.
3. If they added a job, append it to workExperience.
4. If they listed skills, update the skills array.
5. If they mentioned a degree, update education.
6. For anything else that doesn't fit (e.g., Projects, Awards, Certifications, Languages, Publications), create a new object in the 'customSections' array. Use your intelligence to give it an appropriate 'sectionTitle' and categorize the items. Ensure EVERY field in the customSection item exists. For missing text use "", missing arrays use [], missing numbers use 0.
7. The JSON structure MUST be:
{
  "personalInfo": {
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "location": string,
    "summary": string,
    "title": string
  },
  "education": [
    {
      "institution": string,
      "degree": string,
      "startDate": string,
      "endDate": string
    }
  ],
  "workExperience": [
    {
      "company": string,
      "position": string,
      "startDate": string,
      "endDate": string,
      "description": [string]
    }
  ],
  "skills": [string],
  "customSections": [
    {
      "sectionTitle": string,
      "layoutMode": "list" | "progress-bars" | "tags" | "grid",
      "items": [
        {
          "title": string,
          "subtitle": string | "",
          "date": string | "",
          "description": [string],
          "level": number | 0
        }
      ]
    }
  ],
  "theme": {
    "primaryColor": string,
    "fontFamily": string,
    "fontSize": "small" | "normal" | "large",
    "documentSpacing": "compact" | "normal" | "relaxed"
  },
  "templateId": string
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      });

      const responseText = response.text || "{}";
      return JSON.parse(responseText) as ResumeData;
    } catch (error) {
      console.error("Gemini Extraction Error:", error);
      const err = error as Error & { status?: number };
      if (err?.status === 429 || err?.message?.toLowerCase().includes("quota")) {
        console.warn("Rate limited on extraction, rotating key...");
        rotateKey();
      } else {
        rotateKey();
      }
    }
  }

  return null;
}

export async function extractDataFromFile(
  base64Data: string,
  mimeType: string
): Promise<ResumeData | null> {
  const attempts = Math.max(FALLBACK_KEYS.length, 1);

  for (let attempt = 0; attempt < attempts; attempt++) {
    const apiKey = getAvailableKey();
    if (!apiKey) {
      return null;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are a precise data extractor module. Your goal is to review the attached Resume document (which could be an image or a PDF) and extract ALL professional information into a structured JSON object.
You MUST output ONLY valid JSON matching exactly the structure Below. NO markdown formatting, NO extra conversational text.

Extract the person's name, contact info, summary, work experience, education, and skills. Do your best to categorize everything accurately. Put anything else (Projects, Certifications, Awards, Languages, etc) into the customSections array. Ensure EVERY field in the customSection item exists (use "", [], or 0 for missing data).

The JSON structure MUST be:
{
  "personalInfo": {
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "location": string,
    "summary": string,
    "title": string
  },
  "education": [
    {
      "institution": string,
      "degree": string,
      "startDate": string,
      "endDate": string
    }
  ],
  "workExperience": [
    {
      "company": string,
      "position": string,
      "startDate": string,
      "endDate": string,
      "description": [string]
    }
  ],
  "skills": [string],
  "theme": {
    "primaryColor": string,
    "fontFamily": string,
    "fontSize": "small" | "normal" | "large",
    "documentSpacing": "compact" | "normal" | "relaxed"
  },
  "templateId": string,
  "customSections": [
    {
      "sectionTitle": string,
      "layoutMode": "list" | "progress-bars" | "tags" | "grid",
      "items": [
        {
          "title": string,
          "subtitle": string | "",
          "date": string | "",
          "description": [string],
          "level": number | 0
        }
      ]
    }
  ]
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          }
        ],
        config: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      });

      const responseText = response.text || "{}";
      return JSON.parse(responseText) as ResumeData;
    } catch (error) {
      console.error("Gemini File Extraction Error:", error);
      const err = error as Error & { status?: number };
      if (err?.status === 429 || err?.message?.toLowerCase().includes("quota")) {
        console.warn("Rate limited on file extraction, rotating key...");
        rotateKey();
      } else {
        rotateKey();
      }
    }
  }

  return null;
}
