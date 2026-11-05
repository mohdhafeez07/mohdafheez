// Single source of truth for portfolio content (mirrors Mohammed_Afheez_CV).
import rinoImg from '../assets/projects/rino.webp';
import rinoWideImg from '../assets/projects/rino-wide.webp';
import desertImg from '../assets/projects/desertways.webp';
import zufirosImg from '../assets/projects/zufiros.webp';
import thermoImg from '../assets/projects/thermo.webp';
import diamondImg from '../assets/projects/diamond.webp';
import dnalystImg from '../assets/projects/dnalyst.webp';
import molsysImg from '../assets/projects/molsys.webp';
import fanMolsys from '../assets/projects/portrait/molsys.webp';
import fanZufiros from '../assets/projects/portrait/zufiros.webp';
import fanDesert from '../assets/projects/portrait/desertways.webp';
import fanRino from '../assets/projects/portrait/rino.webp';
import fanDiamond from '../assets/projects/portrait/diamond.webp';
import fanDnalyst from '../assets/projects/portrait/dnalyst.webp';
import fanThermo from '../assets/projects/portrait/thermo.webp';

export const PROFILE = {
    name: 'Mohammed Afheez',
    role: 'Full-Stack Developer',
    location: 'Dubai, UAE',
    email: 'hafeez07.mohd@gmail.com',
    phone: '+971 58 955 6227',
    phoneHref: 'tel:+971589556227',
    whatsapp: 'https://wa.me/971589556227',
    linkedin: 'https://www.linkedin.com/in/mohammed-afheez',
    github: 'https://github.com/mohdhafeez07',
    resume: '/resume.pdf',
};

export const NAV = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Case study' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
];

export const STATS = [
    { value: '2+', label: 'Years building production software' },
    { value: '4', label: 'Brand websites owned end-to-end' },
    { value: '7', label: 'Live sites shipped for clients' },
    { value: 'OCI', label: 'Oracle Cloud Infrastructure certified' },
];

export const FOCUS = [
    {
        icon: 'layers',
        title: 'Full-stack product builds',
        text: 'Next.js and React front ends backed by Node.js or Spring Boot APIs, deployed on Vercel and AWS.',
    },
    {
        icon: 'workflow',
        title: 'CRM & lead automation',
        text: 'Website forms piped into Bitrix24 with email workflows, WhatsApp Business API and spam protection.',
    },
    {
        icon: 'search',
        title: 'Technical SEO & AEO',
        text: 'Schema.org, llms.txt and multilingual keyword strategy that gets sites indexed by AI search engines.',
    },
];

export const FEATURED = {
    name: 'Rino Properties',
    url: 'https://rinoproperties.com',
    image: rinoImg,
    imageWide: rinoWideImg,
    category: 'Real Estate · Dubai & Spain',
    period: '2026 — Present',
    role: 'Full-Stack Developer, Rino Invest Group',
    scope: ['Website redesign', 'Listing admin & REST API', 'CRM lead pipeline', 'SEO, AEO & analytics'],
    summary:
        'Luxury real-estate platform for Rino Invest Group covering off-plan and ready properties across Dubai and Spain. I redesigned the site and own it end-to-end — from the listing backend to search visibility.',
    highlights: [
        'Property-listing admin panel and REST backend synced with the Bitrix24 Property API',
        'Automated lead pipeline from site forms into Bitrix24 CRM, secured with Cloudflare Turnstile',
        'Technical SEO & AEO — Schema.org, llms.txt, multilingual keywords — plus GTM, GA4 and Google Ads tracking',
        'Project-launch landing pages, deployed on Vercel and AWS App Runner with Amazon S3',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'Bitrix24', 'AWS App Runner', 'S3', 'Vercel'],
};

export const PROJECTS = [
    {
        name: 'Desert Ways Dubai',
        category: 'Tourism',
        url: 'https://www.desertwaysdubai.com',
        image: desertImg,
        desc: 'Desert-safari booking site with tour packages, galleries and instant WhatsApp booking.',
        tags: ['PHP', 'WhatsApp API', 'SEO'],
    },
    {
        name: 'Zufiros Pharmaceuticals',
        category: 'Healthcare',
        url: 'https://www.zufiros.com',
        repo: 'https://github.com/mohdhafeez07/ZUFIROS',
        image: zufirosImg,
        desc: 'Corporate pharmaceutical website with a complete product catalogue and SEO optimisation.',
        tags: ['React', 'PHP', 'SEO'],
    },
    {
        name: 'Diamond Construction',
        category: 'Real Estate',
        url: 'https://diamondconstruction.netlify.app',
        repo: 'https://github.com/mohdhafeez07/diamond-construction',
        image: diamondImg,
        desc: 'Premium construction showcase for the Diamond Habitat project with animated, interactive galleries.',
        tags: ['React', 'Framer Motion'],
    },
    {
        name: 'Thermo Line Road Marking',
        category: 'Construction',
        url: 'https://thermolineroa.netlify.app',
        image: thermoImg,
        desc: 'Company website for a UAE road-marking contractor — thermoplastic, cold-plastic and runway marking services.',
        tags: ['React', 'Netlify'],
    },
    {
        name: 'dnalyst',
        category: 'Health-tech',
        url: 'https://dnalyst.in',
        image: dnalystImg,
        desc: 'Genetics-based nutrition platform. Built Spring Boot backend services and REST APIs at Molsys.',
        tags: ['Spring Boot', 'MySQL', 'JPA', 'JWT'],
    },
    {
        name: 'Molsys Scientific',
        category: 'Life Sciences',
        url: 'https://molsys.in',
        image: molsysImg,
        desc: 'Laboratory analysis and scientific-services portal with detailed service and programme pages.',
        tags: ['React', 'Web'],
    },
];

export const PRIVATE_WORK = {
    name: 'Enterprise ERP Suite',
    company: 'Phoenix Dison Tec LLC',
    desc: 'HRMS, CRM, Payroll and Inventory modules with secure REST APIs, JWT authentication and role-based access control, plus n8n + OpenAI workflow automation.',
    tags: ['React', 'Angular', 'Node.js', 'TypeScript', 'PostgreSQL', 'n8n'],
};

export const EXPERIENCE = [
    {
        role: 'Full-Stack Developer',
        company: 'Rino Invest Group',
        context: 'Real Estate & Investment (Dubai & Spain)',
        period: '06/2026 — Present',
        location: 'Dubai, UAE',
        current: true,
        points: [
            'Own full-stack development of four brand websites with Next.js, React and Node.js, deployed on Vercel and AWS App Runner with Amazon S3.',
            'Architected a property-listing admin panel and REST backend, synchronised with the Bitrix24 Property API.',
            'Built an automated lead pipeline from website forms into Bitrix24 CRM with email workflows; integrating WhatsApp Business API.',
            'Secured all lead forms with Cloudflare Turnstile, blocking spam submissions to the CRM.',
            'Led technical SEO and AEO across all sites — Schema.org, llms.txt and multilingual keyword strategy — achieving indexing by AI search engines.',
            'Implemented Google Tag Manager, GA4 and Google Ads tracking, and redesigned rinoproperties.com with project launch landing pages.',
        ],
    },
    {
        role: 'Full-Stack Developer & IT Support',
        company: 'Phoenix Dison Tec LLC',
        period: '04/2025 — 06/2026',
        location: 'Dubai, UAE',
        points: [
            'Developed enterprise ERP modules (HRMS, CRM, Payroll, Inventory) with React, Angular, Node.js, TypeScript and PostgreSQL.',
            'Built secure REST APIs with JWT authentication and RBAC; improved performance via lazy loading and API optimisation.',
            'Automated business workflows with n8n and the OpenAI API.',
        ],
    },
    {
        role: 'Software Developer',
        company: 'Molsys Pvt Ltd',
        period: '09/2024 — 03/2025',
        location: 'India',
        points: [
            'Built Java Spring Boot backend services and REST APIs for production systems, including DNAlyst, a health-tech platform (MySQL, JPA, JWT).',
            'Optimised database queries and backend logic for faster response times in an Agile team.',
        ],
    },
    {
        role: 'Full-Stack Development Intern',
        company: 'Yenepoya Technology Incubator',
        period: '05/2024 — 08/2024',
        location: 'India',
        points: [
            'Built responsive web applications with JavaScript, PHP and MySQL, including schema design and query optimisation.',
        ],
    },
];

export const EDUCATION = {
    degree: 'B.E. in Computer Science and Engineering',
    school: 'P.A. College of Engineering',
    period: '2020 — 2024',
    location: 'Mangalore, India',
};

export const CERTIFICATIONS = [
    'Oracle Cloud Infrastructure',
    'Search Engine Optimization (SEO)',
    'Deloitte Australia — Data Analytics Job Simulation',
    'Java',
    'Python',
    'AI & Machine Learning',
];

export const SKILLS = [
    {
        icon: 'monitor',
        title: 'Frontend Development',
        items: ['Next.js', 'React.js', 'Angular', 'Tailwind CSS', 'Bootstrap', 'GSAP', 'HTML5 & CSS3'],
    },
    {
        icon: 'server',
        title: 'Backend Development',
        items: ['Node.js', 'Spring Boot', 'REST APIs', 'JWT Authentication', 'RBAC'],
    },
    {
        icon: 'braces',
        title: 'Programming Languages',
        items: ['JavaScript', 'TypeScript', 'Java', 'PHP', 'Python', 'SQL'],
    },
    {
        icon: 'database',
        title: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server'],
    },
    {
        icon: 'cloud',
        title: 'Cloud & Deployment',
        items: ['AWS App Runner', 'Amazon S3', 'Vercel', 'Cloudflare', 'Oracle Cloud (OCI)', 'Docker', 'CI/CD', 'Linux'],
    },
    {
        icon: 'wrench',
        title: 'Tools & Technologies',
        items: ['Git & GitHub', 'Bitrix24', 'WhatsApp Business API', 'n8n', 'OpenAI API', 'GTM & GA4', 'Postman', 'Figma', 'Jira'],
    },
];

export const LANGUAGES = ['English', 'Hindi', 'Malayalam', 'Kannada', 'Tamil'];

/* ── Featured projects fan ─────────────────────────────────────────────
   Edit freely: order is left → right, index 3 is the centre card.
   On phones only the middle five (indices 1–5) are shown.
   Each item: { title, desc, tags, image, url, video? }  — `video` is an
   optional mp4 path; when present it plays (muted, looped) over the image. */

export const FAN_PROJECTS = [
    { title: 'Molsys Scientific', desc: 'Laboratory analysis & scientific-services portal.', tags: ['React', 'Web'], image: fanMolsys, url: 'https://molsys.in' },
    { title: 'Zufiros Pharmaceuticals', desc: 'Corporate site with a full product catalogue.', tags: ['React', 'PHP', 'SEO'], image: fanZufiros, url: 'https://www.zufiros.com' },
    { title: 'Desert Ways Dubai', desc: 'Desert-safari booking with instant WhatsApp.', tags: ['PHP', 'WhatsApp API'], image: fanDesert, url: 'https://www.desertwaysdubai.com' },
    { title: 'Rino Properties', desc: 'Luxury real estate across Dubai & Spain, synced to Bitrix24.', tags: ['Next.js', 'Node.js', 'AWS'], image: fanRino, url: 'https://rinoproperties.com' },
    { title: 'Diamond Construction', desc: 'Animated showcase for the Diamond Habitat project.', tags: ['React', 'Framer Motion'], image: fanDiamond, url: 'https://diamondconstruction.netlify.app' },
    { title: 'dnalyst', desc: 'Genetics-based nutrition platform on Spring Boot.', tags: ['Spring Boot', 'MySQL'], image: fanDnalyst, url: 'https://dnalyst.in' },
    { title: 'Thermo Line', desc: 'UAE road-marking contractor website.', tags: ['React', 'Netlify'], image: fanThermo, url: 'https://thermolineroa.netlify.app' },
];
