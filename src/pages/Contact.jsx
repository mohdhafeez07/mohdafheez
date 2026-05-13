import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageCircle, Linkedin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 5000);
    };

    return (
        <div className="contact-page">
            <div className="contact-page-bg">
                <div className="cp-orb-1" /><div className="cp-orb-2" />
            </div>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="contact-page-header"
                >
                    <Link to="/" className="back-link">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <span className="section-label" style={{ justifyContent: 'flex-start', marginTop: '1.5rem' }}>Contact</span>
                    <h1 className="contact-page-title">
                        Let's Build Something <span className="gradient-text">Amazing</span>
                    </h1>
                    <p className="contact-page-sub">
                        Got a project in mind? Need a developer? Want to collaborate? I'm available — let's talk.
                    </p>
                </motion.div>

                <div className="contact-page-grid">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="cp-info"
                    >
                        <div className="cp-info-card glass-card">
                            <div className="cp-info-item">
                                <div className="cp-icon" style={{ '--c': '#00d4ff' }}><Phone size={20} /></div>
                                <div>
                                    <p className="cp-label">Phone / WhatsApp</p>
                                    <a href="tel:+971589556227" className="cp-value">+971 58 955 6227</a>
                                </div>
                            </div>
                            <div className="cp-info-item">
                                <div className="cp-icon" style={{ '--c': '#7c3aed' }}><Mail size={20} /></div>
                                <div>
                                    <p className="cp-label">Email</p>
                                    <a href="mailto:hafeez07.mohd@gmail.com" className="cp-value">hafeez07.mohd@gmail.com</a>
                                </div>
                            </div>
                            <div className="cp-info-item">
                                <div className="cp-icon" style={{ '--c': '#10b981' }}><MapPin size={20} /></div>
                                <div>
                                    <p className="cp-label">Location</p>
                                    <span className="cp-value">Dubai, UAE 🇦🇪</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div className="cp-quick-actions">
                            <a href="https://wa.me/971589556227" target="_blank" rel="noopener noreferrer" className="btn btn-primary cp-action-btn">
                                <MessageCircle size={18} /> WhatsApp Me
                            </a>
                            <a href="https://www.linkedin.com/in/mohammed-afheez" target="_blank" rel="noopener noreferrer" className="btn btn-secondary cp-action-btn">
                                <Linkedin size={18} /> LinkedIn
                            </a>
                        </div>

                        <div className="cp-availability glass-card">
                            <span className="avail-dot" />
                            <div>
                                <p className="avail-title">Currently Available</p>
                                <p className="avail-sub">Open to freelance projects &amp; full-time roles</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="cp-form-wrap glass-card"
                    >
                        <h2 className="cp-form-title">Send a Message</h2>
                        <form className="cp-form" onSubmit={handleSubmit}>
                            <div className="cp-form-row">
                                <div className="cp-form-group">
                                    <label htmlFor="cp-name">Full Name</label>
                                    <input id="cp-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                                </div>
                                <div className="cp-form-group">
                                    <label htmlFor="cp-email">Email Address</label>
                                    <input id="cp-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                                </div>
                            </div>
                            <div className="cp-form-group">
                                <label htmlFor="cp-subject">Subject</label>
                                <input id="cp-subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="Web Development Project" />
                            </div>
                            <div className="cp-form-group">
                                <label htmlFor="cp-msg">Message</label>
                                <textarea id="cp-msg" name="message" rows={6} value={formData.message} onChange={handleChange} placeholder="Tell me about your project, timeline, and budget..." required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block cp-submit">
                                {sent ? '✓ Sent Successfully!' : <><Send size={16} /> Send Message</>}
                            </button>
                            {sent && (
                                <p className="cp-success">
                                    Thanks for reaching out! I'll reply within 24 hours. 🎉
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
