import { useState } from "react";
import pujaData from "../../data/pujaData";

function PujaViewer({ slug }) {
  const [lang, setLang] = useState("en");
  const [showMore, setShowMore] = useState(false);

  const puja = pujaData[slug];
  if (!puja) return <h2 style={styles.notFound}>Puja not found</h2>;

  const text = puja.text[lang];
  const previewText = text.slice(0, 300) + "...";

  return (
    <>
      <style>{css}</style>
      <div style={{ marginTop: "70px" }}>
        <div className="pv-wrap">

          {/* Hero image with overlaid title */}
          <div className="pv-hero">
            <img src={puja.image} alt={puja.name[lang]} className="pv-hero-img" />
            <div className="pv-hero-overlay">
              <p className="pv-hero-sub">Sacred ritual · Vedic tradition</p>
              <h1 className="pv-hero-title">{puja.name[lang]}</h1>
            </div>
            <button
              className="pv-lang-btn"
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
            >
              🌐 {lang === "en" ? "हिंदी" : "English"}
            </button>
          </div>

          <Divider icon="🪔" />

          {/* Description */}
          <p className="pv-section-label">About this puja</p>
          <h2 className="pv-section-title">Description</h2>
          <div className="pv-desc-block">
            <p className="pv-desc-text">{puja.description[lang]}</p>
          </div>

          <Divider icon="✦" />

          {/* Benefits */}
          <p className="pv-section-label">What you receive</p>
          <h2 className="pv-section-title">Benefits</h2>
          <div className="pv-benefits-grid">
            {puja.benefits[lang].map((b, i) => (
              <div key={i} className="pv-benefit-pill">
                <div className="pv-benefit-dot" />
                <span className="pv-benefit-text">{b}</span>
              </div>
            ))}
          </div>

          <Divider icon="📜" />

          {/* Full text */}
          <p className="pv-section-label">Sacred text</p>
          <h2 className="pv-section-title">Full text</h2>
          <div className="pv-text-block">
            <p className="pv-text-body">
              {showMore ? text : previewText}
            </p>
            <button
              className="pv-read-more"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less ↑" : "Read more ↓"}
            </button>
          </div>

          {/* Importance */}
          <div className="pv-importance">
            <div className="pv-importance-icon">🌟</div>
            <div>
              <p className="pv-importance-title">Why this puja is important</p>
              <p className="pv-importance-body">
                Performing this puja regularly brings positivity, spiritual growth,
                and harmony in life. It strengthens belief and removes obstacles
                from your path.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function Divider({ icon }) {
  return (
    <div className="pv-divider">
      <div className="pv-divider-line" />
      <span className="pv-divider-icon">{icon}</span>
      <div className="pv-divider-line" />
    </div>
  );
}

const styles = {
  notFound: {
    textAlign: "center",
    marginTop: "5rem",
    color: "#7b1e1e",
    fontFamily: "'Crimson Pro', Georgia, serif",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap');

  .pv-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 5rem;
    background: #fdf8f2;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
  }

  /* Hero */
  .pv-hero {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 2.5rem;
    box-shadow: 0 8px 40px rgba(123, 30, 30, 0.18);
  }

  .pv-hero-img {
    width: 100%;
    height: 380px;
    object-fit: cover;
    display: block;
    filter: brightness(0.78);
  }

  .pv-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(44,26,14,0.88) 0%, rgba(44,26,14,0.05) 60%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2.5rem;
  }

  .pv-hero-title {
    font-family: 'Tiro Devanagari Sanskrit', serif;
    font-size: 2.4rem;
    color: #fff;
    line-height: 1.2;
    margin-bottom: .3rem;
    text-shadow: 0 2px 16px rgba(0,0,0,0.5);
  }

  .pv-hero-sub {
    font-size: .8rem;
    color: rgba(255,255,255,0.72);
    letter-spacing: .1em;
    text-transform: uppercase;
    margin-bottom: .5rem;
  }

  .pv-lang-btn {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.4);
    color: #fff;
    padding: 6px 18px;
    border-radius: 99px;
    font-size: .8rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .pv-lang-btn:hover {
    background: rgba(255,255,255,0.28);
  }

  /* Divider */
  .pv-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2.25rem 0;
  }

  .pv-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, #e0b882, transparent);
  }

  .pv-divider-icon {
    font-size: 1.3rem;
    color: #c4813a;
    flex-shrink: 0;
  }

  /* Section labels */
  .pv-section-label {
    font-size: .7rem;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #c4813a;
    margin-bottom: .5rem;
  }

  .pv-section-title {
    font-family: 'Crimson Pro', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #7b1e1e;
    margin-bottom: 1.1rem;
  }

  /* Description */
  .pv-desc-block {
    background: #fff;
    border: 0.5px solid #e8d5b7;
    border-left: 4px solid #e65c00;
    border-radius: 0 16px 16px 0;
    padding: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .pv-desc-text {
    font-family: 'Crimson Pro', serif;
    font-size: 1.12rem;
    line-height: 1.9;
    color: #4a3520;
    font-style: italic;
  }

  /* Benefits */
  .pv-benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: .75rem;
    margin-bottom: 1.5rem;
  }

  .pv-benefit-pill {
    background: #fdf3e3;
    border: 0.5px solid #e0b882;
    border-radius: 12px;
    padding: .85rem 1rem;
    display: flex;
    align-items: flex-start;
    gap: .65rem;
  }

  .pv-benefit-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e65c00;
    flex-shrink: 0;
    margin-top: .35rem;
  }

  .pv-benefit-text {
    font-size: .88rem;
    color: #5a3a10;
    line-height: 1.55;
  }

  /* Full text */
  .pv-text-block {
    background: #fdf0f0;
    border: 0.5px solid #e8c4c4;
    border-radius: 16px;
    padding: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .pv-text-body {
    font-family: 'Crimson Pro', serif;
    font-size: 1.08rem;
    line-height: 2;
    color: #4a1c1c;
    white-space: pre-line;
  }

  .pv-read-more {
    margin-top: 1.1rem;
    background: transparent;
    border: 1px solid #7b1e1e;
    color: #7b1e1e;
    padding: 7px 22px;
    border-radius: 99px;
    font-size: .85rem;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
  }

  .pv-read-more:hover {
    background: #7b1e1e;
    color: #fff;
  }

  /* Importance */
  .pv-importance {
    background: linear-gradient(135deg, #fffbe6, #fff3cd);
    border: 0.5px solid #e8d08a;
    border-radius: 16px;
    padding: 1.75rem;
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
  }

  .pv-importance-icon {
    font-size: 2rem;
    flex-shrink: 0;
    line-height: 1;
  }

  .pv-importance-title {
    font-size: 1rem;
    font-weight: 500;
    color: #7a5800;
    margin-bottom: .4rem;
  }

  .pv-importance-body {
    font-size: .92rem;
    color: #8a6a00;
    line-height: 1.75;
  }

  @media (max-width: 600px) {
    .pv-hero-img { height: 260px; }
    .pv-hero-title { font-size: 1.6rem; }
    .pv-benefits-grid { grid-template-columns: 1fr; }
  }
`;

export default PujaViewer;