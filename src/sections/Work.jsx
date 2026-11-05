import { ArrowUp, ArrowUpRight, Lock } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Magnetic from '../components/Magnetic';
import { FEATURED, PRIVATE_WORK } from '../data/content';
import rinoLogo from '../assets/logos/rino.webp';
import './Work.css';

const pad = n => String(n).padStart(2, '0');

/**
 * Case study: the deep dive behind the "Selected Projects" fan.
 * Live client sites are shown once, in the fan; this section adds what the
 * fan can't: the Rino Properties build in detail and private enterprise work.
 */
const Work = () => {
    return (
        <section id="work" className="section work" tabIndex={-1}>
            <div className="container">
                <SectionHeader
                    index={3}
                    label="Case study"
                    aside={FEATURED.period}
                    title={<>Inside the <span className="serif accent">build.</span></>}
                    lead="A closer look at the platform I lead today, from the listing backend to the CRM lead pipeline."
                />

                <div className="case-head">
                    <p className="case-kicker" data-reveal="fade">
                        <span>Featured case study</span>
                        <span>{FEATURED.category}</span>
                    </p>
                    <div className="case-brand" data-reveal="fade">
                        <img src={rinoLogo} alt="Rino Properties" width="427" height="220" loading="lazy" decoding="async" className="case-logo" />
                        <a href={FEATURED.url} target="_blank" rel="noopener noreferrer" className="case-visit">
                            rinoproperties.com <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container case-body">
                <dl className="case-meta" data-reveal="fade">
                    <div><dt>Role</dt><dd>{FEATURED.role}</dd></div>
                    <div><dt>Scope</dt><dd>{FEATURED.scope.map(s => <span key={s}>{s}</span>)}</dd></div>
                    <div>
                        <dt>Stack</dt>
                        <dd><ul className="chips">{FEATURED.tags.map(t => <li key={t} className="chip">{t}</li>)}</ul></dd>
                    </div>
                </dl>
                <div className="case-main">
                    <p className="case-summary" data-reveal="lines">{FEATURED.summary}</p>
                    <ol className="case-points">
                        {FEATURED.highlights.map((h, i) => (
                            <li key={h} data-reveal="fade"><span>{pad(i + 1)}</span>{h}</li>
                        ))}
                    </ol>
                    <Magnetic>
                        <a href={FEATURED.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <span>Visit rinoproperties.com <ArrowUpRight size={17} className="arrow-up" /></span>
                        </a>
                    </Magnetic>
                </div>
            </div>

            <div className="container">
                <article className="private" data-reveal="fade">
                    <div className="private-art" aria-hidden="true">
                        <Lock size={20} strokeWidth={1.5} />
                        {['HRMS', 'CRM', 'Payroll', 'Inventory'].map(m => <span key={m}>{m}</span>)}
                    </div>
                    <div className="private-body">
                        <p className="case-kicker"><span>Also built · private</span><span>{PRIVATE_WORK.company}</span></p>
                        <h3 className="private-title">{PRIVATE_WORK.name}</h3>
                        <p className="private-desc">{PRIVATE_WORK.desc}</p>
                        <ul className="chips" aria-label="Technologies">
                            {PRIVATE_WORK.tags.map(t => <li key={t} className="chip">{t}</li>)}
                        </ul>
                    </div>
                </article>

                <p className="work-more" data-reveal="fade">
                    Every live client site is in <a href="#projects" className="link">Selected projects <ArrowUp size={14} /></a>
                </p>
            </div>
        </section>
    );
};

export default Work;
