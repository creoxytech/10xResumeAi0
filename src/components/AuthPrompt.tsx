import './AuthPrompt.css';
import { Sparkles, Send, CheckCircle2, LayoutTemplate, Briefcase, Zap, Shield, ChevronRight } from 'lucide-react';
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
                        <span className="logo-text">10x</span>
                        <span className="logo-accent">Resume</span>
                        <span className="logo-ai">Ai</span>
                    </div>
                    <button className="nav-login-btn" onClick={onLogin} aria-label="Sign in with Google">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Semantic Main Content Area */}
            <main className="landing-main">
                {/* Hero Section */}
                <section className="hero-section" aria-labelledby="hero-heading">
                    <div className="hero-content">
                        <div className="badge">
                            <Sparkles size={16} className="badge-icon" />
                            <span>Powered by Advanced AI</span>
                        </div>
                        <h1 id="hero-heading" className="hero-title">
                            Build Your Professional AI Resume in Seconds
                        </h1>
                        <p className="hero-subtitle">
                            Stop struggling with formatting and writer's block. Our advanced AI generator crafts ATS-friendly, highly optimized resumes tailored to your career goals—instantly.
                        </p>

                        {/* Primary Call to Action */}
                        <div className="hero-cta-container">
                            <button className="primary-cta-btn google-btn" onClick={onLogin} aria-label="Continue with Google to build your resume">
                                <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>
                            <p className="cta-hint">Start building your premium resume today.</p>
                        </div>
                    </div>

                    {/* Visual Element for Hero */}
                    <div className="hero-visual" aria-hidden="true">
                        <img src={mockupImg} alt="AI Resume Builder Dashboard preview" className="mockup-image" />
                    </div>
                </section>

                {/* SEO-Rich Features Section */}
                <section className="features-section" aria-labelledby="features-heading">
                    <div className="features-container">
                        <header className="section-header">
                            <h2 id="features-heading" className="section-title">Why Choose 10xResumeAi?</h2>
                            <p className="section-subtitle">Discover how our intelligent CV maker helps you land more interviews.</p>
                        </header>

                        <div className="features-grid">
                            <article className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Sparkles className="icon-blue" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">Smart AI Generation</h3>
                                <p className="feature-description">
                                    Simply chat with our AI or upload your existing CV. Our advanced algorithm parses, rewrites, and perfectly structures your professional history instantly.
                                </p>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <CheckCircle2 className="icon-green" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">ATS-Friendly Output</h3>
                                <p className="feature-description">
                                    Our generated resumes are structurally optimized to pass through Applicant Tracking Systems, ensuring your application reaches human recruiters.
                                </p>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <LayoutTemplate className="icon-purple" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">Premium Modern Templates</h3>
                                <p className="feature-description">
                                    Choose from beautiful, recruiter-approved templates spanning from minimalist to executive styles. Customize colors and typography with a click.
                                </p>
                            </article>

                            <article className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Send className="icon-orange" size={24} aria-hidden="true" />
                                </div>
                                <h3 className="feature-title">Instant PDF Export</h3>
                                <p className="feature-description">
                                    Once your AI resume is perfect, export it directly to a pixel-perfect PDF ready to be attached to your job applications.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>

            {/* Semantic Footer */}
            <footer className="landing-footer" aria-label="Site Footer">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} 10xResumeAi. All rights reserved.</p>
                    <div className="footer-links">
                        <p>Built for job seekers worldwide.</p>
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
