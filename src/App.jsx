import { useEffect, useState } from 'react';
import BackgroundLayers from './components/BackgroundLayers.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import InternshipCertificates from './components/InternshipCertificates.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ScrollTopButton from './components/ScrollTopButton.jsx';
import CertLightbox from './components/CertLightbox.jsx';
import { CertLightboxProvider } from './components/CertLightboxContext.jsx';

/* Sections with an id, in document order — used for active-link highlighting
   (mirrors main.js section 4: highlightNav) */
const SECTION_IDS = [
  'hero', 'about', 'skills', 'experience', 'intern-certs',
  'projects', 'education', 'certifications', 'contact',
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  /* ── Navbar scroll behaviour + scroll-to-top visibility + active nav link
     (mirrors main.js section 3 + 4: window scroll listener) ───────────── */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
      setShowScrollTop(window.scrollY > 400);

      let current = '';
      SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 120) {
          current = id;
        }
      });
      setActiveSection(current);
    }

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Smooth scroll for all internal anchor links
     (mirrors main.js section 9) ───────────────────────────────────────── */
  useEffect(() => {
    function onClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetEl = document.querySelector(anchor.getAttribute('href'));
      if (targetEl) {
        e.preventDefault();
        const navH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '70',
          10,
        );
        window.scrollTo({
          top: targetEl.offsetTop - navH,
          behavior: 'smooth',
        });
      }
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <CertLightboxProvider>
      <BackgroundLayers />
      <Navbar scrolled={scrolled} activeSection={activeSection} />

      <Hero />
      <About />
      <Skills />
      <Experience />
      <InternshipCertificates />
      <Projects />
      <Education />
      <Certifications />
      <Contact />

      <Footer />
      <ScrollTopButton show={showScrollTop} />
      <CertLightbox />
    </CertLightboxProvider>
  );
}
