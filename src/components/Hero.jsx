export default function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <div className="hero-inner">
          {/* Left content */}
          <div>
            <div className="hero-badge">
              <span className="dot"></span>
              Available for opportunities
            </div>
            <h1 className="hero-name">
              Manoj<br /><span className="grad">Kumar V</span>
            </h1>
            <p className="hero-role">
              <span>Data Analyst · Full Stack Web Developer </span>
            </p>
            <p className="hero-desc">
              Detail-oriented Computer Science graduate specializing in Data Analysis and Full Stack Web Development. 
              Passionate about transforming data into meaningful insights and building modern, 
              scalable web applications with Python, Django, React.js, and SQL.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn btn-primary">View Projects →</a>
              <a href="#contact" className="btn btn-outline">Get In Touch</a>
              <a href="https://github.com/Manoj-Developer360" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub ↗</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">3+</div>
                <div className="stat-label">Internships</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">7.94</div>
                <div className="stat-label">CGPA</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">10+</div>
                <div className="stat-label">Tech Skills</div>
              </div>
            </div>
          </div>

          {/* Right visual card */}
          <div className="hero-visual hero-visual-mobile">
            <div className="hero-card-3d">
              <div className="card-face glass">
                <div className="avatar-ring">
                  <img src="/Manoj.jpg" alt="Profile Image" />
                </div>
                <div className="card-name">Manoj Kumar V</div>
                <p style={{ fontSize: '.78rem', color: 'var(--muted)', textAlign: 'center' }}>
                  B.E Computer Science &amp; Engineering<br />SSM Institute of Technology
                </p>
                <div className="card-tags">
                  <span className="tag accent">Python</span>
                  <span className="tag teal">Data Analysis</span>
                  <span className="tag purple">Django</span>
                  <span className="tag accent">HTML/CSS</span>
                  <span className="tag teal">Power BI</span>
                  <span className="tag">Figma</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '10px 16px',
                      background: 'rgba(79,139,255,.08)',
                      border: '1px solid rgba(79,139,255,.2)',
                      borderRadius: '10px',
                    }}
                  >
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: 'var(--accent)' }}>88.33%</div>
                    <div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>HSC</div>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '10px 16px',
                      background: 'rgba(0,212,200,.08)',
                      border: '1px solid rgba(0,212,200,.2)',
                      borderRadius: '10px',
                    }}
                  >
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: 'var(--teal)' }}>7.94</div>
                    <div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>CGPA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
