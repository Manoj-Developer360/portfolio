import Reveal from './Reveal.jsx';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">

        <Reveal className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-label">My background</p>
          <h2 className="section-title">Education &amp; <span className="grad">Academics</span></h2>
        </Reveal>

        <div className="edu-grid">
          <Reveal className="glass edu-card reveal d1">
            <div className="edu-level">🎓 Undergraduate Degree</div>
            <div className="edu-degree">B.E Computer Science &amp; Engineering</div>
            <div className="edu-school">SSM Institute of Engineering and Technology<br />2021 – 2025</div>
            <span className="edu-score">CGPA: 7.94</span>
          </Reveal>
          <Reveal className="glass edu-card reveal d2">
            <div className="edu-level">📚 Higher Secondary</div>
            <div className="edu-degree">HSC – Class XII</div>
            <div className="edu-school">MSP Solainadar Memorial Hr Sec School</div>
            <span className="edu-score">HSC: 88.33%</span>
          </Reveal>
          <Reveal className="glass edu-card reveal d3">
            <div className="edu-level">🏫 Secondary School</div>
            <div className="edu-degree">SSLC – Class X</div>
            <div className="edu-school">MSP Solainadar Memorial Hr Sec School</div>
            <span className="edu-score">SSLC: 86.6%</span>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
