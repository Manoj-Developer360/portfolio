import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Reveal from './Reveal.jsx';

/* ── EMAILJS CONFIG ─────────────────────────────────────────────
   Replace the placeholder strings with your real credentials.   */
const EMAILJS_PUBLIC_KEY = 'FXO6Ymb9BeCzEa2Pi'; // Account → General
const EMAILJS_SERVICE_ID = 'service_4fttvbo'; // Email Services
const EMAILJS_TEMPLATE_ID = 'template_c9kno22'; // Email Templates
/* ────────────────────────────────────────────────────────────── */

/** Basic RFC-5322-lite email check */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const INITIAL_FIELDS = { from_name: '', from_email: '', subject: '', message: '' };
const INITIAL_ERRORS = { from_name: '', from_email: '', message: '' };

export default function Contact() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [sending, setSending] = useState(false);
  const [sentLabel, setSentLabel] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const charLen = fields.message.length;

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    /* Clear field-level error styling on re-type */
    if (name in errors) {
      setErrors((er) => ({ ...er, [name]: '' }));
    }
  }

  function resetForm() {
    setFields(INITIAL_FIELDS);
    setErrors(INITIAL_ERRORS);
  }

  function handleSubmit(e) {
    e.preventDefault();

    /* Reset all status messages */
    setShowSuccess(false);
    setShowError(false);

    /* Client-side validation */
    const fromName = fields.from_name.trim();
    const fromEmail = fields.from_email.trim();
    const message = fields.message.trim();

    const newErrors = { from_name: '', from_email: '', message: '' };
    let isValid = true;
    let firstInvalidField = null;

    if (!fromName) {
      newErrors.from_name = 'Please enter your name.';
      isValid = false;
      firstInvalidField = firstInvalidField || 'from_name';
    }
    if (!isValidEmail(fromEmail)) {
      newErrors.from_email = 'Please enter a valid email address.';
      isValid = false;
      firstInvalidField = firstInvalidField || 'from_email';
    }
    if (!message) {
      newErrors.message = 'Please write a message before sending.';
      isValid = false;
      firstInvalidField = firstInvalidField || 'message';
    }

    setErrors(newErrors);

    if (!isValid) {
      if (firstInvalidField) {
        const el = document.getElementById(firstInvalidField);
        if (el) el.focus();
      }
      return;
    }

    /* Loading state */
    setSending(true);

    /* Send via EmailJS */
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: fromName,
          from_email: fromEmail,
          subject: fields.subject.trim() || '(No subject)',
          message: message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      .then(() => {
        /* SUCCESS */
        setSending(false);
        setSentLabel(true);
        setShowSuccess(true);

        /* Reset form and button after 4 s */
        setTimeout(() => {
          resetForm();
          setSentLabel(false);
          setShowSuccess(false);
        }, 4000);
      })
      .catch((err) => {
        /* ERROR */
        console.error('EmailJS error:', err);
        setSending(false);
        setErrorMsg('❌ Sending failed. Please email me directly at kumarvmanoj329@gmail.com');
        setShowError(true);
      });
  }

  return (
    <section id="contact" className="section">
      <div className="container">

        <Reveal className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-label">Get in touch</p>
          <h2 className="section-title">Let's <span className="grad">Connect</span></h2>
        </Reveal>

        <div className="contact-wrapper">

          {/* Left: info */}
          <Reveal className="reveal-left">
            <div className="contact-info-title">Open to Opportunities 🚀</div>
            <p className="contact-info-sub">
              Whether you have a job offer, a freelance project, or just want to say hello —
              my inbox is always open!
            </p>

            <a href="mailto:kumarvmanoj329@gmail.com" className="contact-link">
              <span className="contact-link-icon">📧</span>
              kumarvmanoj329@gmail.com
            </a>
            <a href="tel:+919500885468" className="contact-link">
              <span className="contact-link-icon">📱</span>
              +91 9500885468
            </a>
            <div className="contact-link no-hover">
              <span className="contact-link-icon">📍</span>
              Dindigul, Tamilnadu, India
            </div>

            <div className="social-row">
              <a href="https://www.linkedin.com/in/manojkumarv18/" target="_blank" rel="noreferrer" className="social-btn"
                title="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>

              <a href="https://github.com/Manoj-Developer360" target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>

              <a href="mailto:kumarvmanoj329@gmail.com" className="social-btn" title="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </Reveal>

          {/* Right: EmailJS form */}
          <Reveal className="glass contact-form reveal-right">
            <div className="form-heading">Send a Message</div>

            <form id="contact-form" noValidate onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from_name">Your Name <span className="required-star">*</span></label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    className={`form-control${errors.from_name ? ' invalid' : ''}`}
                    placeholder="Manoj Kumar"
                    autoComplete="name"
                    required
                    value={fields.from_name}
                    onChange={handleChange}
                  />
                  <span className="field-error" id="err-name" style={{ display: errors.from_name ? 'block' : 'none' }}>
                    {errors.from_name}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="from_email">Email Address <span className="required-star">*</span></label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    className={`form-control${errors.from_email ? ' invalid' : ''}`}
                    placeholder="manoj@example.com"
                    autoComplete="email"
                    required
                    value={fields.from_email}
                    onChange={handleChange}
                  />
                  <span className="field-error" id="err-email" style={{ display: errors.from_email ? 'block' : 'none' }}>
                    {errors.from_email}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="Job opportunity / Freelance work..."
                  maxLength={100}
                  value={fields.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message <span className="required-star">*</span>
                  <span className={`char-count${charLen >= 900 ? ' char-near-limit' : ''}`} id="char-count">
                    {charLen} / 1000
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`form-control${errors.message ? ' invalid' : ''}`}
                  placeholder="Write your message here..."
                  maxLength={1000}
                  required
                  value={fields.message}
                  onChange={handleChange}
                ></textarea>
                <span className="field-error" id="err-message" style={{ display: errors.message ? 'block' : 'none' }}>
                  {errors.message}
                </span>
              </div>

              <button
                id="send-btn"
                type="submit"
                className={`btn btn-primary full-w send-btn${sending ? ' loading' : ''}`}
                disabled={sending}
              >
                <span className="btn-label">
                  {sending ? 'Sending…' : sentLabel ? '✅ Sent!' : 'Send Message 🚀'}
                </span>
                <span className="btn-spinner" aria-hidden="true"></span>
              </button>
            </form>

            {/* Status messages */}
            <p id="form-success" className="form-msg success" role="status" aria-live="polite" style={{ display: showSuccess ? 'block' : 'none' }}>
              ✅ Message sent successfully! I'll get back to you soon.
            </p>
            <p id="form-error" className="form-msg error" role="alert" aria-live="assertive" style={{ display: showError ? 'block' : 'none' }}>
              {errorMsg || "❌ Oops! Something went wrong. Please try again or email me directly."}
            </p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
