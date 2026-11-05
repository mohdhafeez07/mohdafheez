// Declarative scroll reveals driven by data attributes:
//   data-reveal="lines"  — text rises line by line from a mask
//   data-reveal="fade"   — element lifts and fades in (batched)
//   data-reveal="image"  — container wipes open, image settles from a zoom
//   data-parallax="0.2"  — element drifts vertically while its parent crosses the viewport
import { gsap, ScrollTrigger, SplitText } from './motion';

export function initReveals(root = document) {
    const q = sel => gsap.utils.toArray(root.querySelectorAll(sel));

    q('[data-reveal="lines"]').forEach(el => {
        SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            aria: 'auto',
            onSplit(self) {
                gsap.set(el, { visibility: 'visible' });
                return gsap.from(self.lines, {
                    yPercent: 115,
                    duration: 1.2,
                    stagger: 0.09,
                    delay: Number(el.dataset.delay) || 0,
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                });
            },
        });
    });

    const fades = q('[data-reveal="fade"]');
    gsap.set(fades, { autoAlpha: 0, y: 36 });
    ScrollTrigger.batch(fades, {
        start: 'top 92%',
        once: true,
        onEnter: batch =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, overwrite: true, clearProps: 'transform' }),
    });

    q('[data-reveal="image"]').forEach(el => {
        const img = el.querySelector('img');
        gsap.set(el, { visibility: 'visible' });
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        tl.from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
        if (img) tl.from(img, { scale: 1.35, duration: 1.9 }, 0.1);
    });

    q('[data-parallax]').forEach(el => {
        const s = Number(el.dataset.parallax) || 0.15;
        gsap.fromTo(
            el,
            { yPercent: -s * 50 },
            {
                yPercent: s * 50,
                ease: 'none',
                scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            }
        );
    });

    q('[data-count]').forEach(el => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        el.textContent = '0';
        gsap.to(obj, {
            v: end,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => (el.textContent = Math.round(obj.v)),
        });
    });
}
