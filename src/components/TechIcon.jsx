import { TECH_ICONS } from '../data/techIcons';

// Brand colours too dark to read on the dark theme keep the text colour instead.
const isTooDark = hex => {
    const n = parseInt(hex, 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
};

/**
 * Icon for a tool name (see data/techIcons.js). Renders in currentColor;
 * exposes the brand colour as --brand so a parent can reveal it on hover.
 * Returns null for unknown names, so callers can pass any label.
 */
const TechIcon = ({ name, size = 18, className = '' }) => {
    const entry = TECH_ICONS[name];
    if (!entry) return null;

    if (entry.Icon) {
        const { Icon } = entry;
        return <Icon size={size} strokeWidth={1.6} className={`tech-icon ${className}`} aria-hidden="true" />;
    }

    const style = isTooDark(entry.hex) ? undefined : { '--brand': `#${entry.hex}` };
    return (
        <svg
            className={`tech-icon ${className}`}
            style={style}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
        >
            <path d={entry.path} />
        </svg>
    );
};

export default TechIcon;
