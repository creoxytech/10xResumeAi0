import { Mail, ArrowLeft, MessageSquare, Clock } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './ContactPage.css';

export function ContactPage() {
    return (
        <div className="contact-wrapper">
            {/* Nav */}
            <nav className="contact-nav">
                <div className="contact-nav-inner">
                    <a href="/" className="contact-logo">
                        <img src={logoImg} alt="10xResumeAi" className="contact-logo-img" />
                        <span className="logo-text">10x</span>
                        <span className="logo-accent">Resume</span>
                        <span className="logo-ai">Ai</span>
                    </a>
                    <a href="/" className="contact-back-btn">
                        <ArrowLeft size={16} />
                        Back to Home
                    </a>
                </div>
            </nav>

            <main className="contact-main">
                {/* Header */}
                <div className="contact-header">
                    <div className="contact-header-badge">Contact Us</div>
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-subtitle">
                        Have a question, feedback, or need support? We're here to help. Reach out and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Email Card */}
                    <div className="contact-card contact-card-main">
                        <div className="contact-card-icon-wrap icon-bg-blue">
                            <Mail size={26} className="icon-blue" />
                        </div>
                        <h2 className="contact-card-title">Email Us</h2>
                        <p className="contact-card-desc">
                            Send us an email for any queries — payment issues, account help, feature requests, or business enquiries.
                        </p>
                        <a
                            href="mailto:creoxy.tech@gmail.com"
                            className="contact-email-link"
                        >
                            creoxy.tech@gmail.com
                        </a>
                    </div>

                    {/* Support card */}
                    <div className="contact-card">
                        <div className="contact-card-icon-wrap icon-bg-purple">
                            <MessageSquare size={22} className="icon-purple" />
                        </div>
                        <h3 className="contact-card-title">Support</h3>
                        <p className="contact-card-desc">
                            For payment issues, billing questions, or if you've been charged but haven't received access, mention your registered email in your message.
                        </p>
                    </div>

                    {/* Response time card */}
                    <div className="contact-card">
                        <div className="contact-card-icon-wrap icon-bg-green">
                            <Clock size={22} className="icon-green" />
                        </div>
                        <h3 className="contact-card-title">Response Time</h3>
                        <p className="contact-card-desc">
                            We typically respond within <strong>24–48 hours</strong> on business days. For urgent payment issues, we aim to respond within a few hours.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="contact-cta">
                    <a href="mailto:creoxy.tech@gmail.com" className="contact-cta-btn">
                        <Mail size={18} />
                        Send an Email
                    </a>
                </div>
            </main>

            {/* Footer */}
            <footer className="contact-footer">
                <p>© {new Date().getFullYear()} 10xResumeAi · <a href="/contact">Contact</a> · <a href="/">Home</a></p>
            </footer>

            {/* BG */}
            <div className="contact-bg" aria-hidden="true">
                <div className="cb cb-1"></div>
                <div className="cb cb-2"></div>
            </div>
        </div>
    );
}
