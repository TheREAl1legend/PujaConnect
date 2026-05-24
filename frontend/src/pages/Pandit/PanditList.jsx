import { useEffect, useState, useCallback } from "react";
import { getAllPandits, getPanditByCity } from "../../api/panditApi";
import { useLocation, useNavigate } from "react-router-dom";

function PanditList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pandits, setPandits] = useState([]);
  const [filteredPandits, setFilteredPandits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const city = query.get("city");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        setLoading(true);
        const res = city
          ? await getPanditByCity(city, page, 10)
          : await getAllPandits(page, 10);
        let data = res.data.data || [];

        // If city filter returns nothing, fall back to 4 random pandits from all pandits
        if (data.length === 0 && city) {
          const fallback = await getAllPandits(1, 50);
          const all = fallback.data.data || [];
          data = [...all].sort(() => Math.random() - 0.5).slice(0, 4).map(p => ({ ...p, _cityFallback: true }));
          setTotalPages(1);
        } else {
          setTotalPages(res.data.totalPages || 1);
        }

        setPandits(data);
        setFilteredPandits(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPandits();
  }, [city, page]);

  // Filter by services; fall back to 4 random pandits when nothing matches
  useEffect(() => {
    if (!search.trim()) {
      setFilteredPandits(pandits);
      setIsShowingSuggestions(false);
      return;
    }

    const filtered = (pandits || []).filter((p) =>
      p.services?.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      )
    );

    if (filtered.length === 0 && pandits.length > 0) {
      const shuffled = [...pandits].sort(() => Math.random() - 0.5);
      setFilteredPandits(shuffled.slice(0, 4));
      setIsShowingSuggestions(true);
    } else {
      setFilteredPandits(filtered);
      setIsShowingSuggestions(false);
    }
  }, [search, pandits]);

  const handlePageChange = useCallback(
    (next) => {
      setPage(next);
      setSearch("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  return (
    <div
      className="min-vh-100"
      style={{
        marginTop: "70px",
        background: "linear-gradient(135deg, #f0fbfd, #d9f3f7)",
      }}
    >
      <div className="container py-5">

        {/* Hero */}
        <div
          className="rounded-4 p-4 p-lg-5 mb-5"
          style={{
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 30px 80px rgba(30, 70, 100, 0.12)",
          }}
        >
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark rounded-pill mb-3">
                Verified Pandit Network
              </span>
              <h1 className="display-6 fw-bold mb-3">
                Book trusted pandits for puja, marriage, havan and ceremonies.
              </h1>
              <p className="text-muted mb-4">
                Find verified pandits with clear pricing, service details and
                ratings. Search by service and compare the best profiles for
                your event.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-white text-success border px-3 py-2">
                  500+ Verified Experts
                </span>
                <span className="badge bg-white text-primary border px-3 py-2">
                  Instant Booking
                </span>
                <span className="badge bg-white text-warning border px-3 py-2">
                  Ceremony Ready
                </span>
              </div>
            </div>
            <div className="col-lg-5 text-lg-end">
              <div
                className="rounded-4 overflow-hidden shadow-sm"
                style={{ maxWidth: "360px", margin: "0 auto" }}
              >
                <img
                  src="https://thumbs.dreamstime.com/z/pandit-vector-illustration-india-indian-havan-hindu-hindi-worship-priest-sadhu-cartoon-character-pandit-ji-cartoon-character-134357495.jpg?w=768"
                  alt="pandit booking"
                  className="img-fluid"
                  style={{ height: "280px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search bar + count */}
        <div className="row align-items-center mb-4">
          <div className="col-md-8">
            <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border border-white bg-white">
              <span
                className="input-group-text bg-white border-0 pe-3"
                style={{ fontSize: "1.1rem" }}
              >
                🔍
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search by service (e.g. Marriage, Puja...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ minHeight: "55px" }}
              />
              {search && (
                <button
                  className="btn btn-link border-0 text-muted pe-3"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <span className="badge bg-light text-dark shadow-sm px-4 py-2">
              {isShowingSuggestions
                ? "Showing suggestions"
                : `${filteredPandits.length} available${city ? ` in ${city}` : ""}`}
            </span>
          </div>
        </div>

        {/* City fallback notice */}
        {!loading && !search && city && pandits.length > 0 && pandits.length <= 4 &&
          pandits.every(p => p._cityFallback) && (
          <div
            className="alert d-flex align-items-center gap-2 mb-4 rounded-3"
            style={{ background: "#fff7e6", border: "1px solid #ffd591", color: "#874d00" }}
          >
            <span style={{ fontSize: "1.2rem" }}>📍</span>
            <span>
              No pandits found in <strong>{city}</strong>. Showing available pandits from nearby areas.
            </span>
          </div>
        )}

        {/* Search suggestion notice */}
        {isShowingSuggestions && (
          <div
            className="alert d-flex align-items-center gap-2 mb-4 rounded-3"
            style={{
              background: "#fffbe6",
              border: "1px solid #ffe58f",
              color: "#7d6100",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>🔎</span>
            <span>
              No pandits found for <strong>"{search}"</strong>. Here are some
              pandits you might like.
            </span>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-3">Finding pandits for you…</p>
          </div>

        ) : filteredPandits.length === 0 ? (
          /* Empty state — only shown when pandits array itself is empty */
          <div className="text-center py-5">
            <div style={{ fontSize: "3rem" }}>🙏</div>
            <h5 className="text-muted mt-3">No pandits available yet</h5>
          </div>

        ) : (
          /* Cards */
          <div className="row g-4">
            {filteredPandits.map((p) => (
              <div className="col-lg-4 col-md-6" key={p._id}>
                <PanditCard pandit={p} onViewDetails={() => navigate(`/pandits/${p._id}`)} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination — hidden during search so page context stays clear */}
        {!search && !loading && totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
            <button
              className="btn btn-outline-primary rounded-pill px-4"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              ← Prev
            </button>

            <span className="fw-semibold text-muted">
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary rounded-pill px-4"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Pandit card extracted for clarity ─────────────────────────────────── */
function PanditCard({ pandit: p, onViewDetails }) {
  return (
    <div
      className="card h-100 border-0 rounded-4"
      style={{
        background: "#ffffff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
      }}
    >
      <img
        src={
          p.profileImage ||
          "https://cdn.vectorstock.com/i/preview-1x/84/05/indian-pandit-cartoon-vector-35888405.jpg"
        }
        alt={p.userId?.name || "Pandit"}
        className="card-img-top"
        style={{ height: "220px", objectFit: "cover", objectPosition: "top" }}
      />

      <div className="card-body text-center d-flex flex-column">
        <h5 className="fw-semibold mb-1">{p.userId?.name || "Pandit"}</h5>
        <p className="text-muted small mb-2">{p.experience} experience</p>

        {/* Service badges */}
        <div className="mb-3">
          {p.services?.slice(0, 4).map((s, idx) => (
            <span
              key={idx}
              className="badge bg-primary-subtle text-primary border me-1 mb-1"
            >
              {s}
            </span>
          ))}
          {p.services?.length > 4 && (
            <span className="badge bg-light text-muted border">
              +{p.services.length - 4} more
            </span>
          )}
        </div>

        <p className="fw-bold text-success fs-5 mb-3">₹{p.price}</p>

        <button
          className="btn w-100 rounded-pill fw-semibold mt-auto"
          onClick={onViewDetails}
          style={{
            background: "linear-gradient(135deg, #87dfe9, #5ac8d7)",
            border: "none",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #5ac8d7, #3bb4c7)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #87dfe9, #5ac8d7)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PanditList;