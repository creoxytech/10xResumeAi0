import { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './LegalPage.css';

interface LegalPageProps {
    title: string;
    lastUpdated: string;
    children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
    return (
        <div className="legal-wrapper">
            <nav className="legal-nav">
                <div className="legal-nav-inner">
                    <a href="/" className="legal-logo">
                        <img src={logoImg} alt="10xResumeAi" className="legal-logo-img" />
                        <span className="logo-text">10x</span>
                        <span className="logo-accent">Resume</span>
                        <span className="logo-ai">Ai</span>
                    </a>
                    <a href="/" className="legal-back-btn">
                        <ArrowLeft size={16} />
                        Back to Home
                    </a>
                </div>
            </nav>

            <main className="legal-main">
                <div className="legal-header">
                    <h1 className="legal-title">{title}</h1>
                    <p className="legal-updated">Last updated: {lastUpdated}</p>
                </div>
                <article className="legal-body">
                    {children}
                </article>
            </main>

            <footer className="legal-footer">
                <p>© {new Date().getFullYear()} 10xResumeAi &nbsp;·&nbsp; <a href="/contact">Contact</a> &nbsp;·&nbsp; <a href="/terms">Terms</a> &nbsp;·&nbsp; <a href="/refund">Refund Policy</a> &nbsp;·&nbsp; <a href="/">Home</a></p>
            </footer>

            <div className="legal-bg" aria-hidden="true">
                <div className="lb lb-1"></div>
                <div className="lb lb-2"></div>
            </div>
        </div>
    );
}
