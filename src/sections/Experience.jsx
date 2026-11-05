import { useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from '../data/content';
import { gsap, ScrollTrigger, useGSAP } from '../lib/motion';
import './Experience.css';

const Experience = () => {
    const [active, setActive] = useState(0);
    const list = useRef(null);
    const job = EXPERIENCE[active];

    // Track which role is in the middle of the viewport.
    useGSAP(
        () => {
            const items = gsap.utils.toArray('.xp-item');
            items.forEach((el, i) =>
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 55%',
                    end: 'bottom 55%',
                    onToggle: self => self.isActive && setActive(i),
                })
            );
        },
        { scope: list }
    );

    return (
        <section id="experience" className="section xp" tabIndex={-1}>
            <div className="container">
                <SectionHeader
                    index={2}
                    label="Experience"
                    aside={`${EXPERIENCE.length} roles`}
                    title={<>A record of <span className="serif accent">shipping.</span></>}
                />

                <div className="xp-grid">
                    <aside className="xp-aside" aria-hidden="true">
                        <div className="xp-aside-inner">
                            <div className="xp-counter">
                                <span key={active} className="xp-counter-num">{String(active + 1).padStart(2, '0')}</span>
                                <span className="xp-counter-total">/{String(EXPERIENCE.length).padStart(2, '0')}</span>
                            </div>
                            <div key={`c${active}`} className="xp-aside-meta">
                                <p className="xp-aside-company">{job.company}</p>
                                <p className="xp-aside-period">{job.period} · {job.location}</p>
                            </div>
                            <ol className="xp-dots">
                                {EXPERIENCE.map((j, i) => <li key={j.company} className={i === active ? 'is-active' : ''} />)}
                            </ol>
                        </div>
                    </aside>

                    <ol className="xp-list" ref={list}>
                        {EXPERIENCE.map((j, i) => (
                            <li key={j.company} className={`xp-item ${i === active ? 'is-active' : ''}`}>
                                <div className="xp-head" data-reveal="fade">
                                    <p className="xp-period">
                                        {j.period} · {j.location}
                                        {j.current && <span className="xp-badge">Current</span>}
                                    </p>
                                    <h3 className="xp-role">{j.role}</h3>
                                    <p className="xp-company">
                                        {j.company}
                                        {j.context && <span> · {j.context}</span>}
                                    </p>
                                </div>
                                <ul className="xp-points">
                                    {j.points.map(p => <li key={p} data-reveal="fade">{p}</li>)}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="creds">
                    <div className="cred" data-reveal="fade">
                        <p className="cred-label">Education</p>
                        <h3 className="cred-title">{EDUCATION.degree}</h3>
                        <p className="cred-sub">{EDUCATION.school} · {EDUCATION.period} · {EDUCATION.location}</p>
                    </div>
                    <div className="cred" data-reveal="fade">
                        <p className="cred-label">Certifications</p>
                        <ul className="cred-list">
                            {CERTIFICATIONS.map((c, i) => (
                                <li key={c}><span>{String(i + 1).padStart(2, '0')}</span>{c}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
