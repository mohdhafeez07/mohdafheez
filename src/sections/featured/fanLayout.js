// Geometry for the fanned "hand of cards". All lengths are in rem.

/** Resting slots, left → right. Index 3 is the centre card. */
export const SLOTS = [
    { x: -30, y: 7.3, r: -21, s: 0.776, z: 1 },
    { x: -22, y: 4, r: -14, s: 0.85, z: 2 },
    { x: -11, y: 1.3, r: -7, s: 0.935, z: 3 },
    { x: 0, y: 0, r: 0, s: 1, z: 10 },
    { x: 11, y: 1.3, r: 7, s: 0.935, z: 3 },
    { x: 22, y: 4, r: 14, s: 0.85, z: 2 },
    { x: 30, y: 7.3, r: 21, s: 0.776, z: 1 },
];

/** How the hand reacts when one card is hovered / focused. */
export const HOVER = {
    lift: 0.35, // active card keeps 35% of its resting y offset (it rises)
    scale: 0.07, // + scale on the active card
    upright: 1, // degrees rotated back toward vertical
    leftShift: -4, // cards to the left slide further left…
    leftTilt: -0.7, // …and tilt a little more
    rightShift: 1.5, // cards to the right nudge right…
    rightTilt: 1, // …and tilt a little more
    z: 20,
};

/**
 * Breakpoint config.
 *  xMul    — multiplier for horizontal offsets (and hover shifts)
 *  yMul    — vertical offsets scale with the card size so the arc keeps its shape
 *  range   — [first, last] slot indices that are rendered
 *  touch   — use tap-to-focus instead of hover
 */
export function layoutFor(width) {
    if (width <= 640) return { xMul: 0.4, yMul: 0.62, range: [1, 5] };
    if (width <= 1024) return { xMul: 0.65, yMul: 0.85, range: [0, 6] };
    return { xMul: 1, yMul: 1, range: [0, 6] };
}

/** Pose for card `i` given the currently active card (or null). */
export function cardPose(i, active, { xMul, yMul }, still = false) {
    const slot = SLOTS[i];
    const rest = { x: slot.x * xMul, y: slot.y * yMul, r: slot.r, s: slot.s, z: slot.z };
    if (active == null) return rest;
    if (still) return i === active ? { ...rest, z: HOVER.z } : rest; // reduced motion: no movement

    if (i === active) {
        return {
            x: rest.x,
            y: rest.y * HOVER.lift,
            r: rest.r - Math.sign(rest.r) * HOVER.upright,
            s: rest.s + HOVER.scale,
            z: HOVER.z,
        };
    }
    if (i < active) return { ...rest, x: rest.x + HOVER.leftShift * xMul, r: rest.r + HOVER.leftTilt };
    return { ...rest, x: rest.x + HOVER.rightShift * xMul, r: rest.r + HOVER.rightTilt };
}
