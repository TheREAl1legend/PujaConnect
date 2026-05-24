import { useNavigate } from "react-router-dom";

/**
 * PanditCard — displays a pandit's profile with info and booking CTA.
 *
 * Props:
 *   pandit {object}
 *     id         {string}
 *     name       {string}
 *     tradition  {string}
 *     experience {number}   years
 *     rating     {number}   e.g. 4.9
 *     reviewCount{number}
 *     location   {string}
 *     online     {boolean}
 *     languages  {string[]}
 *     price      {number}   starting price in ₹
 *     specialities {string[]}
 *     verified   {boolean}
 *   onBook {function}  called with pandit.id when Book button clicked
 */
function PanditCard({ pandit, onBook }) {
  const navigate = useNavigate();

  const {
    id,
    name,
    tradition,
    experience,
    rating,
    reviewCount,
    location,
    online,
    languages,
    price,
    specialities = [],
    verified,
  } = pandit;

  const stars = "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

  return (
    <>
      <style>{cardStyles}</style>

      <div className="pc-card">
        {/* Header */}
        <div className="pc-header">
          <div className="pc-avatar" aria-hidden="true">🪔</div>

          <div className="pc-identity">
            <h3 className="pc-name">{name}</h3>
            <p className="pc-sub">
              {tradition} · {experience} yrs experience
            </p>
          </div>

          <div className="pc-badges">
            {verified && (
              <span className="pc-badge pc-badge--verified">✓ Verified</span>
            )}
            {specialities.slice(0, 3).map((s) => (
              <span key={s} className="pc-badge">{s}</span>
            ))}
          </div>
        </div>

        {/* Info rows */}
        <div className="pc-body">
          <InfoRow icon="⭐" label="Rating">
            <span className="pc-stars" aria-label={`${rating} out of 5`}>
              {stars}
            </span>{" "}
            {rating.toFixed(1)}{" "}
            <span className="pc-muted">({reviewCount} pujas)</span>
          </InfoRow>

          <InfoRow icon="📍" label="Location">
            {location}
            {online && <span className="pc-muted"> · Available online</span>}
          </InfoRow>

          <InfoRow icon="🗣" label="Languages">
            {languages.join(", ")}
          </InfoRow>

          <InfoRow icon="₹" label="Starting from">
            ₹{price.toLocaleString("en-IN")}{" "}
            <span className="pc-muted">/ puja</span>
          </InfoRow>
        </div>

        {/* Actions */}
        <div className="pc-footer">
          <button
            className="pc-btn pc-btn--secondary"
            onClick={() => navigate(`/pandit/${id}`)}
          >
            View profile
          </button>
          <button
            className="pc-btn pc-btn--primary"
            onClick={() => onBook?.(id)}
          >
            Book now
          </button>
        </div>
      </div>
    </>
  );
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="pc-row">
      <span className="pc-row-icon" aria-hidden="true">{icon}</span>
      <div>
        <p className="pc-row-label">{label}</p>
        <p className="pc-row-value">{children}</p>
      </div>
    </div>
  );
}

const cardStyles = `
  .pc-card {
    width: 320px;
    border: 0.5px solid #e2e2e0;
    border-radius: 12px;
    overflow: hidden;
    font-family: 'DM Sans', system-ui, sans-serif;
    background: #fff;
  }

  .pc-header {
    background: #f5ede0;
    padding: 1.5rem 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-bottom: 0.5px solid #e2e2e0;
  }

  .pc-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 2px solid #c4813a;
    background: #fdf3e3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  .pc-name {
    font-family: 'Tiro Devanagari Sanskrit', Georgia, serif;
    font-size: 18px;
    font-weight: 400;
    color: #5a2e00;
    margin: 0;
    text-align: center;
  }

  .pc-sub {
    font-size: 12px;
    color: #9a6b3a;
    margin: 2px 0 0;
    text-align: center;
  }

  .pc-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
  }

  .pc-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 99px;
    background: #fdf3e3;
    color: #8b4e14;
    border: 0.5px solid #e0b882;
  }

  .pc-badge--verified {
    background: #eaf3de;
    color: #3b6d11;
    border-color: #97c459;
  }

  .pc-body {
    padding: 0.75rem 1.25rem;
  }

  .pc-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 0.5px solid #ebebeb;
    font-size: 13.5px;
  }

  .pc-row:last-child {
    border-bottom: none;
  }

  .pc-row-icon {
    font-size: 15px;
    margin-top: 1px;
    flex-shrink: 0;
  }

  .pc-row-label {
    font-size: 11px;
    color: #888;
    margin: 0 0 1px;
  }

  .pc-row-value {
    margin: 0;
    font-weight: 500;
    color: #1a1a1a;
  }

  .pc-muted {
    color: #888;
    font-weight: 400;
  }

  .pc-stars {
    color: #c4813a;
    letter-spacing: 1px;
  }

  .pc-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 1rem 1.25rem;
    border-top: 0.5px solid #ebebeb;
  }

  .pc-btn {
    padding: 9px 0;
    border-radius: 8px;
    font-size: 13px;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: background 0.15s, opacity 0.15s;
  }

  .pc-btn--secondary {
    background: transparent;
    border: 0.5px solid #c8c8c4;
    color: #1a1a1a;
  }

  .pc-btn--secondary:hover {
    background: #f5f5f3;
  }

  .pc-btn--primary {
    background: #c4813a;
    color: #fff;
  }

  .pc-btn--primary:hover {
    background: #b07030;
  }
`;

export default PanditCard;