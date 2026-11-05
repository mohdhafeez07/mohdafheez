// Central motion setup: GSAP plugins, Lenis handle, intro gate and helpers.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: 'expo.out' });

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP_MOTION = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ── Lenis handle (null when smooth scrolling is off) ── */
let lenis = null;
export const setLenis = instance => {
    lenis = instance;
};
export const getLenis = () => lenis;

/** Scroll to '#id', an element, or the top. Works with or without Lenis. */
export function scrollToTarget(target) {
    const el = target === '#top' || target === 0 ? 0 : typeof target === 'string' ? document.querySelector(target) : target;
    if (el == null) return;
    if (lenis) {
        lenis.scrollTo(el, { duration: 1.5, easing: t => 1 - Math.pow(1 - t, 4) });
        return;
    }
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    if (el === 0) window.scrollTo({ top: 0, behavior });
    else el.scrollIntoView({ behavior });
}

/* ── Intro gate: resolves when the preloader has lifted ── */
let resolveIntro;
export const introDone = new Promise(resolve => {
    resolveIntro = resolve;
});
export const finishIntro = () => resolveIntro();

/** Fonts ready, with a ceiling so a slow font never blocks the page. */
export const fontsReady = () =>
    Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise(r => setTimeout(r, 2500))]);

