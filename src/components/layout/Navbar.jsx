import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import favicon from '../../assets/Favicon.png';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
            // Active section tracking
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            for (const id of sections.reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsOpen(false);

    const scrollTo = (id) => {
        closeMenu();
        if (location.pathname !== '/') {
            window.location.href = `/#${id}`;
            return;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const navLinks = [
        { label: 'Home', id: 'home' },
        { label: 'About', id: 'about' },
        { label: 'Skills', id: 'skills' },
        { label: 'Projects', id: 'projects' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                {/* Logo */}
                <button className="logo" onClick={() => scrollTo('home')}>
                    <div className="logo-mark">
                        <img src={favicon} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
                    </div>
                    <span className="logo-text">Mohammed Afheez</span>
                </button>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    {navLinks.map(({ label, id }) => (
                        <button
                            key={id}
                            className={`nav-link ${activeSection === id ? 'active' : ''}`}
                            onClick={() => scrollTo(id)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Get In Touch CTA */}
                <a
                    href="https://wa.me/971589556227"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary desktop-only hire-btn"
                >
                    Get In Touch
                </a>

                {/* Mobile Toggle */}
                <button
                    className="menu-toggle mobile-only"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                {navLinks.map(({ label, id }) => (
                    <button
                        key={id}
                        className={`mobile-link ${activeSection === id ? 'active' : ''}`}
                        onClick={() => scrollTo(id)}
                    >
                        {label}
                    </button>
                ))}
                <a
                    href="https://wa.me/971589556227"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    onClick={closeMenu}
                >
                    Get In Touch
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
