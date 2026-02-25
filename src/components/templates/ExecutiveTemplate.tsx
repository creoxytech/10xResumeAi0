import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ResumeData } from '../../types/resume';

interface TemplateProps {
    data: ResumeData;
}

export const ExecutiveTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
    return (
        <div className="resume-document executive-template" ref={ref}>
            <header className="executive-header">
                <div className="executive-header-content">
                    {data.personalInfo.firstName || data.personalInfo.lastName ? (
                        <h1 className="resume-name">
                            {data.personalInfo.firstName} {data.personalInfo.lastName}
                        </h1>
                    ) : (
                        <h1 className="resume-empty">Your Name</h1>
                    )}

                    {data.personalInfo.title && <h2 className="resume-title">{data.personalInfo.title}</h2>}
                </div>

                <div className="executive-header-contact">
                    {(data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) && (
                        <div className="resume-contact">
                            {data.personalInfo.phone && <span className="contact-item">{data.personalInfo.phone}</span>}
                            {data.personalInfo.email && <span className="contact-item">{data.personalInfo.email}</span>}
                            {data.personalInfo.location && <span className="contact-item">{data.personalInfo.location}</span>}
                        </div>
                    )}
                </div>
            </header>

            <div className="executive-thick-line"></div>

            <div className="executive-body">
                {data.personalInfo.summary && (
                    <section className="resume-section">
                        <h2 className="section-title">Executive Summary</h2>
                        <div className="resume-summary">
                            <ReactMarkdown components={{ p: 'span' }}>{data.personalInfo.summary}</ReactMarkdown>
                        </div>
                    </section>
                )}

                {data.workExperience.length > 0 && (
                    <section className="resume-section">
                        <h2 className="section-title">Professional Experience</h2>
                        <div className="experience-list">
                            {data.workExperience.map((exp, i) => (
                                <div key={i} className="experience-item">
                                    <div className="experience-header">
                                        <div className="executive-company-block">
                                            <h3 className="experience-company">{exp.company}</h3>
                                            <span className="experience-title">{exp.position}</span>
                                        </div>
                                        <span className="experience-date">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                                    </div>
                                    {exp.description && exp.description.length > 0 && (
                                        <ul className="experience-desc-list">
                                            {exp.description.map((desc, dIndex) => (
                                                <li key={dIndex}>
                                                    <ReactMarkdown components={{ p: 'span' }}>{desc}</ReactMarkdown>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.education.length > 0 && (
                    <section className="resume-section">
                        <h2 className="section-title">Education</h2>
                        <div className="education-list">
                            {data.education.map((edu, i) => (
                                <div key={i} className="education-item">
                                    <div className="education-header">
                                        <h3 className="education-degree">{edu.degree}</h3>
                                        <span className="education-date">{edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}</span>
                                    </div>
                                    <div className="education-institution">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.customSections?.map((section, sIndex) => (
                    <section key={`custom-${sIndex}`} className="resume-section">
                        <h2 className="section-title">{section.sectionTitle}</h2>

                        {section.layoutMode === 'progress-bars' && (
                            <div className="modern-progress-bars">
                                {section.items.map((item, i) => (
                                    <div key={i} className="progress-item">
                                        <span className="progress-label">{item.title}</span>
                                        <div className="progress-track">
                                            <div className="progress-fill" style={{ width: `${(item.level || 4) * 20}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {section.layoutMode === 'tags' && (
                            <div className="modern-tags-grid">
                                {section.items.map((item, i) => (
                                    <span key={i} className="tag-item">{item.title}</span>
                                ))}
                            </div>
                        )}

                        {section.layoutMode === 'grid' && (
                            <div className="modern-grid-layout">
                                {section.items.map((item, i) => (
                                    <div key={i} className="grid-card">
                                        {item.title && <h4 className="grid-title">{item.title}</h4>}
                                        {item.description && <div className="grid-desc"><ReactMarkdown components={{ p: 'span' }}>{item.description.join(' ')}</ReactMarkdown></div>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {(!section.layoutMode || section.layoutMode === 'list') && (
                            <div className="experience-list">
                                {section.items.map((item, iIndex) => (
                                    <div key={iIndex} className="experience-item">
                                        <div className="experience-header">
                                            {item.title && <h3 className="experience-title">{item.title}</h3>}
                                            {item.date && <span className="experience-date">{item.date}</span>}
                                        </div>
                                        {item.subtitle && <div className="experience-company">{item.subtitle}</div>}
                                        {item.description && item.description.length > 0 && (
                                            <ul className="experience-desc-list">
                                                {item.description.map((desc, dIndex) => (
                                                    <li key={dIndex}>
                                                        <ReactMarkdown components={{ p: 'span' }}>{desc}</ReactMarkdown>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {data.education.length === 0 && data.workExperience.length === 0 && (!data.customSections || data.customSections.length === 0) && !data.personalInfo.summary && (
                <div className="resume-placeholder-text">
                    Your resume will appear here as you chat.
                </div>
            )}
        </div>
    );
});
