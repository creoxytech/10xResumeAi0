import React from 'react';
import type { TemplateId } from '../types/resume';
import { LayoutTemplateIcon, CheckCircleIcon, XIcon } from 'lucide-react';

interface TemplateGalleryProps {
    currentTemplate: TemplateId;
    onSelectTemplate: (template: TemplateId) => void;
    onClose: () => void;
}

const templates: { id: TemplateId; name: string; description: string; color: string }[] = [
    {
        id: 'classic',
        name: 'Classic',
        description: 'A clean, traditional single-column layout. Best for standard corporate roles.',
        color: '#f8fafc'
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'A stylish two-column design with a distinct sidebar for contact info and skills.',
        color: '#eff6ff'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Heavy typography focus with strict black-and-white contrast. Great for designers.',
        color: '#f1f5f9'
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Highly structured top border and clean lines. Perfect for corporate roles.',
        color: '#ffffff'
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'Bold header and vibrant usage of space. Excellent for marketing.',
        color: '#fdf4ff'
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Elegant lines and sophisticated typography for C-level formatting.',
        color: '#f8fafc'
    },
    {
        id: 'academic',
        name: 'Academic',
        description: 'Dense list-driven structure optimized for research, CVs, and publications.',
        color: '#ffffff'
    },
    {
        id: 'tech',
        name: 'Tech',
        description: 'Dark accents and heavy grid layouts natively built for engineers.',
        color: '#1e293b'
    }
];

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ currentTemplate, onSelectTemplate, onClose }) => {
    return (
        <div className="template-gallery-overlay">
            <div className="template-gallery-modal">
                <div className="gallery-header">
                    <div className="gallery-title">
                        <LayoutTemplateIcon className="gallery-icon" />
                        <h2>Choose a Template</h2>
                    </div>
                    <button className="gallery-close-btn" onClick={onClose}>
                        <XIcon size={20} />
                    </button>
                </div>

                <div className="gallery-grid">
                    {templates.map((tpl) => (
                        <div
                            key={tpl.id}
                            className={`gallery-card ${currentTemplate === tpl.id ? 'active' : ''}`}
                            onClick={() => {
                                onSelectTemplate(tpl.id);
                                onClose();
                            }}
                        >
                            <div className="gallery-thumbnail" style={{ backgroundColor: tpl.color }}>
                                {/* Abstract wireframe blocks representing the layout */}
                                {tpl.id === 'classic' && (
                                    <div className="wireframe-classic">
                                        <div className="w-header"></div>
                                        <div className="w-body"></div>
                                        <div className="w-body mt"></div>
                                    </div>
                                )}
                                {tpl.id === 'modern' && (
                                    <div className="wireframe-modern">
                                        <div className="w-sidebar"></div>
                                        <div className="w-main">
                                            <div className="w-body"></div>
                                            <div className="w-body mt"></div>
                                        </div>
                                    </div>
                                )}
                                {tpl.id === 'minimal' && (
                                    <div className="wireframe-minimal">
                                        <div className="w-header-split">
                                            <div className="w-title"></div>
                                            <div className="w-contact"></div>
                                        </div>
                                        <div className="w-line"></div>
                                        <div className="w-body mt"></div>
                                    </div>
                                )}
                                {tpl.id === 'professional' && (
                                    <div className="wireframe-professional">
                                        <div className="w-top-border"></div>
                                        <div className="w-header-center"></div>
                                        <div className="w-line"></div>
                                        <div className="w-body mt"></div>
                                    </div>
                                )}
                                {tpl.id === 'creative' && (
                                    <div className="wireframe-creative">
                                        <div className="w-hero"></div>
                                        <div className="w-body mt"></div>
                                        <div className="w-body mt"></div>
                                    </div>
                                )}
                                {tpl.id === 'executive' && (
                                    <div className="wireframe-executive">
                                        <div className="w-header-left"></div>
                                        <div className="w-thick-line"></div>
                                        <div className="w-body mt"></div>
                                    </div>
                                )}
                                {tpl.id === 'academic' && (
                                    <div className="wireframe-academic">
                                        <div className="w-header-center-small"></div>
                                        <div className="w-body-dense mt"></div>
                                        <div className="w-body-dense mt"></div>
                                        <div className="w-body-dense mt"></div>
                                    </div>
                                )}
                                {tpl.id === 'tech' && (
                                    <div className="wireframe-tech">
                                        <div className="w-header-dark"></div>
                                        <div className="w-grid mt">
                                            <div className="w-grid-cell"></div>
                                            <div className="w-grid-cell"></div>
                                        </div>
                                    </div>
                                )}

                                {currentTemplate === tpl.id && (
                                    <div className="active-badge">
                                        <CheckCircleIcon size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="gallery-info">
                                <h3>{tpl.name}</h3>
                                <p>{tpl.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
