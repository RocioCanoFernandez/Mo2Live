import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { Globe, Headphones, SlidersHorizontal, Music, MapPin, Mail, ArrowRight, PlayCircle } from 'lucide-react';
import { FaYoutube, FaInstagram, FaLinkedin, FaTiktok, FaSpotify } from 'react-icons/fa';
import './index.css';

function App() {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [expandedIdeal, setExpandedIdeal] = useState(null);
  const t = translations[lang];

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('Sending...');
    const formData = new FormData(event.target);

    formData.append("access_key", "d0483143-0999-43c5-83d8-b10ceef66c7d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('Message sent successfully!');
        event.target.reset();
        setTimeout(() => setFormStatus(''), 5000);
      } else {
        setFormStatus(data.message || 'Error sending message. Please try again.');
      }
    } catch (error) {
      setFormStatus('Error sending message. Please try again later.');
    }
  };

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

      {/* IDEAL FOR */}
      <section className="ideal-section" id="ideal">
        <div className="editorial-line"></div>
        <div className="editorial-number">V</div>
        <h2 className="section-title fade-in">{t.idealFor.title}</h2>
        <div className="ideal-grid">
          {t.idealFor.items.map((item, i) => (
            <div 
              key={i} 
              className={`ideal-item fade-in ${expandedIdeal === i ? 'expanded' : ''}`} 
              style={{ transitionDelay: `${i * 0.05}s` }}
              onClick={() => setExpandedIdeal(expandedIdeal === i ? null : i)}
            >
              <div className="ideal-item-header">
                <div className="ideal-item-icon"><MapPin size={18} /></div>
                <span>{item.title}</span>
                <span className="ideal-item-toggle">{expandedIdeal === i ? '-' : '+'}</span>
              </div>
              {expandedIdeal === i && (
                <div className="ideal-item-desc">
                  {item.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WHY MO2LIVE */}
      <section className="why-section" id="why">
        <div className="editorial-number">IV</div>
        <h2 className="section-title fade-in">{t.whyUs.title}</h2>
        <p className="why-intro fade-in">{t.whyUs.subtitle}</p>
        
        <div className="why-container">
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
          <div className="why-image fade-in" style={{ transitionDelay: '0.4s' }}>
            <img src="/IMG-20260501-WA0008.jpg" alt="MO2LIVE Performance" />
          </div>
        </div>
      </section>

      {/* WATCH & LISTEN */}
      <section className="watch-section" id="watch">
        <h2 className="section-title fade-in">{t.watch.title}</h2>
        
        <div className="videos-grid fade-in">
          <div className="video-main">
            <div className="video-container">
              <iframe 
                src="https://www.youtube.com/embed/gXX4BsDyIC4" 
                title={t.watch.videos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <p className="video-title">{t.watch.videos[0].title}</p>
          </div>
          <div className="video-sub-container">
            <div className="video-sub">
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/gXX4BsDyIC4" 
                  title={t.watch.videos[1].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <p className="video-title">{t.watch.videos[1].title}</p>
            </div>
            <div className="video-sub">
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/gXX4BsDyIC4" 
                  title={t.watch.videos[2].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <p className="video-title">{t.watch.videos[2].title}</p>
            </div>
          </div>
        </div>

        <div className="watch-buttons fade-in" style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyItems: 'center', justifyContent: 'center' }}>
          <a href="https://www.youtube.com/@MO2livemusic" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <FaYoutube size={18} style={{ marginRight: '8px' }}/> {t.watch.btnYoutube}
          </a>
          <a href="https://open.spotify.com/artist/6JPKKMgXvydvrjDbnmRxON" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <FaSpotify size={18} style={{ marginRight: '8px' }}/> {t.watch.btnSpotify}
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="editorial-line"></div>
        <div className="editorial-number">I</div>
        <div className="fade-in">
          <h2 className="section-title">{t.about.title}</h2>
          <p className="about-text" style={{ marginBottom: '1.5rem' }}>{t.about.p1}</p>
          <p className="about-text">{t.about.p2}</p>
        </div>
      </section>

      {/* SIGNATURE CONCEPT */}
      <section className="concept-section" id="concept">
        <div className="editorial-line"></div>
        <div className="editorial-number">III</div>
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

      {/* PERFORMANCE FORMAT */}
      <section className="format-section">
        <div className="editorial-number">VI</div>
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

      {/* ARTISTS */}
      <section className="artists-section" id="artists">
        <div className="editorial-number">II</div>
        <h2 className="section-title fade-in">{t.artists.title}</h2>
        <div className="artists-container">
          <div className="artist-card fade-in">
            <div className="artist-photo">
              <img src="/Marlon.jpg" alt="Marlon" />
            </div>
            <div className="artist-info">
              <h3>{t.artists.marlonName}</h3>
              <p className="artist-role">{t.artists.marlonRole}</p>
              {Array.isArray(t.artists.marlonBio) ? (
                t.artists.marlonBio.map((p, idx) => <p key={idx} className="artist-bio" dangerouslySetInnerHTML={{ __html: p }}></p>)
              ) : (
                <p className="artist-bio" dangerouslySetInnerHTML={{ __html: t.artists.marlonBio }}></p>
              )}
            </div>
          </div>
          <div className="artist-card fade-in" style={{ transitionDelay: '0.2s' }}>
            <div className="artist-photo">
              <img src="/Oliver.jpg" alt="Oliver" />
            </div>
            <div className="artist-info">
              <h3>{t.artists.oliverName}</h3>
              <p className="artist-role">{t.artists.oliverRole}</p>
              {Array.isArray(t.artists.oliverBio) ? (
                t.artists.oliverBio.map((p, idx) => <p key={idx} className="artist-bio" dangerouslySetInnerHTML={{ __html: p }}></p>)
              ) : (
                <p className="artist-bio" dangerouslySetInnerHTML={{ __html: t.artists.oliverBio }}></p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <h2 className="section-title fade-in">{t.gallery.title}</h2>
        <div className="gallery-grid">
          {/* Group / Performance photos */}
          {[
            'IMG-20260501-WA0003.jpg',
            'IMG-20260501-WA0011.jpg',
            'SAVE_20260501_200421.jpg',
            'SAVE_20260501_200503.jpg'
          ].map((imgName, idx) => (
            <div key={imgName} className="gallery-item fade-in" style={{ transitionDelay: `${0.3 + (idx * 0.05)}s` }}>
              <img src={`/${imgName}`} alt={`MO2LIVE Gallery ${idx + 1}`} onError={(e) => { e.target.closest('.gallery-item').style.display = 'none'; }} />
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section className="booking-section" id="booking">
        <div className="editorial-line"></div>
        <div className="editorial-number">VII</div>
        <h2 className="section-title fade-in">{t.booking.title}</h2>
        <div className="booking-content fade-in">
          <a href="mailto:mo2live.music@gmail.com" className="booking-email">
            <Mail size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }}/>
            mo2live.music@gmail.com
          </a>

          <form className="contact-form fade-in" onSubmit={onSubmit}>
            <div className="form-group">
              <label>{t.booking.formLabelName}</label>
              <input type="text" name="name" className="form-control" required />
            </div>
            <div className="form-group">
              <label>{t.booking.formLabelCompany}</label>
              <input type="text" name="company" className="form-control" />
            </div>
            <div className="form-group">
              <label>{t.booking.formLabelEmail}</label>
              <input type="email" name="email" className="form-control" required />
            </div>
            <div className="form-group">
              <label>{t.booking.formLabelDetails}</label>
              <textarea name="message" className="form-control" rows="3" required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
              {formStatus === 'Sending...' ? '...' : t.booking.btnSend}
            </button>
            {formStatus && (
              <p style={{ marginTop: '1rem', color: formStatus.includes('Error') ? 'red' : 'var(--accent-gold)', fontSize: '0.9rem' }}>
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo-container fade-in">
          <img src="/logo.jpg" alt="MO²LIVE" className="footer-logo-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          <div className="footer-logo" style={{ display: 'none' }}>MO²LIVE</div>
        </div>
        <div className="social-links footer-socials fade-in" style={{ marginBottom: '2rem' }}>
          <a href="https://open.spotify.com/artist/6JPKKMgXvydvrjDbnmRxON" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaSpotify size={24} />
          </a>
          <a href="https://www.instagram.com/mo2live.music/" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.youtube.com/@MO2livemusic" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaYoutube size={24} />
          </a>
          <a href="https://www.tiktok.com/@mo2.live" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaTiktok size={24} />
          </a>
          <a href="http://www.linkedin.com/in/mo2-live-a3a223405" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin size={24} />
          </a>
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
