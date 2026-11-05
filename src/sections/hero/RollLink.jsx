/**
 * Link whose label rolls up on hover / focus and is replaced by an accent copy.
 */
const RollLink = ({ href, children, className = '', external, download, ...rest }) => (
    <a
        href={href}
        className={`roll ${className}`}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...(download && { download })}
        {...rest}
    >
        <span className="roll-inner">
            <span className="roll-a">{children}</span>
            <span className="roll-b" aria-hidden="true">{children}</span>
        </span>
    </a>
);

export default RollLink;
