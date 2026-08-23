import React from 'react';
import { useTheme } from '../ThemeContext';
import about from '../assets/about.avif';

export default function About() {
  const { theme: t } = useTheme();

  const teamMembers = [
    {
      name: 'Mara Osei',
      role: 'Founder & Formulator',
      desc: 'Former ethnobotanist turned product maker. Mara spent seven years in West Africa studying plant medicine before channeling that knowledge into skincare.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Luca Ferraro',
      role: 'Head of Sourcing',
      desc: "Luca's background in agroforestry means every ingredient is traced back to its origin. He visits every farm partner at least once a year.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Yoshi Tanaka',
      role: 'Creative Director',
      desc: 'Yoshi believes that packaging is part of the ritual. Every bottle, every label, every insert is designed to deserve its place on your shelf.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div style={{ backgroundColor: t.bg, color: t.text, transition: 'all 0.3s ease' }}>
      {/* Our Story Header */}
      <div className="container py-5">
        <div className="row align-items-center py-5 g-5">
          <div className="col-12 col-lg-6">
            <p className="text-uppercase" style={{ letterSpacing: '2px', color: t.accent, fontSize: '14px' }}>
              Our Story
            </p>
            <h1 className="display-4 fw-normal mb-4" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: t.text }}>
              Built slowly, <br /> on purpose.
            </h1>
            <h6 className="mb-4" style={{ fontSize: '17px', lineHeight: '1.8', color: t.textMuted }}>
              Serene began in 2019 in a small rented kitchen in Lisbon. Mara Osei, frustrated by ingredient labels she had to decode with a chemistry degree, started making things herself — for friends, then for strangers, then for thousands of people who wanted something honest.
            </h6>
            <h6 style={{ fontSize: '17px', lineHeight: '1.8', color: t.textMuted }}>
              We have never taken venture capital. We have never run a flash sale. We have never reformulated a product to cut costs.
            </h6>
          </div>

          <div className="col-12 col-lg-6">
            <img
              src={about}
              alt="Our story background"
              className="img-fluid rounded-4 shadow-sm"
              style={{ width: '100%', height: '450px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Beliefs Section */}
      <div className="py-5" style={{ backgroundColor: t.bgAlt }}>
        <div className="container py-4">
          <p className="text-uppercase fw-semibold mb-4" style={{ letterSpacing: '2px', color: t.accent }}>
            What we believe
          </p>
          <div className="row g-4">
            {[
              { title: 'Ingredient transparency', desc: 'Every formula is published in full. No "fragrance" black boxes, no hidden fillers.' },
              { title: 'Climate commitments', desc: 'We offset 200% of our carbon footprint and plant one tree for every order shipped.' },
              { title: 'Slow supply chains', desc: 'We work with fewer suppliers, more deeply. Long relationships over cheap margins.' },
              { title: 'B Corp certified', desc: "We've met rigorous standards for social and environmental performance since 2023." }
            ].map((belief, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <div
                  className="p-4 h-100 rounded-4"
                  style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}
                >
                  <h5 className="mb-3" style={{ color: t.text, fontFamily: 'Georgia, serif' }}>{belief.title}</h5>
                  <p className="mb-0" style={{ color: t.textMuted, fontSize: '14px', lineHeight: '1.6' }}>{belief.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container py-5 my-4">
        <p className="text-uppercase fw-semibold mb-4" style={{ letterSpacing: '2px', color: t.accent }}>
          The people
        </p>
        <div className="row g-4">
          {teamMembers.map((person, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <img
                src={person.image}
                alt={person.name}
                className="img-fluid rounded-4 mb-3"
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
              />
              <h4 className="mb-1" style={{ color: t.text, fontFamily: 'Georgia, serif' }}>{person.name}</h4>
              <p className="text-uppercase mb-3" style={{ letterSpacing: '1px', color: t.accent, fontSize: '0.85rem' }}>
                {person.role}
              </p>
              <p style={{ color: t.textMuted, fontSize: '15px', lineHeight: '1.7' }}>{person.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Quote */}
      <div className="py-5 text-center" style={{ backgroundColor: t.bgAlt || '#1a1a1a', color: t.text }}>
        <div className="container py-4">
          <blockquote
            className="mb-4"
            style={{ fontSize: '2rem', lineHeight: '1.6', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            "We are not trying to be the biggest skincare <br />
            brand. We are trying to be the one you reach for <br />
            without thinking, because it has never let you down."
          </blockquote>
          <p className="text-uppercase mb-0" style={{ letterSpacing: '2px', color: t.accent }}>
            — Mara Osei, Founder
          </p>
        </div>
      </div>
    </div>
  );
}