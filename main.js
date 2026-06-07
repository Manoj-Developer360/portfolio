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
   11. INTERNSHIP CERTIFICATES — Lightbox
   ================================================================
   How it works:
   • Each .ic-card holds data attributes:
       data-cert   = relative path to the certificate image
       data-title  = job title shown in lightbox header
       data-org    = organisation name shown in lightbox header
   • Clicking a card opens the lightbox and populates it.
   • Clicking the backdrop or ✕ closes it.
   • ESC key also closes it.
   ================================================================ */

(function initCertLightbox() {

  const lightbox  = document.getElementById('cert-lightbox');
  const backdrop  = document.getElementById('cert-backdrop');
  const closeBtn  = document.getElementById('cert-lb-close');
  const lbTitle   = document.getElementById('cert-lb-title');
  const lbOrg     = document.getElementById('cert-lb-org');
  const lbImg     = document.getElementById('cert-lb-img');
  const lbDl      = document.getElementById('cert-lb-download');

  if (!lightbox) return; // section not present — skip

  /* ── Open ──────────────────────────────────────────────────── */
  function openLightbox(certSrc, title, org) {
    lbTitle.textContent = title;
    lbOrg.textContent   = org;
    lbImg.src           = certSrc;
    lbImg.alt           = title + ' — ' + org;

    /* Point the download link at the same image
       (swap for a PDF path if you have one) */
    lbDl.href           = certSrc;
    lbDl.download       = title.replace(/\s+/g, '_') + '_Certificate';

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  /* ── Close ─────────────────────────────────────────────────── */
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    /* Small delay so the fade-out plays before clearing src */
    setTimeout(() => { lbImg.src = ''; }, 350);
  }

  /* ── Attach click to every certificate card ─────────────────── */
  document.querySelectorAll('.ic-card').forEach(card => {
    card.addEventListener('click', () => {
      const certSrc = card.getAttribute('data-cert')  || '';
      const title   = card.getAttribute('data-title') || 'Certificate';
      const org     = card.getAttribute('data-org')   || '';
      openLightbox(certSrc, title, org);
    });

    /* Keyboard accessibility — Enter / Space also opens */
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ── Close triggers ─────────────────────────────────────────── */
  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

})();