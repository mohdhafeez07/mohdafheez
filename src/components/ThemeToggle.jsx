import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import './ThemeToggle.css';

const STORAGE_KEY = 'theme';
const META_COLORS = { dark: '#09090b', light: '#f4f4ed' };

const systemTheme = () => (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

const readStored = () => {
    try {
        const v = localStorage.getItem(STORAGE_KEY);
        return v === 'light' || v === 'dark' ? v : null;
    } catch {
        return null;
    }
};

const apply = (theme, animate) => {
    const root = document.documentElement;
    if (animate) {
        root.classList.add('theme-transition');
        window.setTimeout(() => root.classList.remove('theme-transition'), 400);
    }
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme]);
};

const ThemeToggle = ({ className = '' }) => {
    const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || readStored() || systemTheme());

    // Follow OS changes until the visitor makes an explicit choice.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: light)');
        const onChange = () => {
            if (readStored()) return;
            const next = mq.matches ? 'light' : 'dark';
            apply(next, true);
            setTheme(next);
        };
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    const toggle = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        apply(next, true);
        setTheme(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* storage unavailable — theme still applies for this visit */
        }
    };

    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

    return (
        <button type="button" className={`theme-toggle ${className}`} onClick={toggle} aria-label={label} title={label}>
            <span className={`theme-icon ${theme === 'dark' ? 'is-on' : ''}`} aria-hidden="true"><Moon size={17} /></span>
            <span className={`theme-icon ${theme === 'light' ? 'is-on' : ''}`} aria-hidden="true"><Sun size={17} /></span>
        </button>
    );
};

export default ThemeToggle;
