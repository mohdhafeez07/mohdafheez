import { useEffect, useRef } from 'react';
import { finePointer, gsap, prefersReducedMotion } from '../lib/motion';
import './Cursor.css';

const INTERACTIVE = 'a, button, [role="button"], label, summary, select';

/**
 * Two-part cursor (dot + trailing ring). Grows over interactive elements and
 * shows a label over anything marked data-cursor="view" (data-cursor-label="Visit").
 * Desktop with a fine pointer only.
 */
const Cursor = () => {
    const dot = useRef(null);
    const ring = useRef(null);
    const label = useRef(null);

    useEffect(() => {
        if (!finePointer() || prefersReducedMotion()) return;
        const html = document.documentElement;
        html.classList.add('has-cursor');

        gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
        const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
        const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
        const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' });
        const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' });

        let state = '';
        const setState = next => {
            if (next === state) return;
            state = next;
            ring.current.dataset.state = next;
            dot.current.dataset.state = next;
        };

        const onMove = e => {
            html.classList.add('cursor-visible');
            dx(e.clientX);
            dy(e.clientY);
            rx(e.clientX);
            ry(e.clientY);
        };
        const onOver = e => {
            const view = e.target.closest('[data-cursor="view"]');
            if (view) {
                label.current.textContent = view.dataset.cursorLabel || 'View';
                setState('view');
            } else if (e.target.closest('input, textarea')) {
                setState('text');
            } else if (e.target.closest(INTERACTIVE)) {
                setState('hover');
            } else {
                setState('');
            }
        };
        const onDown = () => html.classList.add('cursor-down');
        const onUp = () => html.classList.remove('cursor-down');
        const onLeave = () => html.classList.remove('cursor-visible');

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerover', onOver);
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        document.documentElement.addEventListener('pointerleave', onLeave);

        return () => {
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerover', onOver);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            html.classList.remove('has-cursor', 'cursor-visible', 'cursor-down');
        };
    }, []);

    return (
        <div className="cursor" aria-hidden="true">
            <div className="cursor-ring" ref={ring}>
                <span className="cursor-label" ref={label}>View</span>
            </div>
            <div className="cursor-dot" ref={dot} />
        </div>
    );
};

export default Cursor;
