import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ContourBackground from './ContourBackground';
import Signature from './Signature';
import Marquee from './Marquee';
import RollLink from './RollLink';
import Magnetic from '../../components/Magnetic';
import { HERO } from '../../data/hero.config';
import { finePointer, finishIntro, fontsReady, gsap, MOTION_OK, prefersReducedMotion, useGSAP } from '../../lib/motion';
import useDubaiTime from '../../lib/useDubaiTime';
import './Hero.css';

const EASE = 'power4.out'; // close to cubic-bezier(.22,1,.36,1)
const isExternal = href => /^(https?:|mailto:)/.test(href);

/** Raised tab on the panel's top edge (shape flows into the panel). */
const Notch = ({ label }) => (
    <div className="notch" aria-hidden="true">
        <svg viewBox="0 0 240 34" preserveAspectRatio="none">
            <path d="M0 34 C12 34 18 28 18 18 L18 14 C18 6 24 0 32 0 L208 0 C216 0 222 6 222 14 L222 18 C222 28 228 34 240 34 Z" />
        </svg>
        <span className="notch-label">✦<span className="notch-text"> {label}</span></span>
    </div>
);

const Headline = ({ lines, context }) => (
    <h1 className="hl">
        <span className="sr-only">{context} </span>
        {lines.map((words, i) => (
            <span key={i} className={`hl-line hl-line-${i + 1}`}>
                <span className="hl-inner">
                    {words.map((w, k) =>
                        w.gap ? (
                            <span key={k} className="hl-gap" aria-hidden="true" />
                        ) : (
                            <span key={k} className={`hl-word hl-${w.style ?? 'sans'}`}>{w.text}</span>
                        )
                    )}
                </span>
            </span>
        ))}
    </h1>
);

const Hero = () => {
    const root = useRef(null);
    const time = useDubaiTime();
    const { portrait } = HERO;

    useGSAP(
        () => {
            if (prefersReducedMotion()) {
                finishIntro();
                return;
            }
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const q = gsap.utils.selector(root);
                let cancelled = false;
                let skip = () => {};

                // Start states (applied before first paint).
                gsap.set(q('.hero-shell'), { scale: 0.96 });
                gsap.set(q('.hero-panel'), { '--rk': 2 }); // 2× the CSS radius (4rem on desktop)
                gsap.set(q('.contours'), { opacity: 0 });
                gsap.set(q('.hl-inner'), { yPercent: 100 });
                gsap.set(q('.hero-portrait'), { y: 80, opacity: 0, filter: 'blur(10px)' });
                gsap.set(q('.hero-col > *, .hero-badge, .hero-bottom'), { opacity: 0, y: 18 });
                const sig = q('.sig-path');
                sig.forEach(p => {
                    const len = p.getTotalLength();
                    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
                });

                fontsReady().then(() => {
                    if (cancelled) return;
                    gsap.set(q('[data-hero]'), { visibility: 'visible' });
                    finishIntro(); // let the rest of the page arm its scroll reveals

                    // Load sequence — ~2.1s total, any input skips to the end.
                    const tl = gsap.timeline({ defaults: { ease: EASE } });
                    tl.to(q('.hero-shell'), { scale: 1, duration: 1.1 }, 0)
                        .to(q('.hero-panel'), { '--rk': 1, duration: 1.1 }, 0)
                        .to(q('.contours'), { opacity: 1, duration: 1.2, ease: 'none' }, 0.1)
                        .to(sig, { strokeDashoffset: 0, duration: 0.8, stagger: 0.25, ease: 'power2.inOut' }, 0.3)
                        .to(q('.hl-inner'), { yPercent: 0, duration: 1, stagger: 0.1 }, 0.35)
                        .to(q('.hero-portrait'), { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1 }, 0.6)
                        .to(q('.hero-col > *'), { opacity: 1, y: 0, duration: 0.8, stagger: 0.05 }, 0.9)
                        .to(q('.hero-badge, .hero-bottom'), { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, clearProps: 'transform' }, 1.35);

                    skip = () => tl.progress(1);
                    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev =>
                        window.addEventListener(ev, skip, { once: true, passive: true })
                    );
                    tl.eventCallback('onComplete', () =>
                        ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev => window.removeEventListener(ev, skip))
                    );
                });

                // Scroll-out: portrait grows, headline lags behind (parallax), corners soften.
                gsap.timeline({
                    scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
                })
                    .fromTo(q('.hero-portrait img'), { scale: 1 }, { scale: 1.08, ease: 'none', immediateRender: false }, 0)
                    .fromTo(q('.hl'), { y: 0 }, { y: () => window.innerHeight * 0.18, ease: 'none', immediateRender: false }, 0)
                    .fromTo(q('.hero-panel'), { '--rk': 1 }, { '--rk': 1.5, ease: 'none', immediateRender: false }, 0);

                // Mouse parallax: portrait tilts (≤6°), contours drift the other way. Desktop only.
                let cleanupPointer = () => {};
                if (finePointer()) {
                    const tilt = q('.hero-portrait')[0];
                    const map = q('.contours-parallax')[0];
                    gsap.set(tilt, { transformPerspective: 1000 });
                    const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: EASE });
                    const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: EASE });
                    const mx = gsap.quickTo(map, 'x', { duration: 1.6, ease: EASE });
                    const my = gsap.quickTo(map, 'y', { duration: 1.6, ease: EASE });
                    const panel = q('.hero-panel')[0];
                    const onMove = e => {
                        const r = panel.getBoundingClientRect();
                        const nx = (e.clientX - r.left) / r.width - 0.5;
                        const ny = (e.clientY - r.top) / r.height - 0.5;
                        ry(nx * 12); // ±6°
                        rx(-ny * 12);
                        mx(-nx * 30);
                        my(-ny * 20);
                    };
                    const onLeave = () => {
                        ry(0);
                        rx(0);
                    };
                    panel.addEventListener('pointermove', onMove);
                    panel.addEventListener('pointerleave', onLeave);
                    cleanupPointer = () => {
                        panel.removeEventListener('pointermove', onMove);
                        panel.removeEventListener('pointerleave', onLeave);
                    };
                }

                return () => {
                    cancelled = true;
                    cleanupPointer();
                    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev => window.removeEventListener(ev, skip));
                };
            });
        },
        { scope: root }
    );

    return (
        <section id="top" className="hero" ref={root} aria-label="Introduction" tabIndex={-1}>
            <div className="hero-shell">
                <Notch label={HERO.notchLabel} />

                <div className="hero-panel">
                    <ContourBackground />

                    <p className="hero-badge" data-hero>
                        <span className="badge-dot" aria-hidden="true" />
                        <span>{HERO.availability.label}</span>
                        <span className="badge-sep" aria-hidden="true">·</span>
                        <span className="badge-time">{HERO.availability.city} {time}</span>
                    </p>

                    <div className="hero-grid">
                        <div className="hero-head">
                            <Signature />
                            <Headline lines={HERO.headline} context={HERO.headlineContext} />
                        </div>

                        <nav className="hero-col hero-col-left" aria-label={HERO.pages.label}>
                            <p className="hero-col-label">{HERO.pages.label}</p>
                            <ul className="hero-links">
                                {HERO.pages.links.map(l => (
                                    <li key={l.label}><RollLink href={l.href}>{l.label}</RollLink></li>
                                ))}
                            </ul>
                            <RollLink href={HERO.pages.resume.href} download={HERO.pages.resume.download} className="roll-accent">
                                {HERO.pages.resume.label} ↓
                            </RollLink>
                        </nav>

                        <div className="hero-portrait" data-hero>
                            <picture>
                                <source type="image/avif" srcSet={`${portrait.avifSm} 440w, ${portrait.avif} 720w`} sizes="(max-width: 767px) 70vw, 30vw" />
                                <source type="image/webp" srcSet={`${portrait.webpSm} 440w, ${portrait.webp} 720w`} sizes="(max-width: 767px) 70vw, 30vw" />
                                <img src={portrait.webp} alt={portrait.alt} width={portrait.width} height={portrait.height} fetchPriority="high" decoding="async" />
                            </picture>
                        </div>

                        <nav className="hero-col hero-col-right" aria-label={HERO.follow.label}>
                            <p className="hero-col-label">{HERO.follow.label}</p>
                            <ul className="hero-links">
                                {HERO.follow.links.map(l => (
                                    <li key={l.label}><RollLink href={l.href} external={isExternal(l.href) && !l.href.startsWith('mailto:')}>{l.label}</RollLink></li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="hero-bottom" data-hero>
                        <Magnetic strength={0.25} className="hero-cta-wrap">
                            <a href={HERO.cta.href} className="hero-cta">
                                {HERO.cta.label} <ArrowUpRight size={17} />
                            </a>
                        </Magnetic>
                        <Marquee items={HERO.marquee} />
                    </div>
                </div>
            </div>

            <div className="hero-foot">
                <p>© {new Date().getFullYear()} {HERO.footer.copy}</p>
                <ul>
                    {HERO.footer.links.map(l => (
                        <li key={l.label}>
                            <a href={l.href} {...(l.download && { download: l.download })} {...(l.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Hero;
