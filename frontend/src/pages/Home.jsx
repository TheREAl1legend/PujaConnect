import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { showError } from "../utils/alert";
import {
  pujaList,
  whyItems,
  whyCards,
  steps,
  testimonials,
  stats,
} from "./homeConstants";

/* ─── hooks ─────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── FadeIn ─────────────────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${delay}s,
                     transform 0.65s cubic-bezier(.4,0,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Home ───────────────────────────────────────────────────────────────── */

function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city.trim()) { showError("Please enter a city"); return; }
    navigate(`/pandits?city=${city.trim()}`);
  };

  return (
    <>
      <style>{css}</style>
      <div className="h-root">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="h-hero">
          <div className="h-hero-bg" aria-hidden="true">
            <div className="h-mandala">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-petal" style={{ transform: `rotate(${i * 30}deg)` }} />
              ))}
            </div>
            <div className="h-orb h-orb-1" />
            <div className="h-orb h-orb-2" />
          </div>

          <div className="h-hero-inner">
            <div className="h-hero-left">
              <span className="h-chip">🛕 Trusted Puja Platform</span>
              <h1 className="h-hero-title">
                Bring Sacred<br />
                <em>Tradition</em> Home
              </h1>
              <p className="h-hero-desc">
                Holistic pandit booking for puja, rituals and ceremonies —
                crafted for modern families who value sincerity, punctuality
                and peace of mind.
              </p>

              <div className="h-search-wrap">
                <div className="h-search-bar">
                  <span className="h-search-pin">📍</span>
                  <input
                    type="text"
                    className="h-search-input"
                    placeholder="Enter your city (e.g. Delhi, Mumbai…)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button className="h-search-btn" onClick={handleSearch}>
                    Find Pandits
                  </button>
                </div>
                <div className="h-trust-row">
                  {["Background verified", "Instant booking", "No hidden fees"].map(t => (
                    <span key={t} className="h-trust-badge">
                      <span className="h-check">✓</span> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-hero-right" aria-hidden="true">
              <div className="h-img-frame">
                <img
                  src="https://as1.ftcdn.net/v2/jpg/20/06/39/30/1000_F_2006393063_8gaSvEWFbytWs8ck1s1CYfHJlmi9lV5J.jpg"
                  alt="Pandit performing puja"
                  className="h-hero-img"
                />
                <div className="h-img-glow" />
              </div>
              <div className="h-float-card">
                <span className="h-float-num">12K+</span>
                <span className="h-float-label">Pujas Performed</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <div className="h-stats-bar">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="h-stat">
                <span className="h-stat-val">{s.value}</span>
                <span className="h-stat-label">{s.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── WHY US ───────────────────────────────────────────────────── */}
        <section className="h-section">
          <FadeIn>
            <div className="h-section-head">
              <span className="h-eyebrow">Why Choose Us</span>
              <h2 className="h-section-title">Trusted, easy, and affordable</h2>
              <p className="h-section-sub">
                A premium pandit booking platform designed for families,
                ceremonies, and sacred celebrations.
              </p>
            </div>
          </FadeIn>
          <div className="h-card-grid">
            {whyCards.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="h-feature-card">
                  <div className="h-feature-icon">{item.icon}</div>
                  <h3 className="h-feature-title">{item.title}</h3>
                  <p className="h-feature-desc">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── PUJA SHOWCASE ────────────────────────────────────────────── */}
        <section className="h-dark-section">
          <div className="h-dark-inner">
            <FadeIn>
              <div className="h-section-head h-section-head--dark">
                <span className="h-eyebrow h-eyebrow--gold">Explore Pujas & Kathas</span>
                <h2 className="h-section-title h-section-title--light">
                  Popular rituals curated for you
                </h2>
                <p className="h-section-sub h-section-sub--dim">
                  Hand-picked kathas and pujas, explained clearly so you can
                  book with confidence.
                </p>
                <button className="h-ghost-btn" onClick={() => navigate("/kathas")}>
                  Explore All Kathas →
                </button>
              </div>
            </FadeIn>
            <div className="h-puja-grid">
              {pujaList.slice(0, 4).map((item, i) => (
                <FadeIn key={item.slug} delay={i * 0.1}>
                  <div className="h-puja-card" onClick={() => navigate(`/puja/${item.slug}`)}>
                    <div className="h-puja-thumb">
                      <img src={item.image} alt={item.name.en} className="h-puja-img" />
                      <div className="h-puja-veil">
                        <span className="h-puja-cta">Explore →</span>
                      </div>
                    </div>
                    <div className="h-puja-body">
                      <span className="h-puja-icon">{item.icon}</span>
                      <div>
                        <h4 className="h-puja-name">{item.name.en}</h4>
                        <p className="h-puja-blurb">{item.description.en.slice(0, 72)}…</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY PUJA ─────────────────────────────────────────────────── */}
        <section className="h-warm-section">
          <div className="h-section-inner">
            <FadeIn>
              <div className="h-section-head">
                <span className="h-eyebrow">Why Perform These Pujas?</span>
                <h2 className="h-section-title">
                  Meaningful rituals for life and prosperity
                </h2>
              </div>
            </FadeIn>
            <div className="h-card-grid">
              {whyItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="h-meaning-card">
                    <div className="h-meaning-emoji">{item.emoji}</div>
                    <h3 className="h-meaning-title">{item.title}</h3>
                    <p className="h-meaning-desc">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section className="h-section">
          <FadeIn>
            <div className="h-section-head">
              <span className="h-eyebrow">How It Works</span>
              <h2 className="h-section-title">A simple process for every devotee</h2>
            </div>
          </FadeIn>
          <div className="h-steps">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.12}>
                <div className="h-step">
                  <div className="h-step-num">{step.num}</div>
                  <div className="h-step-icon">{step.icon}</div>
                  <h3 className="h-step-title">{step.title}</h3>
                  <p className="h-step-desc">{step.description}</p>
                  {i < steps.length - 1 && <div className="h-connector" aria-hidden="true">→</div>}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section className="h-testimonials">
          <div className="h-section-inner">
            <FadeIn>
              <div className="h-section-head">
                <span className="h-eyebrow">Testimonials</span>
                <h2 className="h-section-title">What our devotees are saying</h2>
              </div>
            </FadeIn>
            <div className="h-card-grid">
              {testimonials.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.1}>
                  <div className="h-testi-card">
                    <div className="h-testi-mark">"</div>
                    <p className="h-testi-text">{item.quote}</p>
                    <div className="h-testi-author">
                      <div className="h-avatar">{item.initial}</div>
                      <div>
                        <p className="h-testi-name">{item.name}</p>
                        <p className="h-testi-role">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="h-cta">
          <div className="h-cta-glow" aria-hidden="true" />
          <FadeIn>
            <div className="h-cta-body">
              <span className="h-eyebrow h-eyebrow--gold">Join Our Network</span>
              <h2 className="h-cta-title">Upgrade to Premium for a Better Experience</h2>
              <p className="h-cta-desc">
                Access exclusive features, connect with verified Pandits faster,
                enjoy priority bookings, and experience a smoother spiritual journey.
              </p>
              <button
                className="h-cta-btn"
                onClick={() => window.open("https://stripe.com/in", "_blank")}
              >
                Upgrade Now — Start Your Premium Journey ✨
              </button>
            </div>
          </FadeIn>
        </section>

      </div>
    </>
  );
}

/* ─── CSS ────────────────────────────────────────────────────────────────── */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,500&family=DM+Sans:wght@400;500;600&display=swap');

/* ── reset ── */
.h-root *, .h-root *::before, .h-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── tokens ── */
.h-root {
  --saffron:    #f59e0b;
  --saffron-lt: #fef3c7;
  --ember:      #dc6027;
  --ember-dk:   #b94d1c;
  --cream:      #fdfaf5;
  --cream-dk:   #f7f1e8;
  --ink:        #1c1008;
  --ink-md:     #3d2010;
  --ink-lt:     #7a5c3e;
  --ink-xlt:    #b89a78;
  --border:     rgba(120,80,30,.13);
  --border-dk:  rgba(120,80,30,.22);
  --card-bg:    #ffffff;
  --dark-bg:    #160800;
  --dark-mid:   #271208;
  --dark-edge:  #3d1a06;
  --easing:     cubic-bezier(.4,0,.2,1);

  background: var(--cream);
  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
  overflow-x: hidden;
  margin-top: 50px;
  line-height: 1.6;
}

/* ─── typography helpers ── */
.h-eyebrow {
  display: inline-block;
  font-size: .7rem;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--ember);
  margin-bottom: .6rem;
}
.h-eyebrow--gold { color: var(--saffron); }

.h-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.9rem, 4vw, 2.7rem);
  font-weight: 600;
  line-height: 1.18;
  color: var(--ink);
  margin-bottom: .7rem;
}
.h-section-title--light { color: #fff; }

.h-section-sub {
  font-size: .93rem;
  color: var(--ink-lt);
  line-height: 1.8;
  max-width: 520px;
  margin: 0 auto;
}
.h-section-sub--dim { color: rgba(255,255,255,.52); }

.h-section-head {
  text-align: center;
  margin-bottom: 3rem;
}
.h-section-head--dark { color: #fff; }

/* ─── layout wrappers ── */
.h-section {
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.h-section-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.h-dark-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* ─── card grid ── */
.h-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.25rem;
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
.h-hero {
  position: relative;
  min-height: 94vh;
  background: var(--dark-bg);
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 5rem 2rem 5rem;
}

/* layered background effects */
.h-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.h-mandala {
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  width: 680px;
  height: 680px;
  animation: h-spin 90s linear infinite;
}

.h-petal {
  position: absolute;
  top: 50%; left: 50%;
  width: 280px; height: 56px;
  margin: -28px -140px;
  border-radius: 50%;
  border: 1.5px solid rgba(245,158,11,.12);
  transform-origin: center;
}

@keyframes h-spin { to { transform: translateY(-50%) rotate(360deg); } }

.h-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: .18;
}
.h-orb-1 {
  width: 500px; height: 500px;
  background: var(--ember);
  top: -100px; right: 10%;
}
.h-orb-2 {
  width: 350px; height: 350px;
  background: var(--saffron);
  bottom: -80px; left: 5%;
}

/* hero layout */
.h-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.h-hero-left { color: #fff; }

.h-chip {
  display: inline-block;
  background: rgba(245,158,11,.15);
  border: 1px solid rgba(245,158,11,.3);
  color: #fde68a;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .1em;
  padding: 5px 14px;
  border-radius: 99px;
  margin-bottom: 1.4rem;
}

.h-hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 6vw, 4.8rem);
  font-weight: 600;
  line-height: 1.08;
  color: #fff;
  margin-bottom: 1.2rem;
}
.h-hero-title em {
  font-style: italic;
  color: var(--saffron);
}

.h-hero-desc {
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(255,255,255,.65);
  margin-bottom: 2.25rem;
  max-width: 440px;
}

/* search */
.h-search-wrap { max-width: 480px; }

.h-search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  padding: 7px 7px 7px 14px;
  gap: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 12px 48px rgba(0,0,0,.35);
}
.h-search-pin { font-size: 1.05rem; flex-shrink: 0; }
.h-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: .93rem;
  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
  background: transparent;
  min-width: 0;
}
.h-search-btn {
  background: linear-gradient(135deg, var(--ember), var(--saffron));
  color: #fff;
  border: none;
  padding: 11px 22px;
  border-radius: 10px;
  font-size: .88rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity .2s var(--easing), transform .2s var(--easing);
  letter-spacing: .01em;
}
.h-search-btn:hover { opacity: .88; transform: translateY(-1px); }
.h-search-btn:active { transform: translateY(0); opacity: 1; }

.h-trust-row { display: flex; gap: 1rem; flex-wrap: wrap; }
.h-trust-badge {
  font-size: .78rem;
  color: rgba(255,255,255,.55);
  display: flex;
  align-items: center;
  gap: 4px;
}
.h-check {
  color: var(--saffron);
  font-weight: 600;
}

/* hero image */
.h-hero-right {
  display: flex;
  justify-content: center;
  position: relative;
}

.h-img-frame {
  position: relative;
  width: 100%;
  max-width: 430px;
}

.h-hero-img {
  width: 100%;
  height: 520px;
  object-fit: cover;
  border-radius: 28px;
  display: block;
  box-shadow: 0 32px 80px rgba(0,0,0,.55);
}

.h-img-glow {
  position: absolute;
  inset: -2px;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(220,96,39,.3) 0%, transparent 60%);
  pointer-events: none;
}

.h-float-card {
  position: absolute;
  bottom: -18px;
  left: -24px;
  background: #fff;
  border-radius: 14px;
  padding: 14px 18px;
  box-shadow: 0 8px 28px rgba(0,0,0,.18);
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.h-float-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.55rem;
  font-weight: 600;
  color: var(--ember);
  line-height: 1;
}
.h-float-label {
  font-size: .7rem;
  color: var(--ink-xlt);
  letter-spacing: .06em;
  text-transform: uppercase;
}

/* ══════════════════════════════════════════════════════
   STATS BAR
══════════════════════════════════════════════════════ */
.h-stats-bar {
  background: var(--ink);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.h-stat {
  padding: 2.5rem 1.5rem;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,.07);
  display: flex;
  flex-direction: column;
  gap: 3px;
  transition: background .25s;
}
.h-stat:last-child { border-right: none; }
.h-stat:hover { background: rgba(255,255,255,.03); }

.h-stat-val {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--saffron);
  line-height: 1;
}
.h-stat-label {
  font-size: .72rem;
  font-weight: 600;
  color: rgba(255,255,255,.42);
  letter-spacing: .1em;
  text-transform: uppercase;
}

/* ══════════════════════════════════════════════════════
   WHY CARDS
══════════════════════════════════════════════════════ */
.h-feature-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem 1.75rem;
  transition: transform .28s var(--easing), box-shadow .28s var(--easing), border-color .28s;
}
.h-feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 56px rgba(220,96,39,.1);
  border-color: var(--border-dk);
}
.h-feature-icon { font-size: 2rem; margin-bottom: 1rem; }
.h-feature-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: .4rem;
}
.h-feature-desc { font-size: .9rem; color: var(--ink-lt); line-height: 1.75; }

/* ══════════════════════════════════════════════════════
   DARK PUJA SECTION
══════════════════════════════════════════════════════ */
.h-dark-section {
  background: linear-gradient(170deg, var(--dark-bg) 0%, var(--dark-edge) 100%);
  padding: 6rem 1.5rem;
  position: relative;
  overflow: hidden;
}
.h-dark-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,158,11,.06) 0%, transparent 70%);
  pointer-events: none;
}

.h-ghost-btn {
  margin-top: 1.25rem;
  background: transparent;
  border: 1px solid rgba(245,158,11,.4);
  color: var(--saffron);
  padding: 9px 26px;
  border-radius: 99px;
  font-size: .87rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background .22s, color .22s;
}
.h-ghost-btn:hover { background: var(--saffron); color: var(--dark-bg); }

.h-puja-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.1rem;
}

.h-puja-card {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: transform .28s var(--easing), box-shadow .28s;
}
.h-puja-card:hover { transform: translateY(-7px); box-shadow: 0 24px 64px rgba(0,0,0,.5); }

.h-puja-thumb { position: relative; overflow: hidden; }
.h-puja-img {
  width: 100%; height: 185px;
  object-fit: cover;
  display: block;
  transition: transform .45s var(--easing);
}
.h-puja-card:hover .h-puja-img { transform: scale(1.07); }

.h-puja-veil {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(220,96,39,.75) 0%, transparent 60%);
  opacity: 0;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  transition: opacity .3s;
}
.h-puja-card:hover .h-puja-veil { opacity: 1; }

.h-puja-cta { color: #fff; font-size: .83rem; font-weight: 600; letter-spacing: .04em; }

.h-puja-body {
  padding: 1.15rem 1.15rem 1.3rem;
  display: flex;
  gap: .65rem;
  align-items: flex-start;
}
.h-puja-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
.h-puja-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.13rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: .25rem;
}
.h-puja-blurb { font-size: .8rem; color: rgba(255,255,255,.48); line-height: 1.65; }

/* ══════════════════════════════════════════════════════
   MEANING / WHY PUJA
══════════════════════════════════════════════════════ */
.h-warm-section {
  background: var(--cream-dk);
  padding: 6rem 1.5rem;
}

.h-meaning-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem 1.75rem;
  border-top: 3px solid var(--ember);
  transition: transform .28s var(--easing);
}
.h-meaning-card:hover { transform: translateY(-5px); }
.h-meaning-emoji { font-size: 2.2rem; margin-bottom: .9rem; }
.h-meaning-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: .4rem;
}
.h-meaning-desc { font-size: .9rem; color: var(--ink-lt); line-height: 1.75; }

/* ══════════════════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════════════════ */
.h-steps {
  display: flex;
  gap: 0;
  align-items: flex-start;
  position: relative;
}
.h-step {
  flex: 1;
  text-align: center;
  padding: 1.75rem 1.25rem;
  position: relative;
}
.h-connector {
  position: absolute;
  right: -14px;
  top: 2.4rem;
  font-size: 1.4rem;
  color: var(--ink-xlt);
  z-index: 1;
  pointer-events: none;
}
.h-step-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 4.5rem;
  font-weight: 600;
  color: rgba(220,96,39,.08);
  line-height: 1;
  margin-bottom: -.65rem;
}
.h-step-icon { font-size: 1.9rem; margin-bottom: .65rem; }
.h-step-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: .4rem;
}
.h-step-desc { font-size: .87rem; color: var(--ink-lt); line-height: 1.75; }

/* ══════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════ */
.h-testimonials {
  background: var(--cream);
  padding: 6rem 1.5rem;
  border-top: 1px solid var(--border);
}

.h-testi-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.75rem;
  transition: transform .28s var(--easing), box-shadow .28s;
}
.h-testi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 48px rgba(220,96,39,.09);
}

.h-testi-mark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 5rem;
  color: var(--saffron);
  line-height: .6;
  opacity: .4;
  margin-bottom: .65rem;
}

.h-testi-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #4a3520;
  line-height: 1.8;
  margin-bottom: 1.4rem;
}

.h-testi-author { display: flex; align-items: center; gap: .7rem; }

.h-avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ember), var(--saffron));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: .88rem;
  flex-shrink: 0;
}

.h-testi-name { font-size: .88rem; font-weight: 600; color: var(--ink); margin: 0; }
.h-testi-role { font-size: .76rem; color: var(--ink-xlt); margin: 0; }

/* ══════════════════════════════════════════════════════
   CTA
══════════════════════════════════════════════════════ */
.h-cta {
  background: var(--dark-bg);
  padding: 7rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.h-cta-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245,158,11,.09) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 80% 80%, rgba(220,96,39,.08) 0%, transparent 60%);
  pointer-events: none;
}

.h-cta-body {
  position: relative;
  z-index: 1;
  max-width: 620px;
  margin: 0 auto;
}

.h-cta-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.1rem);
  font-weight: 600;
  color: #fff;
  margin: .7rem 0 1rem;
  line-height: 1.18;
}
.h-cta-desc {
  font-size: .93rem;
  color: rgba(255,255,255,.52);
  line-height: 1.85;
  margin-bottom: 2rem;
}
.h-cta-btn {
  display: inline-block;
  background: linear-gradient(135deg, var(--ember), var(--saffron));
  color: #fff;
  border: none;
  padding: 15px 38px;
  border-radius: 14px;
  font-size: .97rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: opacity .22s, transform .22s var(--easing);
  box-shadow: 0 10px 36px rgba(220,96,39,.38);
  letter-spacing: .01em;
}
.h-cta-btn:hover { opacity: .88; transform: translateY(-2px); }
.h-cta-btn:active { transform: translateY(0); }

/* ══════════════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════════════ */
@media (max-width: 900px) {
  .h-hero-inner { grid-template-columns: 1fr; gap: 3rem; }
  .h-hero-right { display: none; }
  .h-hero { min-height: auto; padding: 4rem 1.25rem 5rem; }
}

@media (max-width: 640px) {
  .h-stats-bar { grid-template-columns: repeat(2, 1fr); }
  .h-stat { padding: 1.75rem 1rem; }
  .h-steps { flex-direction: column; align-items: stretch; }
  .h-connector { display: none; }
  .h-section { padding: 4rem 1rem; }
  .h-dark-section,
  .h-warm-section,
  .h-testimonials { padding: 4rem 1rem; }
  .h-cta { padding: 5rem 1rem; }
}
`;

export default Home;