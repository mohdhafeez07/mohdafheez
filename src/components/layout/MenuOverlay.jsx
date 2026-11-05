import { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { NAV, PROFILE } from '../../data/content';
import { HERO } from '../../data/hero.config';
import { getLenis, gsap, prefersReducedMotion, scrollToTarget } from '../../lib/motion';
import useDubaiTime from '../../lib/useDubaiTime';
import './MenuOverlay.css';

const LINKS = [{ id: 'top', label: 'Home' }, ...NAV];

/**
 * Full-screen dark menu. Big serif links stagger in; Esc closes; the page
 * behind is made inert while it's open.
 */
const MenuOverlay = ({ open, active, onClose }) => {
    const root = useRef(null);
    const tl = useRef(null);
    const time = useDubaiTime();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(root.current, { clipPath: 'inset(0% 0% 100% 0%)' });
            tl.current = gsap
                .timeline({ paused: true, defaults: { ease: 'expo.inOut' } })
                .set(root.current, { visibility: 'visible' })
                .to(root.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85 })
                .from('.mo-link-inner', { yPercent: 110, duration: 0.9, stagger: 0.05, ease: 'expo.out' }, 0.3)
                .from('.mo-side > *', { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.05, ease: 'expo.out' }, 0.45);
        }, root);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const lenis = getLenis();
        const main = document.getElementById('main');
        const footer = document.querySelector('footer');
        const reduce = prefersReducedMotion();
        if (open) {
            lenis?.stop();
            document.documentElement.classList.add('menu-open');
            main?.setAttribute('inert', '');
            footer?.setAttribute('inert', '');
            root.current.scrollTop = 0;
            reduce ? tl.current?.progress(1) : tl.current?.timeScale(1).play();
            requestAnimationFrame(() => root.current?.querySelector('a')?.focus({ preventScroll: true }));
        } else {
            lenis?.start();
            document.documentElement.classList.remove('menu-open');
            main?.removeAttribute('inert');
            footer?.removeAttribute('inert');
            reduce ? tl.current?.progress(0) : tl.current?.timeScale(1.6).reverse();
        }
        const onKey = e => open && e.key === 'Escape' && onClose(true);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    const go = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(false);
        setTimeout(() => scrollToTarget(`#${id}`), 250);
    };

    return (
        <div
            id="site-menu"
            ref={root}
            className="mo"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            aria-hidden={!open}
            inert={!open ? true : undefined}
        >
            <div className="mo-inner">
                <nav className="mo-links" aria-label="Menu">
                    {LINKS.map(({ id, label }, i) => (
                        <a key={id} href={`#${id}`} onClick={e => go(e, id)} className={`mo-link ${active === id ? 'is-active' : ''}`} aria-current={active === id ? 'true' : undefined}>
                            <span className="mo-link-inner">
                                <span className="mo-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="mo-text">{label}</span>
                            </span>
                        </a>
                    ))}
                </nav>

                <div className="mo-side">
                    <div>
                        <p className="mo-label">Get in touch</p>
                        <a href={`mailto:${PROFILE.email}`} className="mo-email">{PROFILE.email}</a>
                    </div>
                    <div>
                        <p className="mo-label">{HERO.follow.label}</p>
                        <ul className="mo-socials">
                            {HERO.follow.links.map(l => (
                                <li key={l.label}>
                                    <a href={l.href} {...(l.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
                                        {l.label} <ArrowUpRight size={13} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a href={PROFILE.resume} download="Mohammed_Afheez_CV.pdf" className="mo-resume">
                        <Download size={16} /> Download CV
                    </a>
                    <p className="mo-label">{HERO.availability.city}, UAE · {time}</p>
                </div>
            </div>
        </div>
    );
};

export default MenuOverlay;
