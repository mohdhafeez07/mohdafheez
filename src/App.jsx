import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/Cursor';
import Hero from './sections/hero/Hero';
import FeaturedFan from './sections/featured/FeaturedFan';
import About from './sections/About';
import Experience from './sections/Experience';
import Work from './sections/Work';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import {
    finePointer,
    fontsReady,
    gsap,
    introDone,
    MOTION_OK,
    prefersReducedMotion,
    scrollToTarget,
    ScrollTrigger,
    setLenis,
} from './lib/motion';
import { initReveals } from './lib/reveals';

function App() {
    const main = useRef(null);

    // Smooth scrolling (desktop pointers only — touch keeps native momentum).
    useEffect(() => {
        if (prefersReducedMotion() || !finePointer()) return;
        const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
        setLenis(lenis);
        lenis.on('scroll', ScrollTrigger.update);
        const tick = t => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            setLenis(null);
        };
    }, []);

    // In-page anchors scroll smoothly and move focus for keyboard users.
    useEffect(() => {
        const onClick = e => {
            const a = e.target.closest('a[href^="#"]');
            if (!a || e.defaultPrevented) return;
            const href = a.getAttribute('href');
            if (href.length < 2) return;
            e.preventDefault();
            scrollToTarget(href);
            const target = document.querySelector(href);
            if (target && target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    // Scroll reveals start once the intro has lifted and fonts have settled.
    useEffect(() => {
        let mm;
        let cancelled = false;
        Promise.all([introDone, fontsReady()]).then(() => {
            if (cancelled) return;
            mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => initReveals(main.current));
            ScrollTrigger.refresh();
        });
        return () => {
            cancelled = true;
            mm?.revert();
        };
    }, []);

    // Support old /contact links and deep links like /#work.
    useEffect(() => {
        if (window.location.pathname === '/contact') window.history.replaceState(null, '', '/#contact');
        const id = window.location.hash;
        if (id.length > 1) introDone.then(() => setTimeout(() => scrollToTarget(id), 400));
    }, []);

    return (
        <>
            <a href="#main" className="skip-link">Skip to content</a>
            <Cursor />
            <Navbar />
            <main id="main" ref={main} tabIndex={-1}>
                <Hero />
                <FeaturedFan />
                <About />
                <Experience />
                <Work />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default App;
