import { ArrowUp } from 'lucide-react';
import { NAV, PROFILE } from '../../data/content';
import useDubaiTime from '../../lib/useDubaiTime';
import Magnetic from '../Magnetic';
import './Footer.css';

const Footer = () => {
    const time = useDubaiTime();
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-col">
                        <p className="footer-label">Navigate</p>
                        <nav className="footer-nav" aria-label="Footer">
                            {NAV.map(n => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
                        </nav>
                    </div>
                    <div className="footer-col">
                        <p className="footer-label">Local time</p>
                        <p className="footer-time">{time} <span>Dubai, GST</span></p>
                    </div>
                    <Magnetic className="footer-top-btn-wrap">
                        <a href="#top" className="footer-top-btn" aria-label="Back to top">
                            <ArrowUp size={20} />
                        </a>
                    </Magnetic>
                </div>

                <p className="footer-big" aria-hidden="true">
                    Mohammed <span className="serif">Afheez</span>
                </p>

                <div className="footer-row">
                    <p>© {new Date().getFullYear()} {PROFILE.name}</p>
                    <p>Designed &amp; built in Dubai</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
