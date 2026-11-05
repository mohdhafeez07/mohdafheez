/** Shared section opener: "(01) About ——" index row, display title, optional lead. */
const SectionHeader = ({ index, label, title, lead, aside }) => (
    <header className="sh">
        <div className="sh-top" data-reveal="fade">
            <span className="sh-index">({String(index).padStart(2, '0')})</span>
            <span className="sh-label">{label}</span>
            <span className="sh-rule" aria-hidden="true" />
            {aside && <span className="sh-aside">{aside}</span>}
        </div>
        <h2 className="sh-title" data-reveal="lines">{title}</h2>
        {lead && <p className="sh-lead" data-reveal="fade">{lead}</p>}
    </header>
);

export default SectionHeader;
