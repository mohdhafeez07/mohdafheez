import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import FanCard from './FanCard';
import { cardPose, layoutFor } from './fanLayout';
import { FAN_PROJECTS, PROFILE } from '../../data/content';
import { finePointer, gsap, introDone, MOTION_OK, prefersReducedMotion, useGSAP } from '../../lib/motion';
import './FeaturedFan.css';

const LINKS = [
    { label: 'GitHub', href: PROFILE.github, external: true },
    { label: 'LinkedIn', href: PROFILE.linkedin, external: true },
    { label: 'Case study', href: '#work' },
];

/**
 * "Selected Projects" — a hand of portrait project cards.
 * Desktop: hover a card to lift it and part the hand around it.
 * Touch: first tap focuses a card, second tap opens it.
 */
const FeaturedFan = () => {
    const root = useRef(null);
    const [layout, setLayout] = useState(() => layoutFor(window.innerWidth));
    const [active, setActive] = useState(null);
    const [still] = useState(prefersReducedMotion);
    // Hover transitions are switched off while the entrance animation drives the cards.
    const [entering, setEntering] = useState(() => !prefersReducedMotion());

    /* Re-layout on resize (rAF-throttled). */
    useEffect(() => {
        let raf = 0;
        const onResize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => setLayout(layoutFor(window.innerWidth)));
        };
        window.addEventListener('resize', onResize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    /* Touch: tapping anywhere outside the hand clears the focused card. */
    useEffect(() => {
        const onDown = e => !e.target.closest?.('.fan-card') && setActive(null);
        document.addEventListener('pointerdown', onDown);
        return () => document.removeEventListener('pointerdown', onDown);
    }, []);

    /* Scroll entrance: heading rises through an oval mask, then the hand fans out from the centre. */
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const q = gsap.utils.selector(root);
                const cards = q('.fan-card:not([hidden])');
                const lines = q('.fan-line-inner');
                const extras = q('.fan-icon, .fan-foot > *');
                let cancelled = false;

                // Hidden start state immediately (before paint) so nothing flashes.
                gsap.set(lines, { yPercent: 100 });
                gsap.set(cards, { '--p': 0, opacity: 0 });
                gsap.set(extras, { autoAlpha: 0, y: 16 });

                // Build the entrance once the preloader has lifted, so it never plays behind it.
                introDone.then(() => {
                    if (cancelled) return;
                    mm.add(MOTION_OK, () => {
                        gsap.timeline({
                            scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
                            onComplete: () => setEntering(false),
                        })
                            .fromTo(q('.fan-icon'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 })
                            .fromTo(lines, { yPercent: 100 }, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out' }, 0.05)
                            .fromTo(cards, { '--p': 0, opacity: 0 }, { '--p': 1, opacity: 1, duration: 1.3, ease: 'expo.out', stagger: { each: 0.06, from: 'center' } }, 0.25)
                            .fromTo(q('.fan-foot > *'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, clearProps: 'transform' }, 0.7);
                    });
                });
                return () => {
                    cancelled = true;
                };
            });
        },
        { scope: root }
    );

    const activate = useCallback(i => setActive(i), []);

    // Leaving a card: keep state if the pointer/focus went straight to another card.
    const leave = useCallback(e => {
        if (e.relatedTarget?.closest?.('.fan-card')) return;
        setActive(null);
    }, []);

    // Touch / coarse pointers: first tap focuses, second tap follows the link.
    const tap = useCallback(
        (e, i) => {
            if (finePointer() || e.detail === 0) return; // mouse click or keyboard Enter → navigate
            if (active !== i) {
                e.preventDefault();
                setActive(i);
            }
        },
        [active]
    );

    const [first, last] = layout.range;

    return (
        <section id="projects" className={`fan ${entering ? 'is-entering' : ''}`} ref={root} aria-labelledby="fan-title" tabIndex={-1}>
            <div className="container fan-inner">
                <svg className="fan-icon" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M24 2c1.6 12 4 14.4 22 22-18 7.6-20.4 10-22 22-1.6-12-4-14.4-22-22 18-7.6 20.4-10 22-22Z" />
                </svg>

                <h2 className="fan-title" id="fan-title" aria-label="Selected projects">
                    <span className="fan-line" aria-hidden="true"><span className="fan-line-inner fan-sans">Selected</span></span>
                    <span className="fan-line" aria-hidden="true"><span className="fan-line-inner fan-serif">Projects</span></span>
                </h2>

                <ul className="fan-stage" onPointerLeave={() => finePointer() && setActive(null)}>
                    {FAN_PROJECTS.map((p, i) => (
                        <FanCard
                            key={p.title}
                            project={p}
                            index={i}
                            pose={cardPose(i, active, layout, still)}
                            active={active === i}
                            hidden={i < first || i > last}
                            onActivate={activate}
                            onLeave={leave}
                            onTap={tap}
                        />
                    ))}
                </ul>

                <div className="fan-foot">
                    <p className="fan-explore">Explore more of my work</p>
                    <ul className="fan-links">
                        {LINKS.map(l => (
                            <li key={l.label}>
                                <a href={l.href} {...(l.external && { target: '_blank', rel: 'noopener noreferrer' })}>
                                    {l.label}
                                    {l.external ? <ArrowUpRight size={13} /> : <ArrowDown size={13} />}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="fan-fade" aria-hidden="true" />
        </section>
    );
};

export default FeaturedFan;
