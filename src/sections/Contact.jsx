import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '../components/BrandIcons';
import { PROFILE } from '../data/content';
import './Contact.css';

const LINKS = [
    { label: 'LinkedIn', note: 'mohammed-afheez', href: PROFILE.linkedin, icon: <LinkedInIcon size={18} /> },
    { label: 'GitHub', note: 'mohdhafeez07', href: PROFILE.github, icon: <GitHubIcon size={18} /> },
    { label: 'WhatsApp', note: PROFILE.phone, href: PROFILE.whatsapp, icon: <WhatsAppIcon size={18} /> },
];

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [opened, setOpened] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(PROFILE.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${PROFILE.email}`;
        }
    };

    const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    // No backend: compose the message in the visitor's email client.
    const onSubmit = e => {
        e.preventDefault();
        const subject = `Portfolio enquiry from ${form.name}`;
        const body = `${form.message}\n\n${form.name}\n${form.email}`;
        window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setOpened(true);
    };

    return (
        <section id="contact" className="section contact" tabIndex={-1}>
            <div className="container">
                <div className="sh-top contact-top" data-reveal="fade">
                    <span className="sh-index">(05)</span>
                    <span className="sh-label">Contact</span>
                    <span className="sh-rule" aria-hidden="true" />
                    <span className="sh-aside">Reply within 24h</span>
                </div>

                <div className="contact-hero">
                    <h2 className="contact-title" data-reveal="lines">
                        Let's build something <span className="serif accent">worth</span> remembering.
                    </h2>
                    <Magnetic strength={0.4} className="contact-orb-wrap">
                        <a href={`mailto:${PROFILE.email}`} className="contact-orb" data-reveal="fade">
                            <span>Say hello</span>
                            <ArrowUpRight size={22} />
                        </a>
                    </Magnetic>
                </div>

                <div className="contact-grid">
                    <div className="contact-left">
                        <div className="contact-email" data-reveal="fade">
                            <a href={`mailto:${PROFILE.email}`} className="contact-email-link">{PROFILE.email}</a>
                            <button type="button" onClick={copyEmail} className="contact-copy" aria-label="Copy email address">
                                {copied ? <Check size={15} /> : <Copy size={15} />}
                                <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                        </div>

                        <ul className="contact-links">
                            {LINKS.map(l => (
                                <li key={l.label} data-reveal="fade">
                                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                                        <span className="cl-icon">{l.icon}</span>
                                        <span className="cl-label">{l.label}</span>
                                        <span className="cl-note">{l.note}</span>
                                        <ArrowUpRight size={18} className="cl-arrow" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <form className="contact-form" onSubmit={onSubmit} data-reveal="fade">
                        <div className="field">
                            <input id="cf-name" name="name" type="text" autoComplete="name" required value={form.name} onChange={onChange} placeholder=" " />
                            <label htmlFor="cf-name">Your name</label>
                        </div>
                        <div className="field">
                            <input id="cf-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={onChange} placeholder=" " />
                            <label htmlFor="cf-email">Email address</label>
                        </div>
                        <div className="field">
                            <textarea id="cf-msg" name="message" rows={4} required value={form.message} onChange={onChange} placeholder=" " />
                            <label htmlFor="cf-msg">Tell me about your project</label>
                        </div>
                        <div className="contact-submit-row">
                            <p className="contact-note" role="status">
                                {opened ? 'Your email app should now open with the message ready.' : 'Opens your email app with the message pre-filled.'}
                            </p>
                            <Magnetic>
                                <button type="submit" className="btn btn-primary">
                                    <span><Send size={16} /> Send message</span>
                                </button>
                            </Magnetic>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
