import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ResumeData } from '../../types/resume';

interface TemplateProps {
    data: ResumeData;
}

export const AcademicTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
    return (
        <div className="resume-document academic-template" ref={ref}>
            <header className="academic-header">
                <h1 className="resume-name">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>

                {data.personalInfo.title && <h2 className="resume-title">{data.personalInfo.title}</h2>}

                <div className="academic-contact">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && (
                        <>
                            <span className="separator">•</span>
                            <span>{data.personalInfo.phone}</span>
                        </>
                    )}
                    {data.personalInfo.location && (
                        <>
                            <span className="separator">•</span>
                            <span>{data.personalInfo.location}</span>
                        </>
                    )}
                </div>
            </header>

            {data.education.length > 0 && (
                <section className="resume-section academic-section">
                    <h2 className="section-title">Education</h2>
                    <div className="academic-list">
                        {data.education.map((edu, i) => (
                            <div key={i} className="academic-item">
                                <div className="academic-item-left">
                                    <span className="academic-date">{edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}</span>
                                </div>
                                <div className="academic-item-main">
                                    <h3 className="academic-degree">{edu.degree}</h3>
                                    <div className="academic-institution">{edu.institution}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.workExperience.length > 0 && (
                <section className="resume-section academic-section">
                    <h2 className="section-title">Academic & Professional Experience</h2>
                    <div className="academic-list">
                        {data.workExperience.map((exp, i) => (
                            <div key={i} className="academic-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <div className="experience-header" style={{ width: '100%' }}>
                                    <h3 className="experience-title">{exp.position}, {exp.company}</h3>
                                    <span className="academic-date">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                                </div>
                                {exp.description && exp.description.length > 0 && (
                                    <ul className="experience-desc-list academic-desc">
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

            {data.customSections?.map((section, sIndex) => (
                <section key={`custom-${sIndex}`} className="resume-section academic-section">
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
                        <div className="academic-list">
                            {section.items.map((item, iIndex) => (
                                <div key={iIndex} className="academic-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <div className="experience-header" style={{ width: '100%' }}>
                                        <h3 className="experience-title">{item.title} {item.subtitle ? `, ${item.subtitle}` : ''}</h3>
                                        {item.date && <span className="academic-date">{item.date}</span>}
                                    </div>
                                    {item.description && item.description.length > 0 && (
                                        <ul className="experience-desc-list academic-desc">
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

            {data.education.length === 0 && data.workExperience.length === 0 && (!data.customSections || data.customSections.length === 0) && (
                <div className="resume-placeholder-text">
                    Your curriculum vitae will appear here.
                </div>
            )}
        </div>
    );
});
