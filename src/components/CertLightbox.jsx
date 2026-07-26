import { useEffect } from 'react';
import { useCertLightbox } from './CertLightboxContext.jsx';

export default function CertLightbox() {
  const { open, images, current, title, org, closeLightbox, showImage } = useCertLightbox();

  /* Keyboard arrow navigation + Escape to close */
  useEffect(() => {
    function onKeyDown(e) {
      if (!open) return;
      if (e.key === 'ArrowLeft') {
        if (current > 0) showImage(current - 1);
      }
      if (e.key === 'ArrowRight') {
        if (current < images.length - 1) showImage(current + 1);
      }
      if (e.key === 'Escape') closeLightbox();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, current, images.length, showImage, closeLightbox]);

  /* Lock body scroll while lightbox is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const activeSrc = images[current] || '';
  const downloadName = title ? title.replace(/\s+/g, '_') + '_Certificate' : 'Certificate';

  return (
    <div
      id="cert-lightbox"
      className={`cert-lightbox${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate viewer"
    >
      <div className="cert-lightbox-backdrop" id="cert-backdrop" onClick={closeLightbox}></div>
      <div className="cert-lightbox-panel glass">
        <button className="cert-lb-close" id="cert-lb-close" aria-label="Close" onClick={closeLightbox}>
          ✕
        </button>
        <div className="cert-lb-header">
          <div className="cert-lb-title" id="cert-lb-title">
            {title || 'Certificate'}
          </div>
          <div className="cert-lb-org" id="cert-lb-org">
            {org}
          </div>
        </div>
        <div className="cert-lb-body">
          <img id="cert-lb-img" src={activeSrc} alt="Certificate" className="cert-lb-image" />
        </div>
        <div className="cert-lb-dots" id="cert-lb-dots" style={{ display: images.length > 1 ? 'flex' : 'none' }}>
          {images.length > 1 &&
            images.map((_, i) => (
              <span
                key={i}
                className={`cert-lb-dot${i === current ? ' active' : ''}`}
                onClick={() => showImage(i)}
              ></span>
            ))}
        </div>
        <div className="cert-lb-nav" id="cert-lb-nav" style={{ display: images.length > 1 ? 'flex' : 'none' }}>
          <button
            className="cert-lb-nav-btn"
            id="cert-lb-prev"
            aria-label="Previous"
            disabled={current === 0}
            onClick={() => current > 0 && showImage(current - 1)}
          >
            &#8592;
          </button>
          <span className="cert-lb-counter" id="cert-lb-counter">
            {images.length ? current + 1 : 1} / {images.length || 1}
          </span>
          <button
            className="cert-lb-nav-btn"
            id="cert-lb-next"
            aria-label="Next"
            disabled={current === images.length - 1}
            onClick={() => current < images.length - 1 && showImage(current + 1)}
          >
            &#8594;
          </button>
        </div>
        <div className="cert-lb-footer">
          <a
            id="cert-lb-download"
            href={activeSrc || '#'}
            download={downloadName}
            className="btn btn-primary"
          >
            ⬇ Download Certificate
          </a>
        </div>
      </div>
    </div>
  );
}
