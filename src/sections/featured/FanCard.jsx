import { ArrowRight } from 'lucide-react';

/**
 * One card in the fan. The <li> carries the pose (CSS variables → transform);
 * the <a> fills it and handles pointer, focus and tap behaviour.
 */
const FanCard = ({ project, index, pose, active, hidden, onActivate, onLeave, onTap }) => {
    const { title, desc, tags, image, video, url } = project;

    return (
        <li
            className={`fan-card ${active ? 'is-active' : ''}`}
            hidden={hidden}
            style={{
                '--x': `${pose.x}rem`,
                '--y': `${pose.y}rem`,
                '--r': `${pose.r}deg`,
                '--s': pose.s,
                zIndex: pose.z,
            }}
        >
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="fan-link"
                aria-label={`${title}. ${desc} Built with ${tags.join(', ')}. Opens the live site in a new tab.`}
                data-cursor="view"
                data-cursor-label="View"
                onPointerEnter={e => e.pointerType === 'mouse' && onActivate(index)}
                onPointerLeave={e => e.pointerType === 'mouse' && onLeave(e)}
                onFocus={e => e.currentTarget.matches(':focus-visible') && onActivate(index)}
                onBlur={onLeave}
                onClick={e => onTap(e, index)}
            >
                <div className="fan-media">
                    <img src={image} alt="" loading="lazy" decoding="async" width="576" height="1008" />
                    {video && (
                        <video src={video} poster={image} autoPlay muted loop playsInline preload="none" aria-hidden="true" />
                    )}
                </div>

                <div className="fan-overlay" aria-hidden="true">
                    <h3 className="fan-card-title">{title}</h3>
                    <p className="fan-card-desc">{desc}</p>
                    <ul className="fan-tags">
                        {tags.map(t => <li key={t}>{t}</li>)}
                    </ul>
                    <span className="fan-cta">
                        View project <ArrowRight size={15} />
                    </span>
                </div>
            </a>
        </li>
    );
};

export default FanCard;
