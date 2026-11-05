/**
 * Hand-drawn signature scribble. The hero timeline draws it by animating
 * stroke-dashoffset on `.sig-path` (lengths are measured at runtime).
 */
const Signature = ({ className = '' }) => (
    <svg className={`sig ${className}`} viewBox="0 0 280 90" aria-hidden="true" focusable="false">
        <path
            className="sig-path"
            d="M12 64 C26 26 46 8 54 28 C62 48 40 72 30 58 C20 44 58 30 80 40 C96 48 88 66 102 60
               C116 54 118 26 128 30 C138 34 122 64 136 64 C150 64 154 40 166 44 C178 48 168 64 182 62
               C198 60 204 40 222 44 C238 48 246 58 268 38"
        />
        <path className="sig-path" d="M30 78 C92 70 174 68 252 60" />
    </svg>
);

export default Signature;
