/* ================================================================
   main.js — Manoj Kumar V Portfolio
   ================================================================
   SETUP CHECKLIST (EmailJS):
   1. Go to https://emailjs.com and sign up (free)
   2. Add Email Service  → connect your Gmail → copy SERVICE ID
   3. Create Email Template → copy TEMPLATE ID
      Template variables to use inside EmailJS dashboard:
        {{from_name}}   — sender's name
        {{from_email}}  — sender's email
        {{subject}}     — subject line
        {{message}}     — message body
   4. Go to Account → copy PUBLIC KEY
   5. Paste all three values in the CONFIG block below
   ================================================================ */

/* ── EMAILJS CONFIG — fill these in ─────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ✏ from emailjs.com → Account
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ✏ from emailjs.com → Email Services
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ✏ from emailjs.com → Email Templates
/* ─────────────────────────────────────────────────────────────── */


/* ================================================================
   1. EmailJS — initialise on page load
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
});


/* ================================================================
   2. Send Email — called by the Send button in index.html
================================================================ */
function sendEmail() {
  /* -- grab field values -- */
  const fromName  = document.getElementById('from_name').value.trim();
  const fromEmail = document.getElementById('from_email').value.trim();
  const subject   = document.getElementById('subject').value.trim();
  const message   = document.getElementById('message').value.trim();

  /* -- UI elements -- */
  const btn     = document.getElementById('send-btn');
  const success = document.getElementById('form-success');
  const error   = document.getElementById('form-error');
  const loading = document.getElementById('form-loading');

  /* -- hide all status messages first -- */
  hideAllMessages(success, error, loading);

  /* ── Validation ─────────────────────────────────────────────── */
  if (!fromName) {
    showError(error, '❌ Please enter your name.');
    document.getElementById('from_name').focus();
    return;
  }
  if (!isValidEmail(fromEmail)) {
    showError(error, '❌ Please enter a valid email address.');
    document.getElementById('from_email').focus();
    return;
  }
  if (!message) {
    showError(error, '❌ Please enter a message.');
    document.getElementById('message').focus();
    return;
  }

  /* ── Loading state ──────────────────────────────────────────── */
  btn.disabled      = true;
  btn.textContent   = '⏳ Sending...';
  loading.style.display = 'block';

  /* ── EmailJS send ───────────────────────────────────────────── */
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
    loading.style.display  = 'none';
    success.style.display  = 'block';
    success.textContent    = '✅ Message sent! I\'ll get back to you soon.';
    btn.textContent        = '✅ Sent!';

    /* reset form after 3 s */
    setTimeout(() => {
      resetForm();
      btn.disabled    = false;
      btn.textContent = 'Send Message 🚀';
      success.style.display = 'none';
    }, 3000);
  })
  .catch((err) => {
    /* ERROR */
    console.error('EmailJS error:', err);
    loading.style.display = 'none';
    showError(error, '❌ Failed to send. Please email me directly at kumarvmanoj329@gmail.com');
    btn.disabled    = false;
    btn.textContent = 'Send Message 🚀';
  });
}

/* ── helpers ──────────────────────────────────────────────────── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hideAllMessages(success, error, loading) {
  success.style.display = 'none';
  error.style.display   = 'none';
  loading.style.display = 'none';
}

function showError(el, msg) {
  el.textContent    = msg;
  el.style.display  = 'block';
}

function resetForm() {
  document.getElementById('from_name').value  = '';
  document.getElementById('from_email').value = '';
  document.getElementById('subject').value    = '';
  document.getElementById('message').value    = '';
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