import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { Globe, Headphones, SlidersHorizontal, Music, MapPin, Youtube, Mail, Instagram, ArrowRight, PlayCircle } from 'lucide-react';
import './index.css';

function App() {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Simple fade-in animation logic
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="logo-container">
          <img src="/logo.jpg" alt="MO²LIVE" className="header-logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          <div className="logo-text" style={{ display: 'none' }}>MO²LIVE</div>
        </div>
        <div className="header-controls">
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
          </div>
          <a href="#booking" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>
            {t.hero.btnBooking}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('/Hero.jpg')" }}></div>
        <div className="hero-content fade-in">
          <h1 className="hero-title">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <p className="hero-tagline">{t.hero.tagline}</p>
          <div className="hero-buttons">
            <a href="#watch" className="btn btn-outline">
              <PlayCircle size={18} style={{ marginRight: '8px' }}/> {t.hero.btnWatch}
            </a>
            <a href="#booking" className="btn btn-primary">{t.hero.btnBooking}</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="fade-in">
          <h2 className="section-title">{t.about.title}</h2>
          <p className="about-text" style={{ marginBottom: '1.5rem' }}>{t.about.p1}</p>
          <p className="about-text">{t.about.p2}</p>
        </div>
      </section>

      {/* SIGNATURE CONCEPT */}
      <section className="concept-section">
        <h2 className="section-title fade-in">{t.concept.title}</h2>
        <p className="why-intro fade-in" style={{ marginBottom: '4rem' }}>{t.concept.subtitle}</p>
        <div className="concept-grid">
          {t.concept.cards.map((card, i) => (
            <div key={i} className="concept-card fade-in" style={{ transitionDelay: `${i * 0.1}s` }}>
              <h3>{card.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{card.desc}</p>
            </div>
          ))}
        </div>
        <p className="concept-outro fade-in">{t.concept.outro}</p>
      </section>

      {/* WHY MO2LIVE */}
      <section className="why-section" id="why">
        <h2 className="section-title fade-in">{t.whyUs.title}</h2>
        <p className="why-intro fade-in">{t.whyUs.subtitle}</p>
        
        <div className="why-list">
          {t.whyUs.items.map((item, i) => {
            const icons = [<SlidersHorizontal />, <Headphones />, <Globe />, <Music />, <ArrowRight />];
            return (
              <div key={i} className="why-item fade-in" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="why-item-icon">
                  {icons[i]}
                </div>
                <div className="why-item-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* IDEAL FOR */}
      <section className="ideal-section">
        <h2 className="section-title fade-in">{t.idealFor.title}</h2>
        <div className="ideal-grid">
          {t.idealFor.items.map((item, i) => (
            <div key={i} className="ideal-item fade-in" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="ideal-item-icon"><MapPin size={18} /></div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PERFORMANCE FORMAT */}
      <section className="format-section">
        <h2 className="section-title fade-in">{t.format.title}</h2>
        <ul className="format-list">
          {t.format.items.map((item, i) => (
            <li key={i} className="fade-in" style={{ transitionDelay: `${i * 0.1}s` }}>{item}</li>
          ))}
        </ul>
        <p className="format-note fade-in">{t.format.note}</p>
      </section>

      {/* TECHNICAL SETUP */}
      <section className="tech-section">
        <h2 className="section-title fade-in">{t.techSetup.title}</h2>
        <div className="tech-container">
          <div className="tech-column fade-in">
            <h3>{t.techSetup.venueProvides}</h3>
            <ul>
              {t.techSetup.venueItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="tech-column fade-in" style={{ transitionDelay: '0.2s', backgroundColor: 'var(--bg-charcoal)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'var(--text-white)' }}>{t.techSetup.mo2Provides}</h3>
            <ul>
              {t.techSetup.mo2Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* BASED IN BARCELONA */}
      <section className="based-in-section">
        <div className="fade-in">
          <h2>{t.location.p1}</h2>
          <p>{t.location.p2}</p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <h2 className="section-title fade-in">{t.gallery.title}</h2>
        <div className="gallery-grid">
          {/* Individual photos */}
          <div className="gallery-item fade-in" style={{ transitionDelay: '0.1s' }}>
            <img src="/Marlon.jpg" alt="Marlon" />
          </div>
          <div className="gallery-item fade-in" style={{ transitionDelay: '0.2s' }}>
            <img src="/Oliver.jpg" alt="Oliver" />
          </div>
          
          {/* Group / Performance photos */}
          {[
            'IMG-20260501-WA0003.jpg',
            'IMG-20260501-WA0008.jpg',
            'IMG-20260501-WA0009.jpg',
            'IMG-20260501-WA0010.jpg',
            'IMG-20260501-WA0011.jpg',
            'IMG-20260501-WA0012.jpg',
            'SAVE_20260501_200421.jpg',
            'SAVE_20260501_200432.jpg',
            'SAVE_20260501_200503.jpg'
          ].map((imgName, idx) => (
            <div key={imgName} className="gallery-item fade-in" style={{ transitionDelay: `${0.3 + (idx * 0.05)}s` }}>
              <img src={`/${imgName}`} alt={`MO2LIVE Gallery ${idx + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* WATCH & LISTEN */}
      <section className="watch-section" id="watch">
        <h2 className="section-title fade-in">{t.watch.title}</h2>
        <div className="video-container fade-in">
          <iframe 
            src="https://www.youtube.com/embed/gXX4BsDyIC4" 
            title="MO²LIVE Performance" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <a href="https://www.youtube.com/watch?v=gXX4BsDyIC4" target="_blank" rel="noopener noreferrer" className="btn btn-outline fade-in" style={{ marginTop: '2rem' }}>
          <Youtube size={18} style={{ marginRight: '8px' }}/> {t.watch.btnYoutube}
        </a>
      </section>

      {/* BOOKING */}
      <section className="booking-section" id="booking">
        <h2 className="section-title fade-in">{t.booking.title}</h2>
        <div className="booking-content fade-in">
          <a href="mailto:mo2live.music@gmail.com" className="booking-email">
            <Mail size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }}/>
            mo2live.music@gmail.com
          </a>

          <form className="contact-form fade-in" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>{t.booking.formLabelName}</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>{t.booking.formLabelCompany}</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>{t.booking.formLabelEmail}</label>
              <input type="email" className="form-control" />
            </div>
            <div className="form-group">
              <label>{t.booking.formLabelDetails}</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
              {t.booking.btnSend}
            </button>
          </form>

          <div className="social-links fade-in">
            <a href="https://www.instagram.com/mo2live.music/" target="_blank" rel="noopener noreferrer" className="social-link">
              <Instagram size={24} /> @mo2live.music
            </a>
            <a href="https://www.youtube.com/@MO2livemusic" target="_blank" rel="noopener noreferrer" className="social-link">
              <Youtube size={24} /> @MO2livemusic
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo-container fade-in">
          <img src="/logo.jpg" alt="MO²LIVE" className="footer-logo-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          <div className="footer-logo" style={{ display: 'none' }}>MO²LIVE</div>
        </div>
        <div className="footer-taglines fade-in">
          <p className="footer-tagline-1">{t.footer.tagline1}</p>
          <p className="footer-tagline-2">{t.footer.tagline2}</p>
        </div>
        <div className="footer-bottom fade-in">
          <p>&copy; {new Date().getFullYear()} MO²LIVE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
