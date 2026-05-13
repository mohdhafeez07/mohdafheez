import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    ArrowRight, Download, MapPin, Phone, Mail, ExternalLink,
    Code2, ChevronDown, Sparkles, Star
} from 'lucide-react';

// Project Assets
import zufirosLogo from '../assets/zufiros.jpg';
import thermoLogo from '../assets/thermo.png';
import brLogo from '../assets/BR.png';
import dsLogo from '../assets/DSlogo.jpg';
import diamondLogo from '../assets/Dimond logo.png';
import mazraLogo from '../assets/mazra.jpeg';
import molsysLogo from '../assets/molsys.png';
import dnalystLogo from '../assets/dnalyst-nobg.png';
import urbanLaundryLogo from '../assets/UrbanLaundry.png';
import iotLogo from '../assets/IoT.png';
import malnadNestsLogo from '../assets/images.jpeg';

import './Home.css';

/* ───── DATA ───── */
const SKILLS = {
    Frontend: [
        { name: 'React.js', level: 95 },
        { name: 'Next.js', level: 80 },
        { name: 'JavaScript', level: 92 },
        { name: 'TypeScript', level: 75 },
        { name: 'HTML5 & CSS3', level: 98 },
        { name: 'Bootstrap', level: 88 },
    ],
    Backend: [
        { name: 'Java Spring Boot', level: 90 },
        { name: 'PHP', level: 85 },
        { name: 'Node.js', level: 78 },
        { name: 'Python', level: 70 },
        { name: 'MySQL', level: 88 },
        { name: 'REST APIs', level: 92 },
    ],
    'Tools & Cloud': [
        { name: 'AWS', level: 72 },
        { name: 'Docker', level: 68 },
        { name: 'Git & GitHub', level: 90 },
        { name: 'Linux', level: 75 },
        { name: 'Figma', level: 65 },
        { name: 'Netlify / Vercel', level: 85 },
    ],
};

const PROJECTS = [
    {
        name: 'Zufiros Pharmaceuticals',
        category: 'Healthcare',
        url: 'https://zufiros.com',
        color: '#10b981',
        desc: 'Pharmaceutical corporate website with complete product catalogue and SEO optimization.',
        tags: ['React', 'SEO', 'PHP'],
        image: zufirosLogo,
    },
    {
        name: 'Thermo Line',
        category: 'Construction',
        url: 'https://thermolineroa.netlify.app',
        color: '#f59e0b',
        desc: 'Commercial insulation services platform with dynamic project portfolios.',
        tags: ['React', 'Netlify'],
        image: thermoLogo,
    },
    {
        name: 'T Perfumery',
        category: 'E-Commerce',
        url: '#',
        color: '#ec4899',
        desc: 'Luxury perfume gallery with high-end UI/UX and product showcase.',
        tags: ['React', 'UI/UX'],
        image: brLogo,
    },
    {
        name: 'Malnad Nests',
        category: 'Hospitality',
        url: 'https://malnadnests.com',
        color: '#22c55e',
        desc: 'Real estate and homestay platform for premium property listings.',
        tags: ['PHP', 'MySQL'],
        image: malnadNestsLogo,
    },
    {
        name: 'Molsys Scientific',
        category: 'Science',
        url: 'https://molsys.in',
        color: '#3b82f6',
        desc: 'Laboratory instrumentation portal with deep technical specifications.',
        tags: ['Web Dev', 'PHP'],
        image: molsysLogo,
    },
    {
        name: 'Dnalyst',
        category: 'Technology',
        url: 'https://dnalyst.in',
        color: '#8b5cf6',
        desc: 'Modern tech consultant platform with dynamic service modules.',
        tags: ['React', 'Node.js'],
        image: dnalystLogo,
    },
    {
        name: 'Diamond Habitat',
        category: 'Real Estate',
        url: 'https://diamondconstruction.netlify.app',
        color: '#eab308',
        desc: 'Premium construction and habitat showcase with interactive galleries.',
        tags: ['Framer Motion', 'React'],
        image: diamondLogo,
    },
    {
        name: 'Desert Ways Dubai',
        category: 'Tourism',
        url: 'https://desertwaysdubai.com',
        color: '#f97316',
        desc: 'Tourism booking platform for safari experiences in Dubai.',
        tags: ['PHP', 'WhatsApp API'],
        image: dsLogo,
    },
    {
        name: 'Stay in Mazra',
        category: 'Booking',
        url: 'https://stayinmazra.com',
        color: '#06b6d4',
        desc: 'Luxury villa rental platform with availability and booking systems.',
        tags: ['Next.js', 'SEO'],
        image: mazraLogo,
    },
    {
        name: 'Urban Laundry',
        category: 'Service',
        url: '#',
        color: '#00d4ff',
        desc: 'E-commerce laundry service platform with delivery tracking.',
        tags: ['React', 'Mobile First'],
        image: urbanLaundryLogo,
    },
    {
        name: 'IoT Management',
        category: 'Hardware',
        url: '#',
        color: '#7c3aed',
        desc: 'Smart device monitoring dashboard with real-time analytics.',
        tags: ['Node.js', 'IoT'],
        image: iotLogo,
    },
    {
        name: 'Enterprise CRM',
        category: 'Business',
        url: '#',
        color: '#ff0000',
        desc: 'Custom customer relationship management system with integrated lead tracking and automated reporting.',
        tags: ['Java', 'Spring Boot', 'MySQL'],
        image: molsysLogo,
    },
    {
        name: 'Inventory System',
        category: 'Management',
        url: '#',
        color: '#dc143c',
        desc: 'Real-time inventory tracking and warehouse management solution with barcode support and stock alerts.',
        tags: ['React', 'Node.js', 'Express'],
        image: urbanLaundryLogo,
    },
];



const STATS = [
    { value: '5+', label: 'Years Experience', icon: <Star size={18} /> },
    { value: '20+', label: 'Projects Delivered', icon: <Zap size={18} /> },
    { value: '100%', label: 'Client Satisfaction', icon: <Shield size={18} /> },
    { value: '10+', label: 'Happy Clients', icon: <Sparkles size={18} /> },
];



const PARTICLE_DATA = [...Array(12)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 4 + Math.random() * 4,
    width: `${2 + Math.random() * 4}px`,
    height: `${2 + Math.random() * 4}px`,
}));

/* ───── ANIMATION VARIANTS ───── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' }
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

/* ───── SKILL BAR ───── */
const SkillBar = ({ name, level }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <div className="skill-bar-item" ref={ref}>
            <div className="skill-bar-header">
                <span>{name}</span>
                <span className="skill-pct">{level}%</span>
            </div>
            <div className="skill-bar-track">
                <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                />
            </div>
        </div>
    );
};



/* ───── CONTACT FORM ───── */
const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
    const submit = e => {
        e.preventDefault();
        setSent(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="c-name">Full Name</label>
                    <input id="c-name" name="name" type="text" value={form.name} onChange={handle} placeholder="Mohammed Afheez" required />
                </div>
                <div className="form-group">
                    <label htmlFor="c-email">Email Address</label>
                    <input id="c-email" name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="c-msg">Message</label>
                <textarea id="c-msg" name="message" rows={5} value={form.message} onChange={handle} placeholder="Tell me about your project..." required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
                {sent ? '✓ Message Sent!' : <><Mail size={16} /> Send Message</>}
            </button>
            {sent && <p className="form-success">Thanks! I'll get back to you soon.</p>}
        </form>
    );
};

/* ───── HOME PAGE ───── */
const Home = () => {
    const [activeSkillTab, setActiveSkillTab] = useState('Frontend');

    return (
        <div className="home">
            {/* ══════════════ HERO ══════════════ */}
            <section id="home" className="hero-section">
                {/* Animated background & Orbs */}
                <div className="hero-bg">
                    <div className="hero-orb orb-1" />
                    <div className="hero-orb orb-2" />
                    <div className="hero-orb orb-3" />
                    <div className="hero-grain" />
                    <div className="hero-grid" />
                </div>

                {/* Floating particles (Expertly Tuned) */}
                <div className="particles" aria-hidden="true">
                    {PARTICLE_DATA.map((p) => (
                        <motion.span 
                            key={p.id} 
                            className="particle" 
                            animate={{
                                y: [-20, 20],
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                left: p.left,
                                top: p.top,
                                width: p.width,
                                height: p.height,
                            }} 
                        />
                    ))}
                </div>

                <div className="container hero-container">
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp} className="hero-badge">
                            <span className="badge-dot" />
                            Available for new projects
                        </motion.div>

                        <motion.h1 
                            className="hero-name"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            I'm <span className="gradient-text">Mohammed Afheez</span>
                        </motion.h1>

                        <motion.div 
                            className="hero-role"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Full-Stack Developer <span className="role-sep">/</span> Software Architect
                        </motion.div>

                        {/* Description */}
                        <motion.p variants={fadeUp} className="hero-desc">
                            Building high-performance, scalable web solutions with a focus on modern 
                            technologies and exceptional user experience.
                            <br />
                            <span className="loc-badge"><MapPin size={12} /> Based in Dubai, UAE</span>
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} className="hero-actions">
                            <a href="#contact" className="btn btn-primary" onClick={e => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                Get In Touch <ArrowRight size={16} />
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="btn btn-secondary"
                            >
                                <Download size={16} /> Download CV
                            </a>
                        </motion.div>

                        {/* Social links */}
                        <motion.div variants={fadeUp} className="hero-socials">
                            <a href="https://wa.me/971589556227" target="_blank" rel="noopener noreferrer" className="social-pill">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                WhatsApp
                            </a>
                            <a href="https://www.linkedin.com/in/mohammed-afheez" target="_blank" rel="noopener noreferrer" className="social-pill">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                LinkedIn
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual — Code Card */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                    >
                        <div className="code-window">
                            <div className="code-window-bar">
                                <span className="dot red" />
                                <span className="dot yellow" />
                                <span className="dot green" />
                                <span className="window-title">developer.js</span>
                            </div>
                            <pre className="code-body"><code>
<span className="ck">const</span> <span className="cf">Developer</span> = {'{'}{'\n'}
{'  '}<span className="cp">name</span>: <span className="cs">'Mohammed Afheez'</span>,{'\n'}
{'  '}<span className="cp">location</span>: <span className="cs">'Dubai, UAE 🇦🇪'</span>,{'\n'}
{'  '}<span className="cp">skills</span>: [{'\n'}
{'    '}<span className="cs">'React'</span>, <span className="cs">'Java'</span>,{'\n'}
{'    '}<span className="cs">'PHP'</span>, <span className="cs">'Node.js'</span>,{'\n'}
{'    '}<span className="cs">'MySQL'</span>, <span className="cs">'AWS'</span>,{'\n'}
{'  '}],{'\n'}
{'  '}<span className="cp">hardWorker</span>: <span className="cb">true</span>,{'\n'}
{'  '}<span className="cp">available</span>: <span className="cb">true</span>,{'\n'}
{'  '}<span className="cf">hireable</span>() {'{'}{'\n'}
{'    '}<span className="ck">return</span> <span className="cb">this</span>.<span className="cp">available</span>;{'\n'}
{'  '}{'}'}
{'}'};</code></pre>
                            <div className="code-glow" />
                        </div>

                        {/* Floating badges */}
                        <motion.div
                            className="floating-badge badge-react"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ⚛️ React
                        </motion.div>
                        <motion.div
                            className="floating-badge badge-java"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        >
                            ☕ Java
                        </motion.div>
                        <motion.div
                            className="floating-badge badge-php"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        >
                            🐘 PHP
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="scroll-indicator"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <ChevronDown size={22} />
                </motion.div>
            </section>

            {/* ══════════════ ABOUT ══════════════ */}
            <section id="about" className="about-section section">
                <div className="container">
                    <div className="about-grid">
                        {/* Left — Text */}
                        <motion.div
                            className="about-text"
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            <span className="section-label">About Me</span>
                            <h2 className="section-title">
                                Full-Stack Developer<br />
                                <span className="gradient-text">Based in Dubai</span>
                            </h2>
                            <p className="about-bio">
                                I'm <strong>Mohammed Afheez</strong>, a passionate Full-Stack Developer with 5+ years of hands-on experience delivering scalable web applications, secure RESTful APIs, and responsive UIs.
                            </p>
                            <p className="about-bio">
                                My core stack includes <strong>Java Spring Boot</strong>, <strong>React.js</strong>, <strong>PHP</strong>, and <strong>MySQL</strong>. I've worked with clients across UAE, India, and beyond — from pharmaceutical companies and real estate platforms to tourism portals and ERP systems.
                            </p>
                            <p className="about-bio">
                                I focus on clean architecture, performance, and pixel-perfect design to deliver products that make a real impact.
                            </p>

                            <div className="about-tags">
                                {['Problem Solver', 'Team Player', 'Clean Code', 'Agile', 'Detail Oriented'].map(t => (
                                    <span key={t} className="about-tag">{t}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — Stats */}
                        <motion.div
                            className="about-stats-col"
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            <div className="stats-grid">
                                {STATS.map((s, i) => (
                                    <motion.div
                                        key={i}
                                        className="stat-card"
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <div className="stat-icon">{s.icon}</div>
                                        <div className="stat-value">{s.value}</div>
                                        <div className="stat-label">{s.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Info card */}
                            <div className="about-info-card glass-card">
                                <div className="info-row">
                                    <MapPin size={16} className="info-icon" />
                                    <span>Dubai, UAE</span>
                                </div>
                                <div className="info-row">
                                    <Phone size={16} className="info-icon" />
                                    <a href="tel:+971589556227">+971 58 955 6227</a>
                                </div>
                                <div className="info-row">
                                    <Mail size={16} className="info-icon" />
                                    <a href="mailto:hafeez07.mohd@gmail.com">hafeez07.mohd@gmail.com</a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════ SKILLS ══════════════ */}
            <section id="skills" className="skills-section section">
                <div className="skills-bg" />
                <div className="container">
                    <motion.div
                        className="section-header-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="section-label">Technical Skills</span>
                        <h2 className="section-title">My Tech Arsenal</h2>
                        <p className="section-description">
                            A battle-tested stack for building full-scale web applications from concept to deployment.
                        </p>
                    </motion.div>

                    {/* Tabs */}
                    <div className="skill-tabs">
                        {Object.keys(SKILLS).map(tab => (
                            <button
                                key={tab}
                                className={`skill-tab ${activeSkillTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveSkillTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Skill bars */}
                    <motion.div
                        key={activeSkillTab}
                        className="skill-bars-grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {SKILLS[activeSkillTab].map(s => (
                            <SkillBar key={s.name} name={s.name} level={s.level} />
                        ))}
                    </motion.div>

                    {/* Tech badge cloud */}
                    <motion.div
                        className="tech-cloud"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {['React', 'Java', 'Spring Boot', 'PHP', 'Node.js', 'Python', 'MySQL', 'AWS', 'Docker', 'Git', 'HTML5', 'CSS3', 'TypeScript', 'Bootstrap', 'REST API', 'Linux'].map(t => (
                            <span key={t} className="tech-badge">{t}</span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══════════════ PROJECTS ══════════════ */}
            <section id="projects" className="projects-section section">
                <div className="container">
                    <motion.div
                        className="section-header-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="section-label">Portfolio</span>
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-description">
                            Real-world projects delivered for clients across UAE, India, and beyond.
                        </p>
                    </motion.div>

                    <div className="projects-grid">
                        {PROJECTS.map((proj, i) => (
                            <motion.div
                                key={proj.name}
                                className="project-card"
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                whileHover={{ y: -6 }}
                            >
                                {/* Card header */}
                                <div className="proj-image-container">
                                    <img src={proj.image} alt={proj.name} className="proj-logo" />
                                    <span className="proj-category">{proj.category}</span>
                                </div>

                                {/* Content */}
                                <div className="proj-body">
                                    <h3 className="proj-name">{proj.name}</h3>
                                    <p className="proj-desc">{proj.desc}</p>
                                    <div className="proj-tags">
                                        {proj.tags.map(t => (
                                            <span key={t} className="proj-tag">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="proj-footer">
                                    {proj.url !== '#' ? (
                                        <a href={proj.url} target="_blank" rel="noopener noreferrer" className="proj-link">
                                            <ExternalLink size={14} /> Visit Site
                                        </a>
                                    ) : (
                                        <span className="proj-link muted">Private Project</span>
                                    )}
                                </div>

                                {/* Hover glow */}
                                <div className="proj-glow" style={{ '--proj-color': proj.color }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════ CONTACT ══════════════ */}
            <section id="contact" className="contact-section section">
                <div className="container">
                    <motion.div
                        className="section-header-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="section-label">Get In Touch</span>
                        <h2 className="section-title">Let's Work Together</h2>
                        <p className="section-description">
                            Have a project idea or need a developer? Drop me a message — I'd love to hear from you.
                        </p>
                    </motion.div>

                    <div className="contact-grid">
                        {/* Info */}
                        <motion.div
                            className="contact-info"
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="contact-card glass-card">
                                <h3>Contact Information</h3>
                                <p>Reach out through any of these channels and I'll respond within 24 hours.</p>

                                <div className="contact-items">
                                    <a href="tel:+971589556227" className="contact-item-card">
                                        <div className="ci-icon" style={{ '--ci-color': '#ff0000' }}>
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <span className="ci-label">Phone / WhatsApp</span>
                                            <span className="ci-value">+971 58 955 6227</span>
                                        </div>
                                    </a>
                                    <a href="mailto:afheez@example.com" className="contact-item-card">
                                        <div className="ci-icon" style={{ '--ci-color': '#dc143c' }}>
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <span className="ci-label">Email</span>
                                            <span className="ci-value">hafeez07.mohd@gmail.com</span>
                                        </div>
                                    </a>
                                    <div className="contact-item-card">
                                        <div className="ci-icon" style={{ '--ci-color': '#990000' }}>
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <span className="ci-label">Location</span>
                                            <span className="ci-value">Dubai, UAE 🇦🇪</span>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp CTA */}
                                <a href="https://wa.me/971589556227" target="_blank" rel="noopener noreferrer" className="btn btn-primary wa-btn">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            className="contact-form-wrap glass-card"
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3>Send a Message</h3>
                            <ContactForm />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
