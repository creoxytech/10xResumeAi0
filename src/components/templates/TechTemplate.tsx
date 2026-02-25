import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ResumeData } from '../../types/resume';

interface TemplateProps {
    data: ResumeData;
}

export const TechTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
    return (
        <div className="resume-document tech-template" ref={ref}>
            <header className="tech-header">
                <div className="tech-header-inner">
                    <div className="tech-title-area">
                        {data.personalInfo.firstName || data.personalInfo.lastName ? (
                            <h1 className="resume-name">
                                {data.personalInfo.firstName} <span className="tech-name-accent">{data.personalInfo.lastName}</span>
                            </h1>
                        ) : (
                            <h1 className="resume-empty">Your Name</h1>
                        )}
                        {data.personalInfo.title && <h2 className="resume-title">&gt; {data.personalInfo.title}</h2>}
                    </div>

                    {(data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) && (
                        <div className="resume-contact tech-contact">
                            {data.personalInfo.email && <span className="contact-item">{data.personalInfo.email}</span>}
                            {data.personalInfo.phone && <span className="contact-item">{data.personalInfo.phone}</span>}
                            {data.personalInfo.location && <span className="contact-item">{data.personalInfo.location}</span>}
                        </div>
                    )}
                </div>
            </header>

            <div className="tech-body">
                {data.personalInfo.summary && (
                    <section className="resume-section">
                        <h2 className="section-title tech-section-title">01. Summary</h2>
                        <div className="resume-summary tech-summary">
                            <ReactMarkdown components={{ p: 'span' }}>{data.personalInfo.summary}</ReactMarkdown>
                        </div>
                    </section>
                )}

                {data.skills.length > 0 && (
                    <section className="resume-section">
                        <h2 className="section-title tech-section-title">02. Technologies</h2>
                        <div className="modern-tags-grid">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="tag-item tech-tag">{skill}</span>
                            ))}
                        </div>
                    </section>
                )}

                {data.workExperience.length > 0 && (
                    <section className="resume-section">
                        <h2 className="section-title tech-section-title">03. Experience</h2>
                        <div className="experience-list">
                            {data.workExperience.map((exp, i) => (
                                <div key={i} className="experience-item tech-exp-item">
                                    <div className="experience-header">
                                        <h3 className="experience-title">{exp.position}</h3>
                                        <span className="experience-date">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                                    </div>
                                    <div className="experience-company tech-company">{exp.company}</div>
                                    {exp.description && exp.description.length > 0 && (
                                        <ul className="experience-desc-list tech-list">
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
                    <section key={`custom-${sIndex}`} className="resume-section">
                        <h2 className="section-title tech-section-title">0{4 + sIndex}. {section.sectionTitle}</h2>

                        {section.layoutMode === 'progress-bars' && (
                            <div className="modern-progress-bars">
                                {section.items.map((item, i) => (
                                    <div key={i} className="progress-item tech-progress-item">
                                        <span className="progress-label tech-progress-label">{item.title}</span>
                                        <div className="progress-track tech-progress-track">
                                            <div className="progress-fill tech-progress-fill" style={{ width: `${(item.level || 4) * 20}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {section.layoutMode === 'tags' && (
                            <div className="modern-tags-grid">
                                {section.items.map((item, i) => (
                                    <span key={i} className="tag-item tech-tag">{item.title}</span>
                                ))}
                            </div>
                        )}

                        {section.layoutMode === 'grid' && (
                            <div className="modern-grid-layout">
                                {section.items.map((item, i) => (
                                    <div key={i} className="grid-card tech-grid-card">
                                        {item.title && <h4 className="grid-title tech-grid-title">{item.title}</h4>}
                                        {item.subtitle && <span className="tech-grid-subtitle">{item.subtitle}</span>}
                                        {item.description && <div className="grid-desc tech-grid-desc"><ReactMarkdown components={{ p: 'span' }}>{item.description.join(' ')}</ReactMarkdown></div>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {(!section.layoutMode || section.layoutMode === 'list') && (
                            <div className="experience-list">
                                {section.items.map((item, iIndex) => (
                                    <div key={iIndex} className="experience-item tech-exp-item">
                                        <div className="experience-header">
                                            {item.title && <h3 className="experience-title">{item.title}</h3>}
                                            {item.date && <span className="experience-date">{item.date}</span>}
                                        </div>
                                        {item.subtitle && <div className="experience-company tech-company">{item.subtitle}</div>}
                                        {item.description && item.description.length > 0 && (
                                            <ul className="experience-desc-list tech-list">
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

                {data.education.length > 0 && (
                    <section className="resume-section">
                        <h2 className="section-title tech-section-title">0{4 + (data.customSections?.length || 0)}. Education</h2>
                        <div className="education-list">
                            {data.education.map((edu, i) => (
                                <div key={i} className="education-item tech-edu-item">
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

            </div>

            {data.education.length === 0 && data.workExperience.length === 0 && (!data.customSections || data.customSections.length === 0) && !data.personalInfo.summary && (
                <div className="resume-placeholder-text">
                    // Ready for input.
                </div>
            )}
        </div>
    );
});
