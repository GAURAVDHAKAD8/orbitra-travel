import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Plane, Sparkles, Upload, Map, Share2, Globe } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
];

const FEATURES = [
  {
    icon: Upload,
    title: "Upload Any Document",
    desc: "Drop your flight tickets, hotel bookings, or travel PDFs. We handle PDFs and images both.",
    color: "#2563eb",
    light: "#eff6ff",
  },
  {
    icon: Sparkles,
    title: "AI Reads Everything",
    desc: "Gemini AI extracts all the details — flight numbers, dates, hotel names, PNRs — automatically.",
    color: "#7c3aed",
    light: "#f5f3ff",
  },
  {
    icon: Map,
    title: "Itinerary Generated",
    desc: "A beautiful day-by-day travel plan is created with activities, timings and local tips.",
    color: "#ea580c",
    light: "#fff7ed",
  },
  {
    icon: Share2,
    title: "Share With Anyone",
    desc: "Share your itinerary with a single link. No login needed for the recipient.",
    color: "#059669",
    light: "#ecfdf5",
  },
];

const STATS = [
  { value: "10s", label: "Avg. generation time" },
  { value: "AI", label: "Powered by Gemini" },
  { value: "100%", label: "Free to use" },
  { value: "∞", label: "Trips you can plan" },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f9fafb", color: "#111827", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Plane style={{ color: "#2563eb", width: 22, height: 22 }} />
          <span style={{ fontSize: 20, fontWeight: 800, color: "#1e40af", letterSpacing: "-0.02em" }}>Orbitra</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {user ? (
            <Link to="/dashboard" style={{ background: "#2563eb", color: "white", padding: "9px 22px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/login" style={{ color: "#6b7280", padding: "9px 18px", fontSize: 14, textDecoration: "none", fontWeight: 500 }}>Sign In</Link>
              <Link to="/register" style={{ background: "#2563eb", color: "white", padding: "9px 22px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 100, paddingBottom: 60, paddingLeft: 24, paddingRight: 24, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 99, padding: "6px 16px", marginBottom: 24 }}>
            <Sparkles style={{ width: 14, height: 14, color: "#2563eb" }} />
            <span style={{ fontSize: 13, color: "#2563eb", fontWeight: 600, letterSpacing: "0.04em" }}>AI-POWERED TRAVEL PLANNING</span>
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 22, letterSpacing: "-0.03em", color: "#111827" }}>
            Your Bookings.<br />
            <span style={{ color: "#2563eb" }}>Your Itinerary.</span><br />
            In Seconds.
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Upload any travel document — flight tickets, hotel confirmations, or a photo of your booking. Orbitra's AI builds a complete day-by-day itinerary instantly.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to={user ? "/upload" : "/register"} style={{ background: "#2563eb", color: "white", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Sparkles style={{ width: 18, height: 18 }} /> Plan My Trip Free
            </Link>
            <Link to="/login" style={{ background: "white", color: "#374151", padding: "14px 32px", borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: "none", border: "1px solid #e5e7eb" }}>
              Sign In
            </Link>
          </div>
        </div>

        {/* PHOTO COLLAGE */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gridTemplateRows: "220px 220px", gap: 10, borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
          <div style={{ gridRow: "1 / 3", position: "relative", overflow: "hidden" }}>
            <img src={HERO_IMAGES[0]} alt="travel" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "10px 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <p style={{ fontSize: 11, color: "#2563eb", fontWeight: 700, margin: "0 0 3px", letterSpacing: "0.05em" }}>✨ AI GENERATED</p>
              <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#111827" }}>Delhi, India — 5 Days</p>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <img src={HERO_IMAGES[1]} alt="travel" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ overflow: "hidden" }}>
            <img src={HERO_IMAGES[2]} alt="travel" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ overflow: "hidden" }}>
            <img src={HERO_IMAGES[3]} alt="travel" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={HERO_IMAGES[4]} alt="travel" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(37,99,235,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <Globe style={{ width: 32, height: 32, color: "white", margin: "0 auto 8px" }} />
                <p style={{ fontSize: 13, color: "white", fontWeight: 600, margin: 0 }}>Any destination</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "white", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "40px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: 36, fontWeight: 800, color: "#2563eb", margin: "0 0 6px" }}>{s.value}</p>
              <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.15em", color: "#2563eb", fontWeight: 700, marginBottom: 12 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, margin: 0, color: "#111827", letterSpacing: "-0.02em" }}>
            From booking to itinerary<br />in 3 simple steps
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: f.light, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <f.icon style={{ width: 22, height: 22, color: f.color }} />
              </div>
              <div style={{ fontSize: 11, color: f.color, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>STEP {i + 1}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#111827" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS STRIP */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.15em", color: "#2563eb", fontWeight: 700, marginBottom: 12 }}>DESTINATIONS</p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, margin: 0, color: "#111827", letterSpacing: "-0.02em" }}>
            Plan trips to anywhere<br />in the world
          </h2>
        </div>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "none" }}>
          {[
            { img: HERO_IMAGES[0], name: "New Delhi", country: "India" },
            { img: HERO_IMAGES[1], name: "Swiss Alps", country: "Switzerland" },
            { img: HERO_IMAGES[2], name: "Forest Trails", country: "Canada" },
            { img: HERO_IMAGES[3], name: "Night City", country: "Japan" },
            { img: HERO_IMAGES[4], name: "Green Hills", country: "New Zealand" },
            { img: HERO_IMAGES[5], name: "Coastline", country: "Portugal" },
          ].map((place, i) => (
            <div key={i} style={{ minWidth: 190, borderRadius: 14, overflow: "hidden", position: "relative", flexShrink: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <img src={place.img} alt={place.name} style={{ width: "100%", height: 250, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", padding: "30px 14px 14px" }}>
                <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 2px", color: "white" }}>{place.name}</p>
                <p style={{ fontSize: 12, color: "#93c5fd", margin: 0 }}>{place.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 100px", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 24, padding: "56px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ width: 56, height: 56, background: "#eff6ff", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Plane style={{ width: 28, height: 28, color: "#2563eb" }} />
          </div>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, marginBottom: 14, color: "#111827", letterSpacing: "-0.02em" }}>
            Ready to plan your<br />next adventure?
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>
            Upload your travel documents and get a full AI itinerary in under 30 seconds. Completely free.
          </p>
          <Link to={user ? "/upload" : "/register"} style={{ background: "#2563eb", color: "white", padding: "15px 36px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Sparkles style={{ width: 18, height: 18 }} /> Start Planning Free
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e7eb", background: "white", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Plane style={{ color: "#2563eb", width: 16, height: 16 }} />
          <span style={{ fontSize: 15, fontWeight: 800, color: "#1e40af" }}>Orbitra</span>
        </div>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>AI-Powered Travel Itinerary Generator</p>
      </footer>
    </div>
  );
}
