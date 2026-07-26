import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';

const CATEGORIES = [
  {
    delayClass: 'd1',
    icon: '📊',
    title: 'Data & Analytics',
    items: [
      { name: 'Excel / Spreadsheets', pct: 95, teal: false },
      { name: 'Power BI', pct: 60, teal: true },
      { name: 'Data Cleaning & Reporting', pct: 85, teal: false },
      { name: 'SQL', pct: 60, teal: false },
    ],
  },
  {
    delayClass: 'd2',
    icon: '🌐',
    title: 'Web Development',
    items: [
      { name: 'HTML / CSS', pct: 90, teal: false },
      { name: 'JavaScript', pct: 50, teal: true },
      { name: 'Django (Python)', pct: 70, teal: false },
      { name: 'Python', pct: 65, teal: true },
    ],
  },
  {
    delayClass: 'd3',
    icon: '🎨',
    title: 'Design & Productivity',
    items: [
      { name: 'Figma', pct: 85, teal: false },
      { name: 'Canva', pct: 90, teal: true },
      { name: 'Photoshop', pct: 65, teal: false },
      { name: 'PowerPoint / Word', pct: 95, teal: true },
    ],
  },
];

const TECH_BADGES = [
  '🐍 Python', '📊 Power BI', '🗃 SQL', '📈 Excel', '⚛ HTML/CSS', '💛 JavaScript',
  '🌍 Django', '🎨 Figma', '🖌 Canva', '📷 Photoshop', '📝 Word', '📋 PowerPoint',
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [barsAnimated, setBarsAnimated] = useState(false);

  /* Trigger skill bars once when Skills section enters the viewport
     (mirrors main.js section 7: animateSkillBars) */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || barsAnimated) return;

    function check() {
      if (barsAnimated) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setBarsAnimated(true);
      }
    }

    check(); // in case Skills is already in view on load
    window.addEventListener('scroll', check);
    window.addEventListener('load', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('load', check);
    };
  }, [barsAnimated]);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
          <p className="section-label">What I know</p>
          <h2 className="section-title">Technical <span className="grad">Skills</span></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>A blend of data tools, web technologies, and design skills for
            end-to-end project delivery.</p>
        </Reveal>

        <div className="skills-grid">
          {CATEGORIES.map((cat) => (
            <Reveal key={cat.title} className={`glass skill-category reveal ${cat.delayClass}`}>
              <div className="skill-cat-title">
                <span className="skill-cat-icon">{cat.icon}</span> {cat.title}
              </div>
              {cat.items.map((item) => (
                <div className="skill-item" key={item.name}>
                  <div className="skill-header">
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-pct">{item.pct}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div
                      className={`skill-bar-fill${item.teal ? ' teal' : ''}`}
                      data-width={item.pct}
                      style={{ width: barsAnimated ? `${item.pct}%` : undefined }}
                    ></div>
                  </div>
                </div>
              ))}
            </Reveal>
          ))}
        </div>

        {/* Tech badges row */}
        <Reveal style={{ marginTop: '48px', textAlign: 'center' }} className="reveal">
          <p style={{ fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted)', marginBottom: '20px' }}>
            All Technologies
          </p>
          <div className="tech-badges" style={{ justifyContent: 'center' }}>
            {TECH_BADGES.map((badge) => (
              <span className="tech-badge" key={badge}>{badge}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
