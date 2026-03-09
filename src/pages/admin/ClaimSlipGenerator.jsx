import { useState, useEffect, useRef } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const API_BASE    = "http://localhost:8080";  // change to prod URL when deploying
const CLAIM_BASE  = "https://wembleywonders.org/claim/";
const LATEST_URL  = `${API_BASE}/api/performances/latest`;

// ─── Contribution type labels ─────────────────────────────────────────────────
const CONTRIBUTION_LABELS = {
  ORIGINATED:      "Origin Keeper",
  DEVELOPED:       "Developer",
  NAMED:           "Namer",
  PARTICIPATED:    "Participant",
  FACILITATED:     "Facilitator",
  PERFORMED:       "Performer",
  CONTEXTUALISED:  "Contextualiser",
  SOURCE_CREDITED: "Source",
};
const CAPTURE_LABELS = {
  HALF_TERM:    "Half Term Session",
  COACH_TRIP:   "Coach Trip",
  LIVE_EVENT:   "Live Event",
  WORKSHOP:     "Workshop",
  WEEKENDER:    "Weekender",
  PRODUCTION:   "Production",
  RADIO_SESSION:"Radio Session",
  SPONTANEOUS:  "Spontaneous",
  DIGITAL:      "Digital",
};

const QR = (text, size = 120) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&ecc=M&margin=1`;

// ─── Single Slip ──────────────────────────────────────────────────────────────
function ClaimSlip({ slip, index, claimBase }) {
  const url   = `${claimBase}${slip.claimToken}`;
  const label = CONTRIBUTION_LABELS[slip.contributionType] || slip.contributionType || "Contributor";
  const ctx   = CAPTURE_LABELS[slip.captureContext]   || slip.captureContext   || "";
  const expiry = slip.expiresAt
    ? new Date(slip.expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "90 days";

  return (
    <div className="slip" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="slip-bar" />
      <div className="slip-header">
        <div className="slip-brand">
          <span className="brand-ww">WW</span>
          <span className="brand-text">Wembley Wonders</span>
        </div>
        <div className="slip-badge">{label}</div>
      </div>
      <div className="slip-body">
        <div className="slip-text">
          <div className="slip-label">Creative Credit</div>
          <div className="slip-title">{slip.repertoireTitle || "—"}</div>
          {slip.eventName && (
            <div className="slip-event"><span className="at">@</span> {slip.eventName}</div>
          )}
          {ctx && <div className="slip-ctx">{ctx}</div>}
          <div className="slip-creator"><span className="diamond">◈</span>{slip.creatorName}</div>
          <div className="slip-cta">Scan to claim your credit &amp; revenue share</div>
          <div className="slip-expiry">Valid until {expiry}</div>
        </div>
        <div className="slip-qr-col">
          <div className="qr-frame">
            <img src={QR(url, 120)} alt={`QR for ${slip.creatorName}`} className="qr-img" />
          </div>
          <div className="qr-cap">
            wembleywonders.org<br />
            <span className="qr-short">/claim/…{slip.claimToken.slice(-6)}</span>
          </div>
        </div>
      </div>
      <div className="slip-foot">
        <span>Counter-Archive</span>
        <span className="dots">◆ ◆ ◆</span>
        <span>Community Creator Programme</span>
      </div>
    </div>
  );
}

// ─── Status banner ────────────────────────────────────────────────────────────
function Banner({ type, children }) {
  const colors = {
    info:    { bg: "#e8f4f8", border: "#90cce0", text: "#1a4a5e" },
    success: { bg: "#eaf5ec", border: "#7ec99a", text: "#1a4a2a" },
    error:   { bg: "#fef2ef", border: "#f0b4a0", text: "#7a2a1a" },
    loading: { bg: "#f5f2ea", border: "#d4c890", text: "#4a4010" },
  };
  const c = colors[type] || colors.info;
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4,
      padding: "10px 14px", color: c.text,
      fontFamily: "'DM Mono', monospace", fontSize: 12, marginBottom: 16
    }}>
      {children}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function ClaimSlipGenerator() {
  const [slips,      setSlips]      = useState([]);
  const [perfMeta,   setPerfMeta]   = useState(null);   // event name, date, etc.
  const [claimBase,  setClaimBase]  = useState(CLAIM_BASE);
  const [token,      setToken]      = useState("");      // JWT for API calls
  const [status,     setStatus]     = useState(null);   // { type, msg }
  const [loading,    setLoading]    = useState(false);
  const [view,       setView]       = useState("slips"); // slips | settings
  const [jsonMode,   setJsonMode]   = useState(false);
  const [jsonInput,  setJsonInput]  = useState("");
  const [jsonError,  setJsonError]  = useState("");

  // ── Auto-fetch on mount if token is stored ──
  useEffect(() => {
    const saved = sessionStorage.getItem("ww_admin_token");
    if (saved) { setToken(saved); fetchLatest(saved); }
  }, []);

  const fetchLatest = async (jwt) => {
    setLoading(true);
    setStatus({ type: "loading", msg: "Fetching latest performance…" });
    try {
      const res = await fetch(LATEST_URL, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      if (res.status === 404) {
        setStatus({ type: "info", msg: "No performances logged yet. Log one first via the API." });
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.found) {
        setStatus({ type: "info", msg: "No performances found." });
        setLoading(false);
        return;
      }
      loadFromApiResponse(data);
      setStatus({
        type: "success",
        msg: `Loaded performance #${data.performanceId} — ${data.claimTokens?.length || 0} slip(s)`
      });
    } catch (e) {
      setStatus({ type: "error", msg: `Could not fetch: ${e.message}. Check your token or API URL.` });
    }
    setLoading(false);
  };

  const loadFromApiResponse = (data) => {
    setPerfMeta({
      performanceId:   data.performanceId,
      eventName:       data.eventName,
      eventType:       data.eventType,
      venueName:       data.venueName,
      venueLocation:   data.venueLocation,
      performanceDate: data.performanceDate,
      loggedAt:        data.loggedAt,
      claimedCount:    data.claimTokensClaimed || 0,
      totalCount:      data.claimTokensTotal   || (data.claimTokens?.length || 0),
    });
    // Enrich each token with performance-level fields if missing
    const enriched = (data.claimTokens || []).map(t => ({
      ...t,
      eventName:   t.eventName   || data.eventName   || "",
      captureContext: t.captureContext || data.captureContext || "",
    }));
    // Filter to unclaimed only for printing (or show all)
    setSlips(enriched);
    setView("slips");
  };

  const handleJsonPaste = () => {
    try {
      const data = JSON.parse(jsonInput);
      loadFromApiResponse(data);
      setJsonError("");
      setJsonMode(false);
    } catch (e) {
      setJsonError(e.message);
    }
  };

  const handleTokenSave = (t) => {
    setToken(t);
    sessionStorage.setItem("ww_admin_token", t);
  };

  const unclaimedSlips = slips.filter(s => !s.isClaimed);
  const printSlips = view === "slips" ? unclaimedSlips : slips;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Literata:ital,wght@0,400;0,600;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --teal:#0a4a45;--teal-m:#0d6b62;--teal-l:#1a9688;
          --gold:#e8b84b;--gold-l:#f5d07a;
          --cream:#faf7f2;--warm:#f0ebe3;--rust:#c4522a;
          --ink:#1a1208;--mid:#5a5040;--r:4px;
        }
        body{background:var(--warm);font-family:'Literata',Georgia,serif;color:var(--ink);min-height:100vh}

        /* ── Shell ── */
        .shell{max-width:960px;margin:0 auto;padding:24px 20px 60px}
        .hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;padding-bottom:18px;border-bottom:2px solid var(--teal)}
        .wordmark{display:flex;align-items:center;gap:12px}
        .ww-badge{width:44px;height:44px;background:var(--teal);color:var(--gold);font-family:'Syne',sans-serif;font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;border-radius:var(--r);letter-spacing:-1px}
        .ww-title{font-family:'Syne',sans-serif;font-weight:700;font-size:18px;color:var(--teal);line-height:1.2}
        .ww-sub{font-size:12px;color:var(--mid);font-family:'DM Mono',monospace;margin-top:2px}
        .hdr-actions{display:flex;gap:8px}

        /* ── Buttons ── */
        .btn{font-family:'Syne',sans-serif;font-weight:600;font-size:13px;padding:9px 18px;border-radius:var(--r);border:none;cursor:pointer;transition:all .15s;letter-spacing:.02em}
        .btn-ghost{background:transparent;color:var(--teal);border:1.5px solid var(--teal)}
        .btn-ghost:hover{background:var(--teal);color:var(--cream)}
        .btn-primary{background:var(--teal);color:var(--gold)}
        .btn-primary:hover{background:var(--teal-m)}
        .btn-gold{background:var(--gold);color:var(--teal)}
        .btn-gold:hover{background:var(--gold-l)}
        .btn:disabled{opacity:.5;cursor:not-allowed}

        /* ── Toolbar ── */
        .toolbar{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap}
        .toolbar-meta{flex:1;font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:var(--teal)}
        .toolbar-sub{font-family:'DM Mono',monospace;font-size:11px;color:var(--mid);font-weight:400;margin-left:8px}
        .pill{display:inline-flex;align-items:center;gap:5px;background:var(--teal);color:var(--gold-l);font-family:'DM Mono',monospace;font-size:11px;padding:3px 10px;border-radius:20px}
        .pill-warn{background:#f5e8cc;color:#7a5010}

        /* ── Settings panel ── */
        .settings{background:white;border:1px solid #e0d8cc;border-radius:8px;padding:24px;margin-bottom:24px}
        .field-label{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--mid);margin-bottom:6px}
        .field-input{width:100%;padding:10px 12px;border:1.5px solid #d0c8bc;border-radius:var(--r);font-family:'DM Mono',monospace;font-size:13px;color:var(--ink);background:var(--cream);outline:none;transition:border-color .15s;margin-bottom:14px}
        .field-input:focus{border-color:var(--teal-l)}
        .field-textarea{min-height:200px;resize:vertical;line-height:1.5}
        .settings-row{display:flex;gap:10px;align-items:center;margin-top:4px}
        .hint{font-family:'DM Mono',monospace;font-size:11px;color:var(--mid);margin-top:-10px;margin-bottom:12px}

        /* ── Slips grid ── */
        @keyframes slipIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}
        .empty{text-align:center;padding:60px 20px;color:var(--mid);font-family:'Syne',sans-serif}

        /* ── Slip card ── */
        .slip{background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(10,74,69,.10),0 0 0 1px rgba(10,74,69,.08);display:flex;flex-direction:column;animation:slipIn .4s ease both;transition:box-shadow .2s}
        .slip:hover{box-shadow:0 6px 24px rgba(10,74,69,.16),0 0 0 1px rgba(10,74,69,.12)}
        .slip-bar{height:5px;background:linear-gradient(90deg,var(--teal) 0%,var(--teal-l) 60%,var(--gold) 100%)}
        .slip-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px 10px;background:var(--teal);color:white}
        .slip-brand{display:flex;align-items:center;gap:8px}
        .brand-ww{width:28px;height:28px;background:var(--gold);color:var(--teal);font-family:'Syne',sans-serif;font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center;border-radius:3px;letter-spacing:-1px;flex-shrink:0}
        .brand-text{font-family:'Syne',sans-serif;font-weight:600;font-size:13px;color:rgba(255,255,255,.92);letter-spacing:.02em}
        .slip-badge{font-family:'DM Mono',monospace;font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:var(--gold);background:rgba(232,184,75,.15);border:1px solid rgba(232,184,75,.35);padding:3px 8px;border-radius:3px}
        .slip-body{display:flex;gap:16px;padding:16px;flex:1;align-items:flex-start}
        .slip-text{flex:1;min-width:0}
        .slip-label{font-family:'DM Mono',monospace;font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--teal-l);margin-bottom:4px}
        .slip-title{font-family:'Syne',sans-serif;font-weight:700;font-size:17px;color:var(--ink);line-height:1.2;margin-bottom:8px;word-break:break-word}
        .slip-event{font-size:12px;color:var(--mid);margin-bottom:3px;font-style:italic}
        .at{color:var(--teal-l);font-style:normal;font-weight:bold}
        .slip-ctx{font-family:'DM Mono',monospace;font-size:10px;color:var(--mid);margin-bottom:10px}
        .slip-creator{display:flex;align-items:center;gap:6px;font-family:'Syne',sans-serif;font-weight:600;font-size:14px;color:var(--teal);margin-bottom:10px}
        .diamond{color:var(--gold);font-size:11px}
        .slip-cta{font-size:11px;color:var(--ink);line-height:1.4;margin-bottom:5px}
        .slip-expiry{font-family:'DM Mono',monospace;font-size:10px;color:#aaa}
        .slip-qr-col{display:flex;flex-direction:column;align-items:center;gap:6px;flex-shrink:0}
        .qr-frame{width:86px;height:86px;border:2px solid var(--teal);border-radius:4px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:white}
        .qr-img{width:82px;height:82px;display:block}
        .qr-cap{font-family:'DM Mono',monospace;font-size:8.5px;color:var(--mid);text-align:center;line-height:1.5}
        .qr-short{color:var(--teal-l)}
        .slip-foot{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:var(--warm);border-top:1px solid #e8e0d4;font-family:'DM Mono',monospace;font-size:9px;color:var(--mid);letter-spacing:.05em;text-transform:uppercase}
        .dots{color:var(--gold);letter-spacing:4px}

        /* ── Print ── */
        @media print {
          body{background:white}
          .shell{padding:0;max-width:none}
          .hdr,.toolbar,.settings,.no-print{display:none!important}
          .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:8mm;page-break-inside:avoid}
          .slip{box-shadow:none!important;border:1px solid #ccc!important;animation:none!important;page-break-inside:avoid;break-inside:avoid}
          @page{size:A4;margin:0}
        }
      `}</style>

      <div className="shell">
        {/* Header */}
        <div className="hdr">
          <div className="wordmark">
            <div className="ww-badge">WW</div>
            <div>
              <div className="ww-title">Claim Slip Generator</div>
              <div className="ww-sub">Counter-Archive · Creator Credit System</div>
            </div>
          </div>
          <div className="hdr-actions">
            <button className="btn btn-ghost" onClick={() => setView(view === "settings" ? "slips" : "settings")}>
              {view === "settings" ? "← Slips" : "⚙ Settings"}
            </button>
            {slips.length > 0 && (
              <button className="btn btn-gold" onClick={() => window.print()}>
                ⎙ Print
              </button>
            )}
          </div>
        </div>

        {/* Settings panel */}
        {view === "settings" && (
          <div className="settings no-print">
            <div className="field-label">Admin JWT Token</div>
            <input
              className="field-input"
              type="password"
              value={token}
              placeholder="Paste your Bearer token"
              onChange={e => setToken(e.target.value)}
            />
            <div className="hint">Saved to sessionStorage. Cleared when you close the tab.</div>

            <div className="field-label">Claim Base URL</div>
            <input
              className="field-input"
              value={claimBase}
              onChange={e => setClaimBase(e.target.value)}
              placeholder="https://wembleywonders.org/claim/"
            />

            <div className="settings-row">
              <button
                className="btn btn-primary"
                disabled={!token || loading}
                onClick={() => { handleTokenSave(token); fetchLatest(token); }}
              >
                {loading ? "Fetching…" : "Save & Fetch Latest"}
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setJsonMode(!jsonMode)}
              >
                {jsonMode ? "Hide JSON" : "Paste JSON instead"}
              </button>
            </div>

            {jsonMode && (
              <div style={{ marginTop: 20 }}>
                <div className="field-label">Paste /api/performances/log or /latest response</div>
                {jsonError && <Banner type="error">⚠ {jsonError}</Banner>}
                <textarea
                  className="field-input field-textarea"
                  value={jsonInput}
                  onChange={e => setJsonInput(e.target.value)}
                  spellCheck={false}
                  placeholder='{"eventName":"...","claimTokens":[...]}'
                />
                <button className="btn btn-primary" onClick={handleJsonPaste}>
                  Load Slips
                </button>
              </div>
            )}
          </div>
        )}

        {/* Status banner */}
        {status && view !== "settings" && (
          <div className="no-print">
            <Banner type={status.type}>{status.msg}</Banner>
          </div>
        )}

        {/* Toolbar */}
        {slips.length > 0 && view !== "settings" && (
          <div className="toolbar no-print">
            <div className="toolbar-meta">
              {perfMeta?.eventName || "Performance"}
              <span className="toolbar-sub">
                {perfMeta?.performanceDate}
                {perfMeta?.venueName ? ` · ${perfMeta.venueName}` : ""}
              </span>
            </div>
            <span className={`pill ${unclaimedSlips.length === 0 ? "pill-warn" : ""}`}>
              {unclaimedSlips.length} unclaimed
            </span>
            <span className="pill" style={{ background: "#eee", color: "#555" }}>
              {slips.length} total
            </span>
            <button
              className="btn btn-ghost"
              disabled={loading}
              onClick={() => token ? fetchLatest(token) : setView("settings")}
            >
              ↻ Refresh
            </button>
            <button
              className="btn btn-gold"
              onClick={() => window.print()}
            >
              ⎙ Print {unclaimedSlips.length} Slip{unclaimedSlips.length !== 1 ? "s" : ""}
            </button>
          </div>
        )}

        {/* Slip grid — prints unclaimed only */}
        {view !== "settings" && (
          <>
            {slips.length === 0 && !loading && (
              <div className="empty">
                <div style={{ fontSize: 40, marginBottom: 12 }}>◈</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>No slips loaded</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>
                  Go to Settings, paste your token, and hit "Fetch Latest"
                </div>
                <div style={{ marginTop: 16 }}>
                  <button className="btn btn-primary" onClick={() => setView("settings")}>
                    ⚙ Open Settings
                  </button>
                </div>
              </div>
            )}
            <div className="grid">
              {unclaimedSlips.map((s, i) => (
                <ClaimSlip key={s.authorId ?? i} slip={s} index={i} claimBase={claimBase} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
