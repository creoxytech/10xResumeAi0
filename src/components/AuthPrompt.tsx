import './AuthPrompt.css';
import { Sparkles, CheckCircle2, LayoutTemplate, ChevronRight, ChevronDown, Zap, Shield, FileText, ArrowRight } from 'lucide-react';
import mockupImg from '../assets/mockup.png';
import logoImg from '../assets/logo.png';

interface AuthPromptProps {
    onLogin: () => void;
}

export function AuthPrompt({ onLogin }: AuthPromptProps) {
    return (
        <div className="landing-wrapper">
            {/* Semantic Navigation */}
            <nav className="landing-nav" aria-label="Main Navigation">
                <div className="nav-container">
                    <div className="landing-logo">
                        <img src={logoImg} alt="10xResumeAi Logo" className="nav-logo-image" />
                        <span className="logo-text">10x</span>
                        <span className="logo-accent">Resume</span>
                        <span className="logo-ai">Ai</span>
                    </div>
                    <div className="nav-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#how-it-works" className="nav-link">How It Works</a>
                        <a href="#faq" className="nav-link">FAQ</a>
                    </div>
                    <button className="nav-login-btn" onClick={onLogin} aria-label="Sign in with Google">
                        Get Started <ArrowRight size={16} />
                    </button>
                </div>
            </nav>

            {/* Semantic Main Content Area */}
            <main className="landing-main">

                {/* === HERO SECTION === */}
                <section className="hero-section" aria-labelledby="hero-heading">
                    <div className="hero-content">
                        <div className="badge">
                            <Sparkles size={14} className="badge-icon" />
                            <span>AI-Powered Resume Builder</span>
                        </div>

                        <h1 id="hero-heading" className="hero-title">
                            Land Your Dream Job with an
                            <span className="title-gradient"> AI-Crafted Resume</span>
                        </h1>

                        <p className="hero-subtitle">
                            Stop wasting hours formatting. Let our advanced AI transform your career history into a compelling, ATS-optimized resume in seconds — tailored to the role you want.
                        </p>

                        <ul className="hero-checklist" aria-label="Key features">
                            <li><CheckCircle2 size={16} className="check-icon" /> <span>Beats Applicant Tracking Systems (ATS)</span></li>
                            <li><CheckCircle2 size={16} className="check-icon" /> <span>Recruiter-approved professional templates</span></li>
                            <li><CheckCircle2 size={16} className="check-icon" /> <span>Instant, flawless PDF export</span></li>
                        </ul>

                        {/* Primary Call to Action */}
                        <div className="hero-cta-container">
                            <button className="primary-cta-btn google-btn" onClick={onLogin} aria-label="Continue with Google to build your resume">
                                <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google — It's Fast
                            </button>
                            <p className="cta-hint">No credit card needed to get started.</p>
                        </div>
                    </div>

                    {/* Visual Element for Hero */}
                    <div className="hero-visual" aria-hidden="true">
                        <div className="visual-glow-ring"></div>
                        <img src={mockupImg} alt="AI Resume Builder Dashboard preview" className="mockup-image" />
                        <div className="hero-floating-badge badge-interviews">
                            <span className="floating-number">3×</span>
                            <span className="floating-label">More Interview Callbacks</span>
                        </div>
                        <div className="hero-floating-badge badge-time">
                            <Zap size={14} />
                            <span className="floating-label">Resume ready in &lt;60s</span>
                        </div>
                    </div>
                </section>

                {/* === STATS BAND === */}
                <section className="stats-section" aria-label="Platform statistics">
                    <div className="stats-container">
                        <div className="stat-item">
                            <span className="stat-number">50,000+</span>
                            <span className="stat-label">Resumes Created</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">92%</span>
                            <span className="stat-label">ATS Pass Rate</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">&lt; 60s</span>
                            <span className="stat-label">Avg. Generation Time</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">20+</span>
                            <span className="stat-label">Premium Templates</span>
                        </div>
                    </div>
                </section>

                {/* === HOW IT WORKS === */}
                <section className="how-it-works-section" aria-labelledby="how-heading" id="how-it-works">
                    <div className="how-container">
                        <header className="section-header">
                            <div className="section-badge">Simple 3-Step Process</div>
                            <h2 id="how-heading" className="section-title">From Blank Page to Dream Job</h2>
                            <p className="section-subtitle">Our intelligent resume generator does the heavy lifting — you just guide it.</p>
                        </header>
                        <div className="steps-grid">
                            <div className="step-card">
                                <div className="step-number">01</div>
                                <div className="step-icon-wrap"><FileText size={28} /></div>
                                <h3 className="step-title">Upload or Chat</h3>
                                <p className="step-description">Drop your old CV as a PDF or image, or simply have a natural conversation with our AI about your work history and goals. No forms to fill.</p>
                            </div>
                            <ChevronRight className="step-arrow hide-on-mobile" size={28} />
                            <div className="step-card">
                                <div className="step-number">02</div>
                                <div className="step-icon-wrap"><Sparkles size={28} /></div>
                                <h3 className="step-title">AI Optimizes</h3>
                                <p className="step-description">Our algorithm extracts your achievements, injects high-impact action verbs, and restructures everything to maximize your ATS score and recruiter appeal.</p>
                            </div>
                            <ChevronRight className="step-arrow hide-on-mobile" size={28} />
                            <div className="step-card">
                                <div className="step-number">03</div>
                                <div className="step-icon-wrap"><ArrowRight size={28} /></div>
                                <h3 className="step-title">Export & Win</h3>
                                <p className="step-description">Pick from premium templates, preview in real time, and download a pixel-perfect ATS-ready PDF. Apply to your target job with confidence.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === FEATURES === */}
                <section className="features-section" aria-labelledby="features-heading" id="features">
                    <div className="features-container">
                        <header className="section-header">
                            <div className="section-badge">Everything You Need</div>
                            <h2 id="features-heading" className="section-title">Why 10xResumeAi Outperforms the Rest</h2>
                            <p className="section-subtitle">Intelligent tools designed to give you a measurable edge in your job search.</p>
                        </header>

                        <div className="features-bento">
                            {/* Large card */}
                            <article className="feature-card feature-card-large">
                                <div className="feature-icon-wrapper icon-bg-blue">
                                    <Sparkles className="icon-blue" size={28} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">Conversational AI Generation</h3>
                                <p className="feature-description">
                                    Unlike form-based builders, simply chat with our AI. Describe your experience naturally and watch it craft powerful, keyword-rich bullet points that impress both ATS software and human recruiters. Ideal for software engineers, product managers, marketers, and more.
                                </p>
                                <div className="feature-tag">Core Feature</div>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon-wrapper icon-bg-green">
                                    <CheckCircle2 className="icon-green" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">ATS Optimization Engine</h3>
                                <p className="feature-description">
                                    Every resume is structurally designed to pass Applicant Tracking Systems. Standard headings, clean parsing, and targeted keyword density ensure your CV reaches a real recruiter's desk.
                                </p>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon-wrapper icon-bg-purple">
                                    <LayoutTemplate className="icon-purple" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">20+ Premium Templates</h3>
                                <p className="feature-description">
                                    Choose from beautifully crafted, recruiter-approved templates ranging from modern minimalist to executive styles. Customizable colors and typography at a click.
                                </p>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon-wrapper icon-bg-orange">
                                    <Zap className="icon-orange" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">60-Second Generation</h3>
                                <p className="feature-description">
                                    Stop spending days perfecting your resume. Our AI generates a full, professional CV draft in under 60 seconds, so you can iterate rapidly across multiple job applications.
                                </p>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon-wrapper icon-bg-red">
                                    <Shield className="icon-red" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">Secure & Private</h3>
                                <p className="feature-description">
                                    Your data is yours. We use Google OAuth for secure, passwordless authentication and never share your career data with third parties.
                                </p>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon-wrapper icon-bg-blue">
                                    <FileText className="icon-blue" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">PDF Import & Parsing</h3>
                                <p className="feature-description">
                                    Already have a resume? Upload it as a PDF or image. Our AI parses and enhances your existing content, so you never start from scratch.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                {/* === CTA BANNER === */}
                <section className="cta-banner-section" aria-label="Call to action">
                    <div className="cta-banner">
                        <div className="cta-banner-content">
                            <h2 className="cta-banner-title">Ready to 10x Your Job Search?</h2>
                            <p className="cta-banner-subtitle">Join thousands of professionals who have already upgraded their career with AI-powered resumes.</p>
                        </div>
                        <button className="primary-cta-btn cta-banner-btn" onClick={onLogin} aria-label="Start building your AI resume">
                            Build My Resume Now <ArrowRight size={18} />
                        </button>
                    </div>
                </section>

                {/* === FAQ === */}
                <section className="faq-section" aria-labelledby="faq-heading" id="faq">
                    <div className="faq-container">
                        <header className="section-header">
                            <div className="section-badge">Got Questions?</div>
                            <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
                            <p className="section-subtitle">Everything you need to know about our premium AI resume builder.</p>
                        </header>
                        <div className="faq-list">
                            <details className="faq-item">
                                <summary className="faq-question">
                                    What makes this an ATS-friendly resume builder?
                                    <ChevronDown className="faq-icon" size={20} />
                                </summary>
                                <p className="faq-answer">
                                    Our templates are built with standard, machine-parseable structures — no complex tables, text-within-images, or erratic formatting that confuses Applicant Tracking Systems. We enforce standard section headings (Experience, Education, Skills), use clean fonts, and actively optimize your keyword density based on the target job role. The result is a resume that gets read by humans, not just filtered out by bots.
                                </p>
                            </details>
                            <details className="faq-item">
                                <summary className="faq-question">
                                    How does the AI resume generator actually work?
                                    <ChevronDown className="faq-icon" size={20} />
                                </summary>
                                <p className="faq-answer">
                                    You interact with our AI through a natural chat interface. You can describe your roles, responsibilities, and achievements in your own words, or upload an existing CV (PDF or image). The AI extracts key information, rewrites bullet points to be impact-focused using strong action verbs, and structures the content according to modern resume best practices. You stay in full control and can refine the output at any step.
                                </p>
                            </details>
                            <details className="faq-item">
                                <summary className="faq-question">
                                    Can I export my completed resume to PDF?
                                    <ChevronDown className="faq-icon" size={20} />
                                </summary>
                                <p className="faq-answer">
                                    Yes. Once your resume is complete, you can export it instantly as a high-quality PDF directly from the builder. The export preserves all formatting exactly as shown in the preview, ensuring pixel-perfect results whether opened by a recruiter on Windows, Mac, or any mobile device.
                                </p>
                            </details>
                            <details className="faq-item">
                                <summary className="faq-question">
                                    What types of jobs and industries is this resume builder best for?
                                    <ChevronDown className="faq-icon" size={20} />
                                </summary>
                                <p className="faq-answer">
                                    10xResumeAi works across all professional industries and career levels. It is particularly effective for roles in Software Engineering, Product Management, Data Science, Marketing, Finance, Design, and Operations. The AI understands industry-specific terminology and tailors language accordingly to maximize relevance for your target role.
                                </p>
                            </details>
                            <details className="faq-item">
                                <summary className="faq-question">
                                    Is my personal career data safe and private?
                                    <ChevronDown className="faq-icon" size={20} />
                                </summary>
                                <p className="faq-answer">
                                    Absolutely. We use Google OAuth for secure, passwordless authentication — we never see or store your Google password. Your resume data is private and is never sold or shared with third-party advertisers. You can delete your data at any time from your account settings.
                                </p>
                            </details>
                        </div>
                    </div>
                </section>

            </main>

            {/* === EXPANDED FOOTER === */}
            <footer className="landing-footer" aria-label="Site Footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <img src={logoImg} alt="10xResumeAi Logo" className="footer-logo-image" />
                                <span className="logo-text">10x</span><span className="logo-accent">Resume</span><span className="logo-ai">Ai</span>
                            </div>
                            <p className="footer-description">The premium AI-powered resume builder designed to help ambitious professionals land more interviews through intelligent formatting and ATS optimization.</p>
                        </div>

                        <nav className="footer-nav" aria-label="Footer Navigation">
                            <div className="footer-col">
                                <h4 className="footer-heading">Product</h4>
                                <ul>
                                    <li><a href="#features">AI Generation</a></li>
                                    <li><a href="#features">ATS Optimization</a></li>
                                    <li><a href="#features">Premium Templates</a></li>
                                    <li><a href="#features">PDF Export</a></li>
                                    <li><a href="#features">CV Import</a></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4 className="footer-heading">Resources</h4>
                                <ul>
                                    <li><a href="#">Career Blog</a></li>
                                    <li><a href="#">Resume Examples</a></li>
                                    <li><a href="#">Interview Prep Tips</a></li>
                                    <li><a href="#">Cover Letter Guide</a></li>
                                    <li><a href="#">Salary Insights</a></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4 className="footer-heading">Company</h4>
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms of Service</a></li>
                                    <li><a href="/contact">Contact Us</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} 10xResumeAi. Built for ambitious job seekers worldwide.</p>
                        <p className="footer-tagline">AI Resume Builder · ATS Optimization · Professional CV Maker · PDF Export</p>
                    </div>
                </div>
            </footer>

            {/* Ambient Animated Background */}
            <div className="auth-background-effects" aria-hidden="true">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
        </div>
    );
}
