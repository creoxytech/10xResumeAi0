import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage } from '../lib/gemini';
import { SendIcon, BotIcon, User2Icon, ImageIcon } from 'lucide-react';

interface ChatPanelProps {
    messages: ChatMessage[];
    onSendMessage: (msg: string) => void;
    onImageUpload: (file: File) => void;
    isLoading: boolean;
    onResumeImport: (file: File) => void;
    isImporting: boolean;
}

import { ImportResumeButton } from './ImportResumeButton';

export const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, onImageUpload, isLoading, onResumeImport, isImporting }) => {
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSendMessage(input.trim());
        setInput('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onImageUpload(e.target.files[0]);
            e.target.value = ''; // reset
        }
    };

    return (
        <div className="chat-panel">
            <div className="chat-header">
                <h2>AI Resume builder</h2>
                <p>Let's build your ATS-optimised resume together.</p>
            </div>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-wrapper ${msg.role}`}>
                        <div className={`message-bubble ${msg.role}`}>
                            <div className="message-icon">
                                {msg.role === 'model' ? <BotIcon size={18} /> : <User2Icon size={18} />}
                            </div>
                            <div className="message-content">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message-wrapper model">
                        <div className="message-bubble model loading">
                            <div className="message-icon"><BotIcon size={18} /></div>
                            <div className="message-content loader">Typing...</div>
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            <div className="chat-input-wrapper">
                <form className={`chat-input-form ${input.trim() ? 'has-text' : ''}`} onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <button
                        type="button"
                        className="upload-btn"
                        onClick={() => fileInputRef.current?.click()}
                        title="Upload Profile Picture"
                        disabled={isLoading || isImporting}
                    >
                        <ImageIcon size={20} />
                    </button>
                    <ImportResumeButton onImport={onResumeImport} isLoading={isImporting} iconOnly />
                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Message the AI Assistant..."
                        disabled={isLoading}
                        rows={1}
                    />
                    <button type="submit" className="send-btn" disabled={!input.trim() || isLoading}>
                        <SendIcon size={18} />
                    </button>
                </form>
                <div className="chat-footer">Build your ATS-optimised resume effortlessly. AI can make mistakes.</div>
            </div>
        </div>
    );
};
