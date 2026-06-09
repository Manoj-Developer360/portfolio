/* ================================================================
   main.js — Manoj Kumar V Portfolio
   ================================================================
   EMAILJS SETUP (one-time):
   1. Sign up at https://emailjs.com (free tier: 200 emails/month)
   2. Email Services  → Add Service → connect Gmail → copy SERVICE ID
   3. Email Templates → Create Template → use these variables:
        {{from_name}}   — sender's name
        {{from_email}}  — sender's email (set as Reply-To)
        {{subject}}     — subject line
        {{message}}     — message body
   4. Account → General → copy PUBLIC KEY
   5. Paste the three values below — that's it.
   ================================================================ */

/* ── EMAILJS CONFIG ─────────────────────────────────────────────
   Replace the placeholder strings with your real credentials.   */
const EMAILJS_PUBLIC_KEY  = 'FXO6Ymb9BeCzEa2Pi';   // Account → General
const EMAILJS_SERVICE_ID  = 'service_4fttvbo';   // Email Services
const EMAILJS_TEMPLATE_ID = 'template_c9kno22';  // Email Templates
/* ────────────────────────────────────────────────────────────── */


/* ================================================================
   1. EmailJS — initialise once the DOM is ready
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  initContactForm();
});


/* ================================================================
   2. Contact Form — wires up submission, validation, and status
================================================================ */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const textarea = document.getElementById('message');
  const charCount = document.getElementById('char-count');

  if (!form) return;

  /* ── Live character counter for the message textarea ──────── */
  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      charCount.textContent = `${len} / 1000`;
      charCount.classList.toggle('char-near-limit', len >= 900);
    });
  }

  /* ── Clear field-level error styling on re-type ───────────── */
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => clearFieldError(input));
  });

  /* ── Form submit ──────────────────────────────────────────── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendEmail();
  });
}


/* ================================================================
   3. sendEmail — validates, calls EmailJS, handles response
================================================================ */
function sendEmail() {
  /* -- Collect values -- */
  const fromName  = document.getElementById('from_name').value.trim();
  const fromEmail = document.getElementById('from_email').value.trim();
  const subject   = document.getElementById('subject').value.trim();
  const message   = document.getElementById('message').value.trim();

  /* -- UI refs -- */
  const btn     = document.getElementById('send-btn');
  const success = document.getElementById('form-success');
  const error   = document.getElementById('form-error');

  /* -- Reset all status messages -- */
  hideStatusMessages(success, error);

  /* ── Client-side validation ─────────────────────────────── */
  let isValid = true;

  if (!fromName) {
    setFieldError('from_name', 'err-name', 'Please enter your name.');
    isValid = false;
  }
  if (!isValidEmail(fromEmail)) {
    setFieldError('from_email', 'err-email', 'Please enter a valid email address.');
    isValid = false;
  }
  if (!message) {
    setFieldError('message', 'err-message', 'Please write a message before sending.');
    isValid = false;
  }

  if (!isValid) return;

  /* ── Loading state ──────────────────────────────────────── */
  setButtonLoading(btn, true);

  /* ── Send via EmailJS ───────────────────────────────────── */
  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name:  fromName,
      from_email: fromEmail,
      subject:    subject || '(No subject)',
      message:    message,
    }
  )
  .then(() => {
    /* SUCCESS */
    setButtonLoading(btn, false);
    btn.textContent = '✅ Sent!';

    success.textContent  = "✅ Message sent successfully! I'll get back to you soon.";
    success.style.display = 'block';

    /* Reset form and button after 4 s */
    setTimeout(() => {
      resetForm();
      btn.textContent = 'Send Message 🚀';
      success.style.display = 'none';
    }, 4000);
  })
  .catch((err) => {
    /* ERROR */
    console.error('EmailJS error:', err);
    setButtonLoading(btn, false);

    error.textContent   = '❌ Sending failed. Please email me directly at kumarvmanoj329@gmail.com';
    error.style.display = 'block';
  });
}


/* ================================================================
   Helpers
================================================================ */

/** Basic RFC-5322-lite email check */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Mark a field invalid and show its inline error */
function setFieldError(fieldId, errId, msg) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById(errId);
  if (field) field.classList.add('invalid');
  if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
  if (field) field.focus();
}

/** Remove invalid state from a single field */
function clearFieldError(inputEl) {
  inputEl.classList.remove('invalid');
  const errId = 'err-' + { from_name: 'name', from_email: 'email', message: 'message' }[inputEl.id];
  const errEl = document.getElementById(errId);
  if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; }
}

/** Hide both status banners */
function hideStatusMessages(...els) {
  els.forEach(el => { if (el) el.style.display = 'none'; });
}

/** Toggle button loading state */
function setButtonLoading(btn, isLoading) {
  btn.disabled = isLoading;
  btn.classList.toggle('loading', isLoading);
  const label   = btn.querySelector('.btn-label');
  if (label) label.textContent = isLoading ? 'Sending…' : 'Send Message 🚀';
}

/** Clear all form fields and error states */
function resetForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.reset();
  form.querySelectorAll('.form-control').forEach(f => f.classList.remove('invalid'));
  form.querySelectorAll('.field-error').forEach(e => { e.textContent = ''; e.style.display = 'none'; });
  const charCount = document.getElementById('char-count');
  if (charCount) { charCount.textContent = '0 / 1000'; charCount.classList.remove('char-near-limit'); }
}



/* ================================================================
   3. Navbar — scroll behaviour + sticky style
================================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  /* sticky glass effect */
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  /* scroll-to-top button */
  const scrollBtn = document.getElementById('scroll-top');
  scrollBtn.classList.toggle('show', window.scrollY > 400);

  /* highlight active nav link */
  highlightNav();

  /* trigger skill bars once when Skills section enters viewport */
  animateSkillBars();
});


/* ================================================================
   4. Active nav link highlight
================================================================ */
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  let   current  = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}


/* ================================================================
   5. Hamburger / mobile menu toggle
================================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/* close mobile menu when any link is tapped */
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ================================================================
   6. Scroll-reveal via IntersectionObserver
================================================================ */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        /* unobserve after animating so it only plays once */
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));


/* ================================================================
   7. Skill bars — animate width once Skills section is visible
================================================================ */
let barsAnimated = false;

function animateSkillBars() {
  if (barsAnimated) return;

  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-width') + '%';
    });
    barsAnimated = true;
  }
}

/* also check on first load in case Skills is already in view */
window.addEventListener('load', animateSkillBars);


/* ================================================================
   8. 3D mouse-tilt on project cards
================================================================ */
document.querySelectorAll('.project-card').forEach(card => {

  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    const cx    = rect.width  / 2;
    const cy    = rect.height / 2;
    const rotY  =  ((x - cx) / cx) * 9;   /* ±9° horizontal */
    const rotX  = -((y - cy) / cy) * 6;   /* ±6° vertical   */
    card.style.transform =
      `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ================================================================
   9. Smooth scroll for all internal anchor links
================================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - parseInt(getComputedStyle(document.documentElement)
              .getPropertyValue('--nav-h') || '70'),
        behavior: 'smooth'
      });
    }
  });
});


/* ================================================================
   10. Scroll-to-top button click
================================================================ */
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ================================================================
   11. CERTIFICATES LIGHTBOX — handles .cert-card + .ic-card
   ================================================================
   • .cert-card  = Achievements & Awards section
                   Collects ALL <img class="cert-card-img"> inside the card.
                   If 2+ images → prev/next navigation shown in lightbox.
   • .ic-card    = Internship Certificates section
                   Single image from data-cert attribute.
   ================================================================ */

(function initCertLightbox() {

  const lightbox  = document.getElementById('cert-lightbox');
  const backdrop  = document.getElementById('cert-backdrop');
  const closeBtn  = document.getElementById('cert-lb-close');
  const lbTitle   = document.getElementById('cert-lb-title');
  const lbOrg     = document.getElementById('cert-lb-org');
  const lbImg     = document.getElementById('cert-lb-img');
  const lbDl      = document.getElementById('cert-lb-download');
  const lbNav     = document.getElementById('cert-lb-nav');
  const lbDots    = document.getElementById('cert-lb-dots');
  const lbPrev    = document.getElementById('cert-lb-prev');
  const lbNext    = document.getElementById('cert-lb-next');
  const lbCounter = document.getElementById('cert-lb-counter');

  if (!lightbox) return;

  let images  = [];   // array of src strings for the current open cert
  let current = 0;    // index of currently shown image

  /* ── Show a specific image by index ───────────────────────── */
  function showImage(idx) {
    current = idx;
    lbImg.src   = images[idx];
    lbDl.href   = images[idx];

    // counter
    lbCounter.textContent = (idx + 1) + ' / ' + images.length;

    // buttons
    lbPrev.disabled = idx === 0;
    lbNext.disabled = idx === images.length - 1;

    // dots
    lbDots.querySelectorAll('.cert-lb-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  /* ── Open lightbox ─────────────────────────────────────────── */
  function openLightbox(srcs, title, org) {
    images  = srcs;
    current = 0;

    lbTitle.textContent = title;
    lbOrg.textContent   = org;
    lbDl.download       = title.replace(/\s+/g, '_') + '_Certificate';

    // build dots
    lbDots.innerHTML = '';
    if (images.length > 1) {
      images.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'cert-lb-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => showImage(i));
        lbDots.appendChild(dot);
      });
      lbDots.style.display = 'flex';
      lbNav.style.display  = 'flex';
    } else {
      lbDots.style.display = 'none';
      lbNav.style.display  = 'none';
    }

    showImage(0);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ── Close ─────────────────────────────────────────────────── */
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; images = []; }, 350);
  }

  /* ── Nav buttons ───────────────────────────────────────────── */
  lbPrev.addEventListener('click', () => { if (current > 0) showImage(current - 1); });
  lbNext.addEventListener('click', () => { if (current < images.length - 1) showImage(current + 1); });

  /* ── Keyboard arrow navigation ─────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  { if (current > 0) showImage(current - 1); }
    if (e.key === 'ArrowRight') { if (current < images.length - 1) showImage(current + 1); }
    if (e.key === 'Escape') closeLightbox();
  });

  /* ── .cert-card — collect ALL .cert-card-img srcs ──────────── */
  document.querySelectorAll('.cert-card').forEach(card => {
    // inject count badge if multiple images
    const imgs = Array.from(card.querySelectorAll('.cert-card-img'));
    if (imgs.length > 1) {
      const badge = document.createElement('span');
      badge.className   = 'cert-img-count';
      badge.textContent = '📷 ' + imgs.length;
      card.querySelector('.cert-card-preview').appendChild(badge);
    }

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', () => {
      const srcs  = imgs.map(img => img.src).filter(Boolean);
      const title = card.getAttribute('data-title') || 'Certificate';
      const org   = card.getAttribute('data-org')   || '';
      if (srcs.length) openLightbox(srcs, title, org);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  /* ── .ic-card — single image from data-cert ────────────────── */
  document.querySelectorAll('.ic-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', () => {
      const src   = card.getAttribute('data-cert')  || '';
      const title = card.getAttribute('data-title') || 'Certificate';
      const org   = card.getAttribute('data-org')   || '';
      if (src) openLightbox([src], title, org);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  /* ── Close triggers ────────────────────────────────────────── */
  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

})();