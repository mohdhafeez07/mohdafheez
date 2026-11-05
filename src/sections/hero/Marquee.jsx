/**
 * Infinite marquee of tech names and client logos. Pure CSS animation
 * (transform only), pauses on hover, static under reduced motion.
 * The list is rendered twice so the -50% loop is seamless.
 */
const Item = ({ item }) =>
    item.logo ? (
        <span className="mq-item mq-logo">
            <img src={item.logo} alt={item.alt} style={{ '--h': item.h ?? 1.4 }} loading="lazy" decoding="async" />
        </span>
    ) : (
        <span className="mq-item mq-text">{item.label}</span>
    );

const Marquee = ({ items, label = 'Technologies and clients' }) => (
    <div className="mq" role="region" aria-label={label}>
        <div className="mq-track">
            <div className="mq-row">
                {items.map((it, i) => <Item key={i} item={it} />)}
            </div>
            <div className="mq-row" aria-hidden="true">
                {items.map((it, i) => <Item key={i} item={{ ...it, alt: '' }} />)}
            </div>
        </div>
    </div>
);

export default Marquee;
