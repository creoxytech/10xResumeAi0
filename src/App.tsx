import { useState, useRef, useEffect } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { chatRespond, extractResumeData, extractDataFromFile } from './lib/gemini';
import type { ChatMessage } from './lib/gemini';
import { ExportButton } from './components/ExportButton';
import { TemplateGallery } from './components/TemplateGallery';
import { LayoutTemplateIcon, Eye, X, LogOut } from 'lucide-react';
import { initialResumeData } from './types/resume';
import type { ResumeData, TemplateId } from './types/resume';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { AuthPrompt } from './components/AuthPrompt';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [template, setTemplate] = useState<TemplateId>('classic');
  const [isTyping, setIsTyping] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (initialized.current || !session) return;
    initialized.current = true;

    const greet = async () => {
      setIsTyping(true);
      try {
        const response = await chatRespond([{ role: 'user', content: 'Hello' }]);
        setMessages([{ role: 'model', content: response }]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsTyping(false);
      }
    };

    greet();
  }, []);

  const handleSendMessage = async (userText: string) => {
    const newMsg: ChatMessage = { role: 'user', content: userText };
    const updatedHistory = [...messages, newMsg];
    setMessages(updatedHistory);
    setIsTyping(true);

    try {
      // 1. Get the conversational response from AI
      const aiResponseText = await chatRespond(updatedHistory);
      const withAiHistory: ChatMessage[] = [...updatedHistory, { role: 'model', content: aiResponseText }];

      // 2. Extract the structured data based on that conversation
      const newData = await extractResumeData([...withAiHistory].slice(-10), resumeData);

      if (newData) {
        // Preserve imageUrl if it exists
        if (resumeData.personalInfo.imageUrl) {
          newData.personalInfo.imageUrl = resumeData.personalInfo.imageUrl;
        }
        setResumeData(newData);
        if (newData.templateId && newData.templateId !== template) {
          setTemplate(newData.templateId);
        }
        // 3. Only show the success message AFTER we successfully applied the data
        setMessages(withAiHistory);
      } else {
        // Fallback if data extraction failed but chat worked
        setMessages([...updatedHistory, { role: 'model', content: "I understood your request, but I ran into an error applying the data to your resume. Let's try that one more time." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages([...updatedHistory, { role: 'model', content: "I encountered a network error. Let's try that again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          imageUrl: base64String
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleResumeImport = async (file: File) => {
    setIsImporting(true);
    setMessages(prev => [...prev, { role: 'user', content: `[Uploaded Resume: ${file.name}]` }]);

    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          // The result from readAsDataURL includes the mime type header (e.g., "data:image/png;base64,...")
          // Gemini's inlineData needs just the pure base64 string
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const newData = await extractDataFromFile(base64String, file.type);

      if (newData) {
        // Preserve image if user already set one
        if (resumeData.personalInfo.imageUrl) {
          newData.personalInfo.imageUrl = resumeData.personalInfo.imageUrl;
        }
        setResumeData(newData);
        setMessages(prev => [...prev, { role: 'model', content: "I've successfully scanned your uploaded resume and populated the fields! Let me know if you want to tweak anything." }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: "I had some trouble reading that document. Could you try a different file, or we can just continue building it here?" }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "There was an error processing your file. Please try again." }]);
    } finally {
      setIsImporting(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMessages([]);
    setResumeData(initialResumeData);
    initialized.current = false;
  };

  if (!session) {
    return <AuthPrompt onLogin={handleGoogleLogin} />;
  }

  return (
    <div
      className={`app-container ${isMobilePreviewOpen ? 'mobile-preview-open' : ''}`}
      style={{
        '--resume-accent': resumeData.theme?.primaryColor || '#2563eb',
        '--resume-font': resumeData.theme?.fontFamily || 'Inter',
        '--base-font-size': resumeData.theme?.fontSize === 'small' ? '13px' : (resumeData.theme?.fontSize === 'large' ? '17px' : '15px')
      } as React.CSSProperties}
    >
      <div className="left-pane">
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          onImageUpload={handleImageUpload}
          isLoading={isTyping}
          onResumeImport={handleResumeImport}
          isImporting={isImporting}
        />
        <button
          className="mobile-preview-btn"
          onClick={() => setIsMobilePreviewOpen(true)}
        >
          <Eye size={20} />
          Preview
        </button>
      </div>

      <div className="right-pane">
        <div className="preview-top-nav">
          <div className="nav-left">
            <button
              className="mobile-close-preview-btn"
              onClick={() => setIsMobilePreviewOpen(false)}
            >
              <X size={20} />
            </button>
            <button
              className="gallery-trigger-btn"
              onClick={() => setIsGalleryOpen(true)}
            >
              <LayoutTemplateIcon size={16} />
              <span className="hide-on-mobile">Template: </span><span className="highlight-template">{template}</span>
            </button>
          </div>
          <div className="nav-right toolbar-actions">
            <button
              className="mobile-close-preview-btn"
              onClick={handleLogout}
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
            <ExportButton targetRef={previewRef} fileName={`${resumeData.personalInfo.firstName || 'My'}_Resume.pdf`} />
          </div>
        </div>
        <PreviewPanel data={resumeData} template={template} ref={previewRef} className={`preview-content spacing-${resumeData.theme?.documentSpacing || 'normal'}`} />
      </div>

      {isGalleryOpen && (
        <TemplateGallery
          currentTemplate={template}
          onSelectTemplate={setTemplate}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </div>
  );
}
