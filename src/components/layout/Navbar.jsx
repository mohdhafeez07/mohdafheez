import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV } from '../../data/content';
import { HERO } from '../../data/hero.config';
import { scrollToTarget, ScrollTrigger } from '../../lib/motion';
import ThemeToggle from '../ThemeToggle';
import Magnetic from '../Magnetic';
import MenuOverlay from './MenuOverlay';
import { WhatsAppIcon } from '../BrandIcons';
import './Navbar.css';

/**
 * Fixed top bar: two-line logo (left); theme toggle, "Let's talk" pill and
 * a square menu button (right). Hides while scrolling down.
 */
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('');
    const header = useRef(null);
    const progress = useRef(null);
    const toggleBtn = useRef(null);

    /* Scroll progress + hide-on-scroll-down + background once off the top */
    useEffect(() => {
        const st = ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: self => {
                if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
                header.current?.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 200);
                header.current?.classList.toggle('is-scrolled', self.scroll() > 24);
            },
        });
        return () => st.kill();
    }, []);

    /* Active section (shown in the menu) */
    useEffect(() => {
        const io = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-45% 0px -50% 0px' }
        );
        ['top', ...NAV.map(n => n.id)].forEach(id => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });
        return () => io.disconnect();
    }, []);

    const close = useCallback((returnFocus = true) => {
        setOpen(false);
        if (returnFocus) toggleBtn.current?.focus({ preventScroll: true });
    }, []);

    const goTop = e => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        scrollToTarget('#top');
    };

    return (
        <>
            <header ref={header} className={`nav ${open ? 'is-open' : ''}`}>
                <div className="nav-progress" aria-hidden="true"><span ref={progress} /></div>
                <div className="nav-inner">
                    <a href={HERO.logo.href} className="nav-logo" onClick={goTop} aria-label={`${HERO.logo.top} ${HERO.logo.bottom} — back to top`}>
                        <span className="nav-logo-top">{HERO.logo.top}</span>
                        <span className="nav-logo-bottom">{HERO.logo.bottom}</span>
                    </a>

                    <div className="nav-actions">
                        <ThemeToggle />
                        <Magnetic strength={0.25} className="nav-talk-wrap">
                            <a
                                href={HERO.talk.href}
                                className="nav-talk"
                                onClick={() => setOpen(false)}
                                {...(HERO.talk.external && { target: '_blank', rel: 'noopener noreferrer' })}
                                aria-label={HERO.talk.ariaLabel}
                            >
                                <WhatsAppIcon size={16} />
                                {HERO.talk.label}
                            </a>
                        </Magnetic>
                        <button
                            ref={toggleBtn}
                            type="button"
                            className={`nav-menu ${open ? 'is-x' : ''}`}
                            onClick={() => setOpen(o => !o)}
                            aria-expanded={open}
                            aria-controls="site-menu"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                        >
                            <i aria-hidden="true" />
                            <i aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </header>

            <MenuOverlay open={open} active={active} onClose={close} />
        </>
    );
};

export default Navbar;
