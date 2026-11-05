import { memo } from 'react';

/* Deterministic pseudo-random so the map is identical on every render. */
const rand = seed => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
};

/** Closed, smooth path through points (Catmull-Rom → cubic Bézier). */
function smoothClosed(points) {
    const n = points.length;
    let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
    for (let i = 0; i < n; i++) {
        const p0 = points[(i - 1 + n) % n];
        const p1 = points[i];
        const p2 = points[(i + 1) % n];
        const p3 = points[(i + 2) % n];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return `${d}Z`;
}

/** Concentric, wobbly rings around a few "peaks" — reads as a topographic map. */
function buildContours() {
    const r = rand(7);
    const peaks = [
        { cx: 360, cy: 300, rings: 13, step: 34 },
        { cx: 1260, cy: 720, rings: 15, step: 36 },
        { cx: 1180, cy: 140, rings: 7, step: 30 },
    ];
    const paths = [];
    peaks.forEach(({ cx, cy, rings, step }) => {
        const ph = [r() * 6.28, r() * 6.28, r() * 6.28];
        for (let k = 1; k <= rings; k++) {
            const base = k * step;
            const pts = [];
            for (let i = 0; i < 64; i++) {
                const t = (i / 64) * Math.PI * 2;
                const wobble =
                    Math.sin(t * 2 + ph[0] + k * 0.18) * base * 0.12 +
                    Math.sin(t * 3 + ph[1] - k * 0.11) * base * 0.07 +
                    Math.sin(t * 5 + ph[2]) * 6;
                const rad = base + wobble;
                pts.push([cx + Math.cos(t) * rad * 1.25, cy + Math.sin(t) * rad]);
            }
            paths.push(smoothClosed(pts));
        }
    });
    return paths;
}

// Deterministic, so build once at module load.
const PATHS = buildContours();

/** Topographic contour lines behind the hero (decorative). */
const ContourBackground = memo(() => {
    const paths = PATHS;
    return (
        <div className="contours" aria-hidden="true">
            <div className="contours-parallax">
                <svg className="contours-svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
                    <g className="contours-drift" fill="none" stroke="currentColor" strokeWidth="1.1">
                        {paths.map((d, i) => <path key={i} d={d} vectorEffect="non-scaling-stroke" />)}
                    </g>
                </svg>
            </div>
        </div>
    );
});

export default ContourBackground;
