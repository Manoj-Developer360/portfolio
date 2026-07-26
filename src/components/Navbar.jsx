import { useState } from 'react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const MOBILE_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ scrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo" aria-label="Manoj Kumar V - Home">
              MK
            </a>

            <ul className="nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={activeSection === link.href.slice(1) ? 'active' : ''}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav-cta">
              <a
                href="https://drive.google.com/file/d/1mIGDtYbhPn0zhT2UwwmOZ4gSu9s79hMR/view?usp=sharing"
                className="btn btn-primary"
              >
                ⬇ Resume
              </a>
              <button
                className={`hamburger${menuOpen ? ' open' : ''}`}
                id="hamburger"
                aria-label="Toggle menu"
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobile-menu">
        {MOBILE_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="mobile-nav-link" onClick={closeMenu}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
