import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { useCertLightbox } from './CertLightboxContext.jsx';

const IC_CERTS = [
  {
    delayClass: 'd2',
    num: '01',
    tagClass: 'purple',
    tag: 'Software',
    src: 'certificates/ssm-software.jpg',
    alt: 'SSM Institute Certificate',
    title: 'Software Intern',
    org: 'SSM Institute of Engineering & Technology',
    orgDisplay: '📍 SSM Institute of Engineering & Technology',
    year: '2025',
    skills: ['Full Stack Web Development', 'MySQL Database', 'Data Cleaning', 'Report Generation', 'UI Design', 'Team Collaboration'],
  },
  {
    delayClass: 'd1',
    num: '02',
    tagClass: 'accent',
    tag: 'Web Development',
    src: 'certificates/pinnacle-labs.jpg',
    alt: 'Pinnacle Labs Certificate',
    title: 'Web Development Intern',
    org: 'Pinnacle Labs',
    orgDisplay: '📍 Pinnacle Labs',
    year: '2024',
    skills: ['Frontend Development', 'HTML', 'CSS', 'JavaScript', 'UI Design', 'Responsive Design', 'Web Deployment'],
  },
  {
    delayClass: 'd3',
    num: '03',
    tagClass: 'teal',
    tag: 'Frontend',
    src: 'certificates/seval-software.jpg',
    alt: 'Seval Software Certificate',
    title: 'Frontend Web Intern',
    org: 'Seval Software Solutions',
    orgDisplay: '📍 Seval Software Solutions',
    year: '2024',
    skills: ['Frontend Development', 'HTML', 'CSS', 'UI Design', 'Responsive Design', 'Web Deployment'],
  },
];

function IcCard({ cert }) {
  const [imgFailed, setImgFailed] = useState(false);
  const { openLightbox } = useCertLightbox();

  function handleOpen() {
    if (cert.src) openLightbox([cert.src], cert.title, cert.org);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  }

  return (
    <Reveal
      className={`ic-card glass reveal ${cert.delayClass}`}
      data-cert={cert.src}
      data-title={cert.title}
      data-org={cert.org}
      tabIndex={0}
      role="button"
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="ic-preview">
        {!imgFailed && (
          <img
            src={`/${cert.src}`}
            alt={cert.alt}
            className="ic-img"
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="ic-placeholder" style={{ display: imgFailed ? 'flex' : 'none' }}>
          <span className="ic-placeholder-icon">📜</span>
          <span>Certificate Preview</span>
        </div>
        <div className="ic-overlay">
          <span className="ic-view-btn">🔍 View Certificate</span>
        </div>
      </div>
      <div className="ic-body">
        <div className="ic-badge">
          <span className="ic-num">{cert.num}</span>
          <span className={`tag ${cert.tagClass}`}>{cert.tag}</span>
        </div>
        <div className="ic-title">{cert.title}</div>
        <div className="ic-org">{cert.orgDisplay}</div>
        <div className="ic-year">{cert.year}</div>
        <div className="ic-skills">
          {cert.skills.map((s) => (
            <span className="tag" key={s}>{s}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function InternshipCertificates() {
  return (
    <section id="intern-certs" className="section bg2">
      <div className="container">

        <Reveal className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-label">Proof of work</p>
          <h2 className="section-title">Internship <span className="grad">Certificates</span></h2>
          <p className="section-sub">Official certificates from internships completed during my academic journey. Click any
            card to view the certificate.</p>
        </Reveal>

        <div className="ic-grid">
          {IC_CERTS.map((cert) => (
            <IcCard cert={cert} key={cert.title} />
          ))}
        </div>

      </div>
    </section>
  );
}
