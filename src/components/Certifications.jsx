import Reveal from './Reveal.jsx';
import { useCertLightbox } from './CertLightboxContext.jsx';

const CERTS = [
  {
    delayClass: 'd1',
    title: 'Smart India Internal Hackathon',
    org: 'Government of India Initiative',
    icon: '🛡',
    images: [{ src: 'certificates/hackathon.jpg', alt: 'Smart India Internal Hackathon Certificate' }],
  },
  {
    delayClass: 'd2',
    title: 'Web Technology Certification',
    org: 'Silicon Software Services',
    icon: '🌐',
    images: [{ src: 'certificates/web.jpg', alt: 'Web Technology Certification Certificate' }],
  },
  // {
  //   delayClass: 'd3',
  //   title: 'National Level Symposium',
  //   org: 'Participant',
  //   icon: '🎤',
  //   images: [
  //     { src: 'certificates/symposium.jpg', alt: 'National Level Symposium Certificate' }],
  // },
  {
    delayClass: 'd1',
    title: 'National-Level Silambam',
    org: 'State & National Championships',
    icon: '🥋',
    images: [
      { src: 'certificates/silambam1.jpg', alt: 'National-Level Silambam Certificate' },
      { src: 'certificates/silambam2.jpg', alt: 'National-Level Silambam Certificate' },
      { src: 'certificates/silambam3.jpg', alt: 'National-Level Silambam Certificate' },
      { src: 'certificates/silambam4.jpg', alt: 'National-Level Silambam Certificate' },
    ],
  }
];

function CertCard({ cert }) {
  const { openLightbox } = useCertLightbox();

  function handleOpen() {
    const srcs = cert.images.map((img) => img.src).filter(Boolean);
    if (srcs.length) openLightbox(srcs, cert.title, cert.org);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  }

  return (
    <Reveal
      className={`glass cert-card reveal ${cert.delayClass}`}
      data-title={cert.title}
      data-org={cert.org}
      tabIndex={0}
      role="button"
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="cert-card-preview">
        {cert.images.map((img) => (
          <img className="cert-card-img" src={`/${img.src}`} alt={img.alt} key={img.src} />
        ))}
        <div className="cert-card-overlay">
          <span className="cert-overlay-view">🔍 View Certificate</span>
        </div>
        {cert.images.length > 1 && (
          <span className="cert-img-count">📷 {cert.images.length}</span>
        )}
      </div>
      <div className="cert-card-body">
        <div className="cert-icon">{cert.icon}</div>
        <div>
          <div className="cert-name">{cert.title}</div>
          <div className="cert-issuer">{cert.org}</div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="section bg2">
      <div className="container">

        <Reveal className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-label">Achievements &amp; Awards</p>
          <h2 className="section-title">Certifications &amp; <span className="grad">Activities</span></h2>
        </Reveal>

        <div className="cert-grid">
          {CERTS.map((cert) => (
            <CertCard cert={cert} key={cert.title} />
          ))}
        </div>

      </div>
    </section>
  );
}
