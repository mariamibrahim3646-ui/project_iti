import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

import heroImg from '../assets/hero.avif';
import philosophyImg from '../assets/phylosophy.avif';


export default function Home() {
  const { theme: t } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div style={{ backgroundColor: t.bg, color: t.text, transition: 'all 0.3s ease' }}>
      {/* Hero Section */}
      <div className="container py-5">
        <div className="row align-items-center py-4 g-5">
          <div className="col-12 col-lg-6 hero-text">
            <span 
              className="badge rounded-pill px-3 py-2 text-uppercase mb-3"
              style={{ backgroundColor: `${t.accent}15`, color: t.accent, letterSpacing: '2px', fontSize: '11px' }}
            >
              New Collection · Summer 2026
            </span>
            <h1 className="display-3 fw-bold mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: t.text, lineHeight: '1.15' }}>
              Rituals for a <br /> quieter life.
            </h1>
            <p className="mt-3 mb-4" style={{ maxWidth: '470px', fontSize: '17px', lineHeight: '1.8', color: t.textMuted }}>
              Carefully sourced, gently made. Botanical ingredients that let your skin breathe and your mind settle.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link
                to="/shop"
                className="btn text-white rounded-pill px-4 py-3 text-uppercase fw-semibold shadow-sm"
                style={{ backgroundColor: t.accent, border: 'none', letterSpacing: '1.5px', fontSize: '13px' }}
              >
                Shop collection
              </Link>
              <Link
                to="/about"
                className="btn rounded-pill px-4 py-3 text-uppercase fw-semibold"
                style={{
                  backgroundColor: 'transparent',
                  color: t.text,
                  border: `1px solid ${t.border}`,
                  letterSpacing: '1.5px',
                  fontSize: '13px'
                }}
              >
                Our story
              </Link>
            </div>

            {/* Stats Row */}
            <div className="d-flex flex-wrap gap-4 mt-5 pt-3 border-top" style={{ borderColor: `${t.border}80` }}>
              <div>
                <div style={{ color: t.accent, fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'bold' }}>8,400+</div>
                <div className="text-uppercase" style={{ color: t.textSubtle, fontSize: '11px', letterSpacing: '1.5px' }}>Customers</div>
              </div>
              <div className="border-end" style={{ borderColor: t.border }}></div>
              <div>
                <div style={{ color: t.accent, fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'bold' }}>100%</div>
                <div className="text-uppercase" style={{ color: t.textSubtle, fontSize: '11px', letterSpacing: '1.5px' }}>Natural</div>
              </div>
              <div className="border-end" style={{ borderColor: t.border }}></div>
              <div>
                <div style={{ color: t.accent, fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'bold' }}>B Corp</div>
                <div className="text-uppercase" style={{ color: t.textSubtle, fontSize: '11px', letterSpacing: '1.5px' }}>Certified</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 text-center position-relative">
            <div className="position-relative d-inline-block w-100">
              <img
                src={heroImg}  
                alt="Skincare products"
                className="img-fluid rounded-5 shadow"
                style={{ width: '100%', maxHeight: '580px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="py-5" style={{ backgroundColor: t.bgAlt }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <img
                src={philosophyImg}
                alt="Our philosophy"
                className="img-fluid rounded-5 shadow-sm"
                style={{ width: '100%', maxHeight: '460px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-12 col-lg-6">
              <p className="text-uppercase fw-semibold mb-2" style={{ color: t.accent, letterSpacing: '3px', fontSize: '12px' }}>
                Our Philosophy
              </p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '38px', color: t.text, lineHeight: '1.25' }}>
                Simplicity is the <br /> highest luxury.
              </h2>
              <p className="my-4" style={{ color: t.textMuted, fontSize: '16px', lineHeight: '1.8' }}>
                Fewer, better things. Formulated with certified organic botanicals, bottled in sustainable recycled glass.
              </p>
              <Link
                to="/about"
                className="btn text-white rounded-pill px-4 py-3 text-uppercase fw-semibold shadow-sm"
                style={{ backgroundColor: t.accent, border: 'none', letterSpacing: '1px', fontSize: '12px' }}
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-5" style={{ backgroundColor: t.surface }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="text-uppercase fw-semibold mb-1" style={{ color: t.accent, letterSpacing: '3px', fontSize: '12px' }}>
              Testimonials
            </p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: t.text }}>What people say</h3>
          </div>
          
          <div className="row g-4">
            {[
              { quote: `"My skin has never felt this calm. The face oil genuinely changed my daily routine."`, name: 'Saoirse M.', location: 'Dublin' },
              { quote: `"The reed diffuser filled my apartment within an hour. Completely natural and addictive."`, name: 'Tariq A.', location: 'Amsterdam' },
              { quote: `"Received the gift set for my birthday — three months later I've reordered every piece."`, name: 'Yuki T.', location: 'Kyoto' }
            ].map((review, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div
                  className="p-4 rounded-4 h-100 d-flex flex-column justify-content-between shadow-sm"
                  style={{ 
                    backgroundColor: t.bg, 
                    border: `1px solid ${t.border}`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <div>
                    <div className="mb-3" style={{ color: t.accent, fontSize: '14px' }}>★★★★★</div>
                    <p className="fst-italic mb-4" style={{ color: t.text, fontSize: '15px', lineHeight: '1.7' }}>{review.quote}</p>
                  </div>
                  <div className="pt-3 border-top" style={{ borderColor: `${t.border}60` }}>
                    <p className="fw-bold mb-0" style={{ color: t.text, fontSize: '14px' }}>{review.name}</p>
                    <p className="mb-0" style={{ color: t.textSubtle, fontSize: '12px' }}>{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      {/* Newsletter Section */}
<div className="container pt-5 pb-4 text-center">
  {/* استايل مخصص للفوكس والبليس هولدر */}
  <style>{`
    .custom-newsletter-input:focus {
      box-shadow: none !important;
      border-color: ${t.accent} !important;
      outline: none !important;
    }
    .custom-newsletter-input::placeholder {
      color: ${t.textMuted} !important;
      opacity: 0.7;
    }
  `}</style>

  <div className="p-4 p-md-5 rounded-5 shadow-sm" style={{ backgroundColor: t.bgAlt }}>
    <h3 style={{ fontFamily: 'Georgia, serif', color: t.text, fontSize: '32px' }}>The quiet dispatch</h3>
    <p className="mb-4" style={{ color: t.textMuted, maxWidth: '500px', margin: '0 auto' }}>
      Seasonal rituals, new arrivals, and gentle reading — delivered unhurriedly.
    </p>
    <form onSubmit={handleSubscribe} className="d-flex flex-column flex-sm-row gap-2 justify-content-center mt-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control custom-newsletter-input rounded-pill px-4 py-3"
        placeholder="Your@email.com"
        required
        style={{ 
          maxWidth: '380px', 
          backgroundColor: t.inputBg, 
          color: t.text, 
          border: `1px solid ${t.border}`, 
          fontSize: '14px' 
        }}
      />
      <button
        type="submit"
        className="btn text-white rounded-pill px-4 py-3 text-uppercase fw-semibold"
        style={{ backgroundColor: t.accent, border: 'none', letterSpacing: '1px', fontSize: '13px' }}
      >
        Subscribe
      </button>
    </form>
  </div>
</div>
    </div>
  );
}