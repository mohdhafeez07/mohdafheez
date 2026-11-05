import { useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import TechIcon from '../components/TechIcon';
import { FOCUS, LANGUAGES, PROFILE } from '../data/content';
import { gsap, introDone, fontsReady, MOTION_OK, SplitText, useGSAP } from '../lib/motion';
import './About.css';

const STATS = [
    { count: 2, suffix: '+', label: 'Years shipping production software' },
    { count: 4, label: 'Brand websites owned end-to-end' },
    { count: 7, label: 'Live client sites delivered' },
    { text: 'OCI', label: 'Oracle Cloud Infrastructure certified' },
];

const About = () => {
    const manifesto = useRef(null);

    // Words brighten one by one as the statement scrolls through.
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            let split;
            let cancelled = false;
            Promise.all([introDone, fontsReady()]).then(() => {
                if (cancelled || !manifesto.current) return;
                split = SplitText.create(manifesto.current, { type: 'words', wordsClass: 'mf-word' });
                gsap.fromTo(
                    split.words,
                    { opacity: 0.28 },
                    {
                        opacity: 1,
                        ease: 'none',
                        stagger: 0.1,
                        scrollTrigger: { trigger: manifesto.current, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
                    }
                );
            });
            return () => {
                cancelled = true;
                split?.revert();
            };
        });
    });

    return (
        <section id="about" className="section about" tabIndex={-1}>
            <div className="container">
                <SectionHeader index={1} label="About" aside="Dubai, UAE" title={<>Engineering with <span className="serif accent">intent.</span></>} />

                <p className="manifesto" ref={manifesto}>
                    I turn business goals into fast, dependable web platforms. Today I own the websites of a
                    multi-brand real-estate group across <em className="serif">Dubai and Spain</em>, from listing
                    backends and admin panels to CRM pipelines and cloud deployment.
                </p>

                <div className="about-split">
                    <div className="focus-wrap">
                        <div className="focus-head" data-reveal="fade">
                            <p className="focus-label">Core skills</p>
                            <a href="#skills" className="link focus-all">Full toolkit ↓</a>
                        </div>
                        <ol className="focus">
                            {FOCUS.map((f, i) => (
                                <li key={f.title} className="focus-row" data-reveal="fade">
                                    <span className="focus-num">0{i + 1}</span>
                                    <h3 className="focus-title">{f.title}</h3>
                                    <div className="focus-body">
                                        <p className="focus-text">{f.text}</p>
                                        <ul className="chips focus-tags">
                                            {f.tags.map(t => (
                                                <li key={t} className="chip chip-icon"><TechIcon name={t} size={13} />{t}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="about-side" data-reveal="fade">
                        <p>
                            Specialised in Next.js, React and Node.js, with backend depth in Java Spring Boot and
                            cloud deployment on AWS and Vercel. Before Rino I built enterprise ERP modules and
                            production Spring Boot services.
                        </p>
                        <dl className="facts">
                            <div><dt>Based in</dt><dd>{PROFILE.location}</dd></div>
                            <div><dt>Education</dt><dd>B.E. Computer Science · 2024</dd></div>
                            <div><dt>Speaks</dt><dd>{LANGUAGES.join(' · ')}</dd></div>
                        </dl>
                    </div>
                </div>

                <ul className="stats">
                    {STATS.map(s => (
                        <li key={s.label} className="stat" data-reveal="fade">
                            <span className="stat-value">
                                {s.text ?? <><span data-count={s.count}>{s.count}</span>{s.suffix}</>}
                            </span>
                            <span className="stat-label">{s.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default About;
