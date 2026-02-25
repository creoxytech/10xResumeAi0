export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  title: string;
  imageUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface CustomSectionItem {
  title?: string;
  subtitle?: string;
  date?: string;
  description?: string[];
  level?: number;
}

export type LayoutMode = 'list' | 'progress-bars' | 'tags' | 'grid';

export interface CustomSection {
  sectionTitle: string;
  layoutMode?: LayoutMode;
  items: CustomSectionItem[];
}

export interface Theme {
  primaryColor: string;
  fontFamily: string;
  fontSize?: 'small' | 'normal' | 'large';
  documentSpacing?: 'compact' | 'normal' | 'relaxed';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: Experience[];
  skills: string[];
  customSections?: CustomSection[];
  theme?: Theme;
  templateId?: TemplateId;
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    title: "",
  },
  education: [],
  workExperience: [],
  skills: [],
  customSections: [],
  theme: {
    primaryColor: '#2563eb',
    fontFamily: 'Inter',
    fontSize: 'normal',
    documentSpacing: 'normal',
  },
  templateId: 'classic',
};

export type TemplateId = 'classic' | 'modern' | 'minimal' | 'professional' | 'creative' | 'executive' | 'academic' | 'tech';
