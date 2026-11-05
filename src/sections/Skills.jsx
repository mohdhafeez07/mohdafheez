import { useState } from 'react';
import { Braces, Cloud, Database, Monitor, Server, Wrench } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { SKILLS } from '../data/content';
import { finePointer } from '../lib/motion';
import './Skills.css';

const ICONS = { monitor: Monitor, server: Server, braces: Braces, database: Database, cloud: Cloud, wrench: Wrench };
const pad = n => String(n).padStart(2, '0');
const TOTAL = SKILLS.reduce((n, g) => n + g.items.length, 0);

/**
 * Skill index: pick a category (hover on desktop, tap anywhere) and its tools
 * cascade into the panel. Works as an accordion on small screens.
 */
const Skills = () => {
    const [active, setActive] = useState(0);

    return (
        <section id="skills" className="section skills" tabIndex={-1}>
            <div className="container">
                <SectionHeader
                    index={4}
                    label="Skills"
                    aside={`${TOTAL} technologies`}
                    title={<>Tools of the <span className="serif accent">trade.</span></>}
                    lead="What I use in production — from the interface down to the database and the cloud it runs on."
                />

                <ul className="sk">
                    {SKILLS.map((g, i) => {
                        const Icon = ICONS[g.icon];
                        const isOpen = i === active;
                        return (
                            <li key={g.title} className={`sk-row ${isOpen ? 'is-open' : ''}`}>
                                <button
                                    type="button"
                                    className="sk-trigger"
                                    data-reveal="fade"
                                    aria-expanded={isOpen}
                                    aria-controls={`sk-panel-${i}`}
                                    onClick={() => setActive(i)}
                                    onMouseEnter={() => finePointer() && setActive(i)}
                                >
                                    <span className="sk-num">{pad(i + 1)}</span>
                                    <span className="sk-name">{g.title}</span>
                                    <span className="sk-count">{pad(g.items.length)}</span>
                                </button>

                                <div id={`sk-panel-${i}`} className="sk-panel" role="region" aria-label={g.title} hidden={!isOpen}>
                                    <div className="sk-panel-head">
                                        <span className="sk-icon"><Icon size={22} strokeWidth={1.5} /></span>
                                        <span className="sk-panel-title">{g.title}</span>
                                    </div>
                                    <ul className="sk-items">
                                        {g.items.map((item, k) => (
                                            <li key={item} style={{ '--k': k }}>
                                                <span className="sk-item-num">{pad(k + 1)}</span>
                                                <span className="sk-item-name">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="sk-meter" aria-hidden="true">
                                        <span style={{ '--share': g.items.length / TOTAL }} />
                                    </div>
                                    <p className="sk-meter-label">
                                        {g.items.length} of {TOTAL} technologies in my toolkit
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Skills;
