// Everything the hero, top bar and menu display lives here — edit freely.
import { PROFILE } from './content';
import portrait from '../assets/portrait-cutout.webp';
import portraitSm from '../assets/portrait-cutout-sm.webp';
import portraitAvif from '../assets/portrait-cutout.avif';
import portraitAvifSm from '../assets/portrait-cutout-sm.avif';
import rinoLogo from '../assets/logos/rino.webp';
import phoenixLogo from '../assets/logos/phoenix.webp';
import molsysLogo from '../assets/logos/molsys.webp';
import dnalystLogo from '../assets/logos/dnalyst.webp';
import diamondLogo from '../assets/logos/diamond.webp';

export const HERO = {
    /** Small label inside the notch tab at the top of the panel. */
    notchLabel: 'Full-Stack Developer',

    /** Two-line logo in the top bar: serif line over heavy sans line. */
    logo: { top: 'Mohammed', bottom: 'Afheez', href: '#top' },

    /**
     * Headline — two lines, word by word.
     * style: 'sans' | 'accent' (serif, lime) | 'outline' (serif, outlined)
     * { gap: true } leaves room for the portrait between words on large screens.
     */
    headline: [
        [{ text: 'Building' }, { text: 'websites', style: 'accent' }],
        [{ text: 'That' }, { gap: true }, { text: 'perform.', style: 'outline' }],
    ],
    /** Read by screen readers / search engines as part of the <h1>. */
    headlineContext: `${PROFILE.name}, full-stack developer in Dubai —`,

    /** "Let's talk" opens a WhatsApp chat with a pre-typed greeting. */
    talk: {
        label: "Let's talk",
        href: `${PROFILE.whatsapp}?text=${encodeURIComponent("Hi Afheez, I found your portfolio and I'd like to talk about a project.")}`,
        external: true,
        ariaLabel: `Chat on WhatsApp (${PROFILE.phone})`,
    },
    cta: { label: 'Start a project', href: '#contact' },

    availability: { label: 'Available for freelance', city: 'Dubai' },

    pages: {
        label: 'Pages',
        links: [
            { label: 'Home', href: '#top' },
            { label: 'Projects', href: '#projects' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
        ],
        resume: { label: 'Resume', href: PROFILE.resume, download: 'Mohammed_Afheez_CV.pdf' },
    },

    follow: {
        label: 'Follow on',
        links: [
            { label: 'GitHub', href: PROFILE.github },
            { label: 'LinkedIn', href: PROFILE.linkedin },
            { label: 'WhatsApp', href: PROFILE.whatsapp },
            { label: 'Email', href: `mailto:${PROFILE.email}` },
        ],
    },

    /** Marquee: tech as mono text, clients / employers as white logos. */
    marquee: [
        { label: 'React' },
        { logo: rinoLogo, alt: 'Rino Properties', h: 1.9 },
        { label: 'Next.js' },
        { logo: phoenixLogo, alt: 'Phoenix Dison Tec', h: 1.3 },
        { label: 'Node.js' },
        { logo: molsysLogo, alt: 'Molsys Scientific', h: 1 },
        { label: 'Tailwind CSS' },
        { logo: dnalystLogo, alt: 'dnalyst', h: 1.3 },
        { label: 'Spring Boot' },
        { logo: diamondLogo, alt: 'Diamond Construction', h: 1.6 },
        { label: 'Vercel' },
        { label: 'AWS' },
        { label: 'PostgreSQL' },
        { label: 'Bitrix24' },
    ],

    portrait: {
        webp: portrait,
        webpSm: portraitSm,
        avif: portraitAvif,
        avifSm: portraitAvifSm,
        width: 720,
        height: 1216,
        alt: 'Mohammed Afheez in a navy suit',
    },

    footer: {
        copy: PROFILE.name,
        links: [
            { label: 'Resume', href: PROFILE.resume, download: 'Mohammed_Afheez_CV.pdf' },
            { label: 'Email', href: `mailto:${PROFILE.email}` },
            { label: 'LinkedIn', href: PROFILE.linkedin },
        ],
    },
};
