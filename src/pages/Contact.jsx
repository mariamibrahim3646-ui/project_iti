import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

export default function Contact() {
  const { theme: t } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', topic: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', topic: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="py-5" style={{ backgroundColor: t.bg, color: t.text, transition: 'all 0.3s ease' }}>
      {/* استايل مخصص للفوكس والبليس هولدر */}
      <style>{`
        .custom-contact-input:focus {
          box-shadow: none !important;
          border-color: ${t.accent} !important;
          outline: none !important;
        }
        .custom-contact-input::placeholder {
          color: ${t.textMuted} !important;
          opacity: 0.7;
        }
      `}</style>

      <div className="container py-4">
        <div className="row g-5">
          {/* Details */}
          <div className="col-lg-5">
            <span 
              className="badge rounded-pill px-3 py-2 text-uppercase mb-3"
              style={{ backgroundColor: `${t.accent}15`, color: t.accent, letterSpacing: '2px', fontSize: '11px' }}
            >
              Get In Touch
            </span>
            <h1 className="display-4 mb-3" style={{ fontFamily: 'Georgia, serif', color: t.text }}>
              We'd love <br />
              <span style={{ fontStyle: 'italic' }}>to hear from you.</span>
            </h1>
            <p className="mb-4" style={{ color: t.textMuted, fontSize: '15px', lineHeight: '1.8' }}>
              Whether it's a question about an ingredient, an order, or feedback — we read every message and reply within one business day.
            </p>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-center gap-3 p-3 rounded-4" style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}>
                <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ width: '42px', height: '42px', backgroundColor: `${t.accent}20`, color: t.accent }}>
                  ✉️
                </div>
                <div>
                  <div className="text-uppercase fw-bold" style={{ color: t.accent, fontSize: '10px', letterSpacing: '1.5px' }}>EMAIL</div>
                  <div style={{ color: t.text, fontSize: '15px' }}>hello@serene.co</div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 p-3 rounded-4" style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}>
                <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ width: '42px', height: '42px', backgroundColor: `${t.accent}20`, color: t.accent }}>
                  🕒
                </div>
                <div>
                  <div className="text-uppercase fw-bold" style={{ color: t.accent, fontSize: '10px', letterSpacing: '1.5px' }}>HOURS</div>
                  <div style={{ color: t.text, fontSize: '15px' }}>Mon – Fri, 9am – 6pm CET</div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 p-3 rounded-4" style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}>
                <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ width: '42px', height: '42px', backgroundColor: `${t.accent}20`, color: t.accent }}>
                  📍
                </div>
                <div>
                  <div className="text-uppercase fw-bold" style={{ color: t.accent, fontSize: '10px', letterSpacing: '1.5px' }}>LOCATION</div>
                  <div style={{ color: t.text, fontSize: '15px' }}>Lisbon, Portugal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <div
              className="p-4 p-md-5 rounded-5 shadow-sm position-relative overflow-hidden"
              style={{ backgroundColor: t.bgAlt }}
            >
              {/* Accent Line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: t.accent }}></div>

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-uppercase fw-semibold" style={{ color: t.accent, fontSize: '11px', letterSpacing: '1.5px' }}>
                        NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="form-control custom-contact-input rounded-3 py-3 px-3"
                        style={{ backgroundColor: t.inputBg, color: t.text, border: `1px solid ${t.border}`, fontSize: '14px' }}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-uppercase fw-semibold" style={{ color: t.accent, fontSize: '11px', letterSpacing: '1.5px' }}>
                        EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        className="form-control custom-contact-input rounded-3 py-3 px-3"
                        style={{ backgroundColor: t.inputBg, color: t.text, border: `1px solid ${t.border}`, fontSize: '14px' }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="form-label text-uppercase fw-semibold" style={{ color: t.accent, fontSize: '11px', letterSpacing: '1.5px' }}>
                      TOPIC
                    </label>
                    <select
                      required
                      className="form-select custom-contact-input rounded-3 py-3 px-3"
                      style={{ backgroundColor: t.inputBg, color: t.text, border: `1px solid ${t.border}`, fontSize: '14px' }}
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    >
                      <option value="" disabled style={{ backgroundColor: t.bg, color: t.text }}>Select a topic...</option>
                      <option value="General Question" style={{ backgroundColor: t.bg, color: t.text }}>General Question</option>
                      <option value="Order" style={{ backgroundColor: t.bg, color: t.text }}>Order Status</option>
                      <option value="Product Information" style={{ backgroundColor: t.bg, color: t.text }}>Product Information</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <label className="form-label text-uppercase fw-semibold" style={{ color: t.accent, fontSize: '11px', letterSpacing: '1.5px' }}>
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what's on your mind..."
                      className="form-control custom-contact-input rounded-3 p-3"
                      style={{ backgroundColor: t.inputBg, color: t.text, border: `1px solid ${t.border}`, resize: 'vertical', fontSize: '14px' }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 text-white rounded-pill py-3 text-uppercase mt-4 fw-semibold shadow-sm"
                    style={{ backgroundColor: t.accent, border: 'none', letterSpacing: '2px', fontSize: '13px' }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
              ) : (
                <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white mb-3 fs-2 shadow-sm"
                    style={{ width: '70px', height: '70px', backgroundColor: t.accent }}
                  >
                    ✓
                  </div>
                  <h3 className="mb-2" style={{ fontFamily: 'Georgia, serif', color: t.text }}>Message Sent!</h3>
                  <p className="mb-4" style={{ color: t.textMuted, maxWidth: '360px', fontSize: '14px', lineHeight: '1.6' }}>
                    Thank you for reaching out. We've received your message and will respond within 24 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    type="button"
                    className="btn text-white rounded-pill px-4 py-2 text-uppercase fw-semibold"
                    style={{ backgroundColor: t.accent, border: 'none', letterSpacing: '1px', fontSize: '12px' }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}