import { useState, useEffect, useCallback, useRef } from "react";
import { X, Plus, Edit2, Trash2, LogOut, Eye, EyeOff, ArrowUpRight, Menu, ChevronLeft, ChevronRight, ExternalLink, Upload, Loader } from "lucide-react";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

// ─── Supabase KV (direct REST — no edge function needed) ─────────────────────

const SUPABASE_URL = `https://${projectId}.supabase.co`;
const TABLE = `kv_store_1edba938`;
const HEADERS = {
  "Content-Type": "application/json",
  "apikey": publicAnonKey,
  "Authorization": `Bearer ${publicAnonKey}`,
};

async function kvGet(key: string): Promise<any> {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/${TABLE}?key=eq.${encodeURIComponent(key)}&select=value`,
    { headers: HEADERS }
  );
  if (!r.ok) return null;
  const rows = await r.json();
  return rows?.[0]?.value ?? null;
}

async function kvSet(key: string, value: any): Promise<void> {
  await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: { ...HEADERS, "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify({ key, value }),
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project { id: string; title: string; category: string; year: string; description: string; imageUrl: string; tags: string[]; featured: boolean; }
interface Experience { id: string; company: string; role: string; period: string; location: string; points: string[]; }
interface Education { id: string; institution: string; degree: string; period: string; location: string; }
interface Achievement { id: string; title: string; year: string; }
interface Skill { id: string; name: string; category: "Soft Skill" | "Hard Skill" | "Tool" | "Language"; }
interface Organization { id: string; name: string; role: string; period: string; location: string; points: string[]; }
interface CVData { experiences: Experience[]; education: Education[]; achievements: Achievement[]; skills: Skill[]; organizations: Organization[]; }
interface Slide { id: string; type: "image" | "pdf"; url: string; caption?: string; }
interface Showcase { id: string; title: string; year: string; description: string; coverImage: string; slides: Slide[]; pdfUrl?: string; }

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_PROJECTS: Project[] = [
  { id: "1", title: "Architectura Annual Report", category: "Print Design", year: "2024", description: "A 120-page annual report designed with strict grid discipline and typographic hierarchy. Printed on uncoated stock.", imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&auto=format", tags: ["Print", "Editorial", "Typography"], featured: true },
  { id: "2", title: "Monolith Brand Identity", category: "Brand Identity", year: "2024", description: "Complete visual identity system for a luxury architecture firm. Mark, wordmark, color system, and motion guidelines.", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&auto=format", tags: ["Branding", "Identity", "Motion"], featured: true },
  { id: "3", title: "Void Exhibition Catalogue", category: "Editorial", year: "2023", description: "Exhibition catalogue for a contemporary art show. 64 pages, bilingual layout, offset-printed with spot UV varnish.", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format", tags: ["Editorial", "Art Direction", "Print"], featured: false },
  { id: "4", title: "Noire Packaging System", category: "Packaging", year: "2023", description: "Packaging system for a high-end skincare brand. Minimalist black-on-black embossing.", imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop&auto=format", tags: ["Packaging", "Luxury", "Print"], featured: true },
  { id: "5", title: "Signal Digital Campaign", category: "Digital", year: "2023", description: "Art direction for a global technology conference. Motion system, digital banners, and environmental graphics.", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&auto=format", tags: ["Digital", "Motion", "Campaign"], featured: false },
  { id: "6", title: "Meridian Typeface", category: "Typography", year: "2022", description: "A display typeface with 3 weights designed for high-contrast editorial use.", imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&auto=format", tags: ["Typography", "Type Design"], featured: false },
];

const SEED_CV: CVData = {
  experiences: [
    { id: "e1", company: "Sekala Industry", role: "Graphic Designer", period: "2025 — Present", location: "Makassar, ID", points: ["Creating product designs based on client requests.", "Creating visual content for social media.", "Collaborating with the team in designing marketing programs."] },
    { id: "e2", company: "Alonica Cafe", role: "Marketing & Branding — Graphic Designer", period: "2024 — 2026", location: "Makassar, ID", points: ["Create designs for branding such as products, menu books, posters, etc.", "Responsible for managing social media in designing and uploading content.", "Analyzing social media performance for evaluation purposes."] },
    { id: "e3", company: "Shoesi Shepatu", role: "Graphic Designer", period: "2023 — Present", location: "Makassar, ID", points: ["Design and create informative content on Instagram related to shoes.", "Designing marketing needs such as posters, banners, etc."] },
    { id: "e4", company: "SN Residence", role: "Manager Marketing", period: "2022 — Present", location: "Makassar, ID", points: ["Coordinate team members and design marketing strategies.", "Create designs for digital and print media for branding and marketing purposes."] },
    { id: "e5", company: "Loyal Line", role: "Graphic Designer", period: "2021 — Present", location: "Makassar, ID", points: ["Create designs for uniform apparel such as t-shirts, varsity jackets, jerseys.", "Create designs for marketing such as brochures, instastory, posters."] },
    { id: "e6", company: "Freelancer", role: "Graphic Designer", period: "2021 — Present", location: "Makassar, ID", points: ["Collaborate and communicate with clients to discuss the design required.", "Create designs for multiple clients across events, social media, and print."] },
  ],
  education: [
    { id: "ed1", institution: "Makassar State University", degree: "Computer Engineering", period: "2023 — Present", location: "Makassar, ID" },
    { id: "ed2", institution: "SMAN 1 Bantaeng", degree: "Science", period: "2020 — 2023", location: "Bantaeng, ID" },
    { id: "ed3", institution: "SMPN 1 Bantaeng", degree: "", period: "2017 — 2020", location: "Bantaeng, ID" },
  ],
  achievements: [
    { id: "a1", title: "3rd place in 4-wheeled robot racing competition by JTIK UNM", year: "2024" },
    { id: "a2", title: "3rd place in photography competition by Dipa University Makassar", year: "2023" },
    { id: "a3", title: "Finalist of short film competition — South Sulawesi Provincial Office of Education and Culture", year: "2022" },
  ],
  skills: [
    { id: "s1", name: "Communication", category: "Soft Skill" }, { id: "s2", name: "Teamwork", category: "Soft Skill" },
    { id: "s3", name: "Time Management", category: "Soft Skill" }, { id: "s4", name: "Leadership", category: "Soft Skill" },
    { id: "s5", name: "Problem Solving", category: "Soft Skill" }, { id: "s6", name: "Critical Thinking", category: "Soft Skill" },
    { id: "s7", name: "Negotiation", category: "Soft Skill" }, { id: "s8", name: "Adobe Photoshop", category: "Tool" },
    { id: "s9", name: "Adobe Illustrator", category: "Tool" }, { id: "s10", name: "Canva", category: "Tool" },
    { id: "s11", name: "CapCut", category: "Tool" }, { id: "s12", name: "Microsoft Office", category: "Tool" },
    { id: "s13", name: "Google Workspace", category: "Tool" }, { id: "s14", name: "Content Planning", category: "Hard Skill" },
    { id: "s15", name: "Digital Marketing", category: "Hard Skill" }, { id: "s16", name: "Social Media Specialist", category: "Hard Skill" },
    { id: "s17", name: "Basic Programming", category: "Hard Skill" }, { id: "s18", name: "Video Editing", category: "Hard Skill" },
    { id: "s19", name: "Indonesia", category: "Language" }, { id: "s20", name: "English", category: "Language" },
  ],
  organizations: [
    { id: "o1", name: "Kejar Mimpi Makassar by CIMB Niaga", role: "Graphic Designer", period: "2024 — Present", location: "Makassar, ID", points: ["Work with the team to find ideas in creating visual design.", "Design content based on the brief given for social media."] },
    { id: "o2", name: "Google Developer Group on Campus UNM", role: "Graphic Designer", period: "2024 — Present", location: "Makassar, ID", points: ["Design content for social media.", "Create uniform designs such as jackets and ID cards."] },
    { id: "o3", name: "Forum Anak Sulawesi Selatan", role: "Volunteer", period: "2024", location: "Makassar, ID", points: ["Creating Instagram filters for events.", "Designing uniforms and ID cards for event organizers."] },
    { id: "o4", name: "Forum Anak Butta Toa", role: "Coordinator of Creative Media Team", period: "2022 — 2023", location: "Bantaeng, ID", points: ["Create event designs such as banners, posters, guidebooks.", "Responsible for developing the organization's social media."] },
    { id: "o5", name: "IRMUS SMAN 1 Bantaeng", role: "Leader of IRMUS SMANSA", period: "2021 — 2023", location: "Makassar, ID", points: ["Responsible for managing the organization during the period.", "Evaluate the performance of the organization's members."] },
  ],
};

const SEED_SHOWCASES: Showcase[] = [
  {
    id: "ps1", title: "Portfolio 2024", year: "2024",
    description: "Kumpulan karya desain grafis tahun 2024 — mencakup brand identity, social media, print collateral, dan desain apparel.",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1100&fit=crop&auto=format",
    slides: [
      { id: "sl1", type: "image", url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=900&fit=crop&auto=format", caption: "Brand Identity" },
      { id: "sl2", type: "image", url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1400&h=900&fit=crop&auto=format", caption: "Editorial Design" },
      { id: "sl3", type: "image", url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1400&h=900&fit=crop&auto=format", caption: "Packaging System" },
    ],
  },
  {
    id: "ps2", title: "Portfolio 2026", year: "2026",
    description: "Karya terbaru tahun 2026 — eksplorasi arah baru dalam digital design, motion, dan content system untuk brand-brand baru.",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=1100&fit=crop&auto=format",
    slides: [
      { id: "sl4", type: "image", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&h=900&fit=crop&auto=format", caption: "Digital Campaign" },
      { id: "sl5", type: "image", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=900&fit=crop&auto=format", caption: "Exhibition Catalogue" },
      { id: "sl6", type: "image", url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&h=900&fit=crop&auto=format", caption: "Typography & Type Design" },
    ],
  },
];

const CATS = ["All", "Print Design", "Brand Identity", "Editorial", "Packaging", "Digital", "Typography"];
const SKILL_CATS = ["Soft Skill", "Hard Skill", "Tool", "Language"] as const;
const PWD = "rois2024";

// ─── Storage Upload ────────────────────────────────────────────────────────────

async function uploadFile(file: File, bucket = "portfolio"): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  // Try PUT first (update), fallback to POST (create)
  for (const method of ["POST", "PUT"] as const) {
    const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
      method,
      headers: {
        "Authorization": `Bearer ${publicAnonKey}`,
        "apikey": publicAnonKey,
        "Content-Type": file.type,
        "x-upsert": "true",
        "cache-control": "3600",
      },
      body: file,
    });
    if (r.ok) return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
    const txt = await r.text();
    // If bucket not found, surface clear error
    if (txt.includes("Bucket not found") || txt.includes("bucket")) {
      throw new Error("BUCKET_NOT_FOUND");
    }
  }
  throw new Error("UPLOAD_FAILED");
}

// ─── Data Hook ────────────────────────────────────────────────────────────────

function useData() {
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [cv, setCV] = useState<CVData>(SEED_CV);
  const [showcases, setShowcases] = useState<Showcase[]>(SEED_SHOWCASES);
  const [heroPhoto, setHeroPhoto] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      kvGet("rois:projects"),
      kvGet("rois:cv"),
      kvGet("rois:showcases"),
      kvGet("rois:hero"),
    ]).then(([p, c, s, h]) => {
      if (Array.isArray(p) && p.length) setProjects(p);
      if (c && typeof c === "object" && Object.keys(c).length) setCV(c);
      if (Array.isArray(s) && s.length) setShowcases(s);
      if (h?.url) setHeroPhoto(h.url);
    }).catch(() => {}).finally(() => setReady(true));
  }, []);

  const saveProjects = (p: Project[]) => { setProjects(p); kvSet("rois:projects", p).catch(() => {}); };
  const saveCV = (c: CVData) => { setCV(c); kvSet("rois:cv", c).catch(() => {}); };
  const saveShowcases = (s: Showcase[]) => { setShowcases(s); kvSet("rois:showcases", s).catch(() => {}); };
  const saveHeroPhoto = (url: string) => { setHeroPhoto(url); kvSet("rois:hero", { url }).catch(() => {}); };

  return { projects, cv, showcases, heroPhoto, ready, saveProjects, saveCV, saveShowcases, saveHeroPhoto };
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

function Grid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <div className="h-full grid grid-cols-12 px-16 max-md:px-6 max-md:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="h-full border-l last:border-r max-md:hidden" style={{ borderColor: "rgba(255,255,255,0.03)" }} />)}
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-full border-l last:border-r hidden max-md:block" style={{ borderColor: "rgba(255,255,255,0.03)" }} />)}
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ["Work", "Showcase", "Resume", "About", "Contact"];
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: scrolled ? "#0e0e0e" : "transparent", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
      <div className="px-16 max-md:px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNav("hero")} className="text-sm font-extrabold tracking-[0.12em] text-white uppercase hover:opacity-70 transition-opacity" style={{ fontFamily: "Syne" }}>ROIS SURYA</button>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => <button key={l} onClick={() => onNav(l.toLowerCase())} className="text-xs font-semibold tracking-[0.1em] uppercase transition-colors" style={{ fontFamily: "Inter", color: active === l.toLowerCase() ? "#fff" : "#8e9192" }}>{l}</button>)}
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0e0e0e] border-t border-white/[0.08] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => <button key={l} onClick={() => { onNav(l.toLowerCase()); setOpen(false); }} className="text-left text-xs font-semibold tracking-[0.1em] uppercase text-[#e5e2e1]" style={{ fontFamily: "Inter" }}>{l}</button>)}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ heroPhoto, onNav }: { heroPhoto: string; onNav: (s: string) => void }) {
  return (
    <section id="hero" className="min-h-screen flex flex-col border-b border-white/[0.08] relative overflow-hidden">
      <div className="flex flex-1 max-md:flex-col">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col justify-end pb-20 pt-32 px-16 max-md:px-6 max-md:pt-24 max-md:pb-10">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-8 text-[#8e9192]" style={{ fontFamily: "Inter" }}>Graphic Designer — Makassar, ID</p>
          <h1 className="text-[clamp(40px,7vw,88px)] font-extrabold leading-[1.0] tracking-[-0.04em] text-white mb-8" style={{ fontFamily: "Syne" }}>
            Rois Surya.
            <br /><span style={{ color: "#3a3939" }}>Visual Language</span>
            <br />for the Bold.
          </h1>
          <p className="max-w-md text-[17px] leading-[1.6] text-[#c4c7c8] mb-10" style={{ fontFamily: "Inter" }}>
            Graphic designer with expertise in brand identity, editorial systems, and print production. Currently studying Computer Engineering at Makassar State University.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => onNav("work")} className="group flex items-center gap-2 bg-white text-[#0e0e0e] px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#c4c7c8] transition-colors" style={{ fontFamily: "Inter" }}>
              View Work <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button onClick={() => onNav("showcase")} className="border border-white/20 text-white px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase hover:border-white/60 transition-colors" style={{ fontFamily: "Inter" }}>
              Portfolio Books
            </button>
          </div>
          {/* Stats inline */}
          <div className="flex gap-10 mt-14 border-t border-white/[0.08] pt-8 flex-wrap">
            {[{ v: "30+", l: "Projects" }, { v: "06", l: "Companies" }, { v: "04+", l: "Years" }, { v: "03", l: "Awards" }].map((s) => (
              <div key={s.l}>
                <p className="text-[28px] font-bold text-white leading-none mb-1" style={{ fontFamily: "Syne" }}>{s.v}</p>
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#8e9192]" style={{ fontFamily: "Inter" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Portrait photo */}
        <div className="w-[38%] max-md:w-full max-md:h-72 relative border-l border-white/[0.08] max-md:border-l-0 max-md:border-t max-md:border-white/[0.08] bg-[#0e0e0e] overflow-hidden flex-shrink-0">
          {heroPhoto ? (
            <img src={heroPhoto} alt="Rois Surya" className="w-full h-full object-cover object-top" style={{ filter: "grayscale(15%)" }} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 border border-white/[0.08] flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <p className="text-xs text-[#444748] text-center px-8" style={{ fontFamily: "Inter" }}>
                Foto belum diupload.<br />Buka Admin → Hero Photo untuk menambahkan.
              </p>
            </div>
          )}
          {/* Decorative overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, #0e0e0e 0%, transparent 100%)" }} />
          {/* Label */}
          <div className="absolute bottom-6 left-6">
            <p className="text-[10px] tracking-[0.12em] uppercase text-[#8e9192]" style={{ fontFamily: "Inter" }}>Rois Surya Saputra Family</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────

function Work({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  return (
    <section id="work" className="px-16 max-md:px-6 py-24 border-b border-white/[0.08]">
      <div className="flex items-end justify-between mb-12 border-b border-white/[0.08] pb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-3" style={{ fontFamily: "Inter" }}>Selected Work</p>
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-white" style={{ fontFamily: "Syne" }}>Portfolio</h2>
        </div>
        <p className="text-sm text-[#8e9192] max-md:hidden" style={{ fontFamily: "Inter" }}>{filtered.length} Projects</p>
      </div>
      <div className="flex flex-wrap border border-white/[0.08] mb-12">
        {CATS.map((c) => <button key={c} onClick={() => setFilter(c)} className="px-5 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase transition-colors border-r border-white/[0.08] last:border-r-0" style={{ fontFamily: "Inter", backgroundColor: filter === c ? "#fff" : "transparent", color: filter === c ? "#0e0e0e" : "#8e9192" }}>{c}</button>)}
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-px bg-white/[0.08]">
        {filtered.map((p, i) => (
          <div key={p.id} className="group bg-[#0e0e0e] cursor-pointer" onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
            <div className="aspect-[4/3] overflow-hidden bg-[#1c1b1b] relative">
              <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "grayscale(30%)" }} />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ backgroundColor: "#0e0e0e", opacity: hovered === p.id ? 0.65 : 0 }} />
              {hovered === p.id && <div className="absolute inset-0 flex items-center justify-center"><ArrowUpRight size={32} className="text-white" /></div>}
            </div>
            <div className="p-6 border-t border-white/[0.08]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs tracking-[0.1em] uppercase text-[#8e9192] mb-1" style={{ fontFamily: "Inter" }}>{String(i + 1).padStart(2, "0")} — {p.category}</p>
                  <h3 className="text-[22px] font-bold text-white leading-tight" style={{ fontFamily: "Syne" }}>{p.title}</h3>
                </div>
                <span className="text-xs text-[#444748] mt-1" style={{ fontFamily: "Inter" }}>{p.year}</span>
              </div>
              <p className="text-sm text-[#8e9192] leading-relaxed mt-3" style={{ fontFamily: "Inter" }}>{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((t) => <span key={t} className="text-[10px] tracking-[0.1em] uppercase px-2 py-1 border border-white/[0.12] text-[#8e9192]" style={{ fontFamily: "Inter" }}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

function SliderModal({ s, onClose }: { s: Showcase; onClose: () => void }) {
  const [cur, setCur] = useState(0);
  const total = s.slides.length;
  const prev = useCallback(() => setCur((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCur((c) => (c + 1) % total), [total]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); else if (e.key === "ArrowRight") next(); else if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next, onClose]);
  const slide = s.slides[cur];
  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      <style>{`@keyframes fs{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}`}</style>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.08] flex-shrink-0 bg-[#080808]">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-bold text-white" style={{ fontFamily: "Syne" }}>{s.title}</h3>
          <span className="text-xs text-[#444748] border border-white/[0.08] px-2 py-0.5" style={{ fontFamily: "Inter" }}>{s.year}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs text-[#8e9192] tabular-nums" style={{ fontFamily: "Inter" }}>{String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          {s.pdfUrl && <a href={s.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[#8e9192] hover:text-white border border-white/[0.08] px-3 py-1.5 hover:border-white/30 transition-colors" style={{ fontFamily: "Inter" }}><ExternalLink size={12} /> View PDF</a>}
          <button onClick={onClose} className="text-[#8e9192] hover:text-white transition-colors p-1"><X size={18} /></button>
        </div>
      </div>
      {/* Slide */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[#060606]">
        {slide.type === "image"
          ? <img key={cur} src={slide.url} alt={slide.caption ?? ""} className="max-h-full max-w-full object-contain select-none" style={{ animation: "fs 0.2s ease" }} />
          : <iframe src={slide.url} className="w-full h-full border-0" title={slide.caption ?? ""} />
        }
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/[0.15] text-white hover:bg-white hover:text-black transition-all"><ChevronLeft size={18} /></button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/[0.15] text-white hover:bg-white hover:text-black transition-all"><ChevronRight size={18} /></button>
      </div>
      {/* Footer */}
      <div className="border-t border-white/[0.08] px-8 py-3 flex items-center justify-between flex-shrink-0 bg-[#080808] flex-wrap gap-3">
        <p className="text-xs text-[#8e9192]" style={{ fontFamily: "Inter" }}>{slide.caption ?? ""}</p>
        <div className="flex items-center gap-2">
          {s.slides.map((_, i) => <button key={i} onClick={() => setCur(i)} className="transition-all h-1" style={{ width: i === cur ? "20px" : "6px", backgroundColor: i === cur ? "#fff" : "rgba(255,255,255,0.2)" }} />)}
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          {s.slides.map((sl, i) => (
            <button key={sl.id} onClick={() => setCur(i)} className="w-12 h-8 flex-shrink-0 overflow-hidden border-2 transition-all" style={{ borderColor: i === cur ? "#fff" : "transparent" }}>
              {sl.type === "image" ? <img src={sl.url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#1c1b1b] flex items-center justify-center text-[8px] text-[#8e9192]">PDF</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShowcaseSection({ showcases }: { showcases: Showcase[] }) {
  const [open, setOpen] = useState<Showcase | null>(null);
  return (
    <section id="showcase" className="px-16 max-md:px-6 py-24 border-b border-white/[0.08]">
      <div className="flex items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-3" style={{ fontFamily: "Inter" }}>Portfolio Books</p>
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-white" style={{ fontFamily: "Syne" }}>Showcase</h2>
        </div>
        <p className="text-sm text-[#8e9192] max-md:hidden" style={{ fontFamily: "Inter" }}>{showcases.length} Collections</p>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-px bg-white/[0.08]">
        {showcases.map((sc, i) => (
          <div key={sc.id} className="group bg-[#0e0e0e] cursor-pointer" onClick={() => setOpen(sc)}>
            <div className="relative overflow-hidden bg-[#1c1b1b]" style={{ aspectRatio: "3/4" }}>
              <img src={sc.coverImage} alt={sc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "grayscale(20%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,14,14,0.95) 0%, rgba(14,14,14,0.2) 55%, transparent 100%)" }} />
              <div className="absolute top-6 right-6 text-[80px] font-extrabold leading-none select-none" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.05)" }}>{String(i + 1).padStart(2, "0")}</div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs tracking-[0.1em] uppercase text-[#8e9192] mb-2" style={{ fontFamily: "Inter" }}>{sc.slides.length} Slides</p>
                <h3 className="text-[28px] font-bold text-white leading-tight mb-3" style={{ fontFamily: "Syne" }}>{sc.title}</h3>
                <p className="text-[13px] text-[#c4c7c8] leading-relaxed mb-5 max-md:hidden" style={{ fontFamily: "Inter" }}>{sc.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs tracking-[0.08em] uppercase border border-white/20 px-3 py-1.5 text-white" style={{ fontFamily: "Inter" }}>{sc.year}</span>
                  <span className="flex items-center gap-1.5 text-xs border border-white/20 px-3 py-1.5 text-white group-hover:bg-white group-hover:text-[#0e0e0e] transition-colors" style={{ fontFamily: "Inter" }}>
                    <ArrowUpRight size={12} /> Open Slideshow
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {open && <SliderModal s={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

// ─── Resume ───────────────────────────────────────────────────────────────────

function Resume({ cv }: { cv: CVData }) {
  const [tab, setTab] = useState<"experience" | "education" | "skills" | "achievements" | "organizations">("experience");
  const tabs = ["experience", "education", "skills", "achievements", "organizations"] as const;
  const skillGroups = SKILL_CATS.map((c) => ({ c, items: cv.skills.filter((s) => s.category === c) })).filter((g) => g.items.length > 0);
  return (
    <section id="resume" className="px-16 max-md:px-6 py-24 border-b border-white/[0.08]">
      <div className="flex items-end justify-between mb-12 border-b border-white/[0.08] pb-8 flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-3" style={{ fontFamily: "Inter" }}>Curriculum Vitae</p>
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-white" style={{ fontFamily: "Syne" }}>Resume</h2>
        </div>
        <div className="flex flex-wrap border border-white/[0.08]">
          {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className="px-5 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase transition-colors border-r border-white/[0.08] last:border-r-0" style={{ fontFamily: "Inter", backgroundColor: tab === t ? "#fff" : "transparent", color: tab === t ? "#0e0e0e" : "#8e9192" }}>{t}</button>)}
        </div>
      </div>
      {tab === "experience" && cv.experiences.map((e, i) => (
        <div key={e.id} className="grid grid-cols-12 max-md:grid-cols-1 border-b border-white/[0.08] py-8 hover:bg-white/[0.015] transition-colors px-2">
          <div className="col-span-1 max-md:hidden"><span className="text-[24px] font-bold" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.12)" }}>{String(i + 1).padStart(2, "0")}</span></div>
          <div className="col-span-4 max-md:col-span-1 mb-4 max-md:mb-2"><h3 className="text-[18px] font-bold text-white mb-1" style={{ fontFamily: "Syne" }}>{e.company}</h3><p className="text-xs uppercase text-[#8e9192]" style={{ fontFamily: "Inter" }}>{e.location}</p></div>
          <div className="col-span-7 max-md:col-span-1 pl-8 max-md:pl-0">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2"><p className="text-[14px] font-semibold text-[#c4c7c8]" style={{ fontFamily: "Inter" }}>{e.role}</p><span className="text-xs text-[#444748] border border-white/[0.08] px-2 py-0.5" style={{ fontFamily: "Inter" }}>{e.period}</span></div>
            <ul className="space-y-1.5">{e.points.map((pt, j) => <li key={j} className="flex items-start gap-3 text-[13px] text-[#8e9192]" style={{ fontFamily: "Inter" }}><span className="w-3 h-px bg-white/20 mt-2 flex-shrink-0" />{pt}</li>)}</ul>
          </div>
        </div>
      ))}
      {tab === "education" && cv.education.map((ed, i) => (
        <div key={ed.id} className="grid grid-cols-12 max-md:grid-cols-1 border-b border-white/[0.08] py-10 hover:bg-white/[0.015] transition-colors px-2 items-center">
          <div className="col-span-1 max-md:hidden"><span className="text-[24px] font-bold" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.12)" }}>{String(i + 1).padStart(2, "0")}</span></div>
          <div className="col-span-6 max-md:col-span-1 mb-2"><h3 className="text-[22px] font-bold text-white mb-1" style={{ fontFamily: "Syne" }}>{ed.institution}</h3>{ed.degree && <p className="text-sm text-[#8e9192]" style={{ fontFamily: "Inter" }}>{ed.degree}</p>}</div>
          <div className="col-span-5 max-md:col-span-1 pl-8 max-md:pl-0 flex items-center justify-between max-md:gap-4 max-md:justify-start"><span className="text-xs border border-white/[0.08] px-3 py-1 text-[#444748]" style={{ fontFamily: "Inter" }}>{ed.period}</span><span className="text-xs text-[#444748]" style={{ fontFamily: "Inter" }}>{ed.location}</span></div>
        </div>
      ))}
      {tab === "skills" && (
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-px bg-white/[0.08]">
          {skillGroups.map((g) => (
            <div key={g.c} className="bg-[#0e0e0e] p-8">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-6" style={{ fontFamily: "Inter" }}>{g.c}</p>
              <div className="flex flex-wrap gap-2">{g.items.map((s) => <span key={s.id} className="text-[13px] text-[#c4c7c8] px-3 py-1.5 border border-white/[0.1] hover:border-white/30 hover:text-white transition-colors" style={{ fontFamily: "Inter" }}>{s.name}</span>)}</div>
            </div>
          ))}
        </div>
      )}
      {tab === "achievements" && cv.achievements.map((a, i) => (
        <div key={a.id} className="flex items-center gap-6 py-7 border-b border-white/[0.08] group hover:bg-white/[0.015] transition-colors px-2">
          <span className="text-[32px] font-bold w-14 flex-shrink-0 text-right" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.1)" }}>{String(i + 1).padStart(2, "0")}</span>
          <p className="flex-1 text-[16px] font-medium text-[#e5e2e1] group-hover:text-white transition-colors" style={{ fontFamily: "Inter" }}>{a.title}</p>
          <span className="text-xs border border-white/[0.08] px-3 py-1 text-[#8e9192] flex-shrink-0" style={{ fontFamily: "Inter" }}>{a.year}</span>
        </div>
      ))}
      {tab === "organizations" && cv.organizations.map((o, i) => (
        <div key={o.id} className="grid grid-cols-12 max-md:grid-cols-1 border-b border-white/[0.08] py-8 hover:bg-white/[0.015] transition-colors px-2">
          <div className="col-span-1 max-md:hidden"><span className="text-[24px] font-bold" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.12)" }}>{String(i + 1).padStart(2, "0")}</span></div>
          <div className="col-span-4 max-md:col-span-1 mb-4 max-md:mb-2"><h3 className="text-[17px] font-bold text-white mb-1" style={{ fontFamily: "Syne" }}>{o.name}</h3><p className="text-xs uppercase text-[#8e9192]" style={{ fontFamily: "Inter" }}>{o.location}</p></div>
          <div className="col-span-7 max-md:col-span-1 pl-8 max-md:pl-0">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2"><p className="text-[13px] font-semibold text-[#c4c7c8]" style={{ fontFamily: "Inter" }}>{o.role}</p><span className="text-xs border border-white/[0.08] px-2 py-0.5 text-[#444748]" style={{ fontFamily: "Inter" }}>{o.period}</span></div>
            <ul className="space-y-1.5">{o.points.map((pt, j) => <li key={j} className="flex items-start gap-3 text-[13px] text-[#8e9192]" style={{ fontFamily: "Inter" }}><span className="w-3 h-px bg-white/20 mt-2 flex-shrink-0" />{pt}</li>)}</ul>
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="px-16 max-md:px-6 py-24 border-b border-white/[0.08]">
      <div className="grid grid-cols-12 max-md:grid-cols-1">
        <div className="col-span-5 pr-12 max-md:pr-0 max-md:mb-12 max-md:pb-12 max-md:border-b max-md:border-white/[0.08]">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-6" style={{ fontFamily: "Inter" }}>About</p>
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-white mb-8" style={{ fontFamily: "Syne" }}>Design as a<br />Structural Force.</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-[#c4c7c8]" style={{ fontFamily: "Inter" }}>
            <p>I am Rois Surya Saputra Family, a graphic designer based in Makassar with a deep interest in technology and visual communication.</p>
            <p>Currently pursuing Computer Engineering at Makassar State University, I have simultaneously built an active design practice spanning brand identity, social media content, print, and apparel.</p>
            <p>My approach centres on deliberate composition, typographic clarity, and designs that serve both aesthetic and functional goals.</p>
          </div>
          <div className="mt-10 border-t border-white/[0.08] pt-8">
            <div className="grid grid-cols-2 gap-6">
              {[{ l: "Based in", v: "Makassar, ID" }, { l: "Email", v: "ro1ssury4@gmail.com" }, { l: "Phone", v: "+62 896-3738-9021" }, { l: "Language", v: "ID / EN" }].map((item) => (
                <div key={item.l}>
                  <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#444748]" style={{ fontFamily: "Inter" }}>{item.l}</p>
                  <p className="text-sm text-[#e5e2e1] mt-1" style={{ fontFamily: "Inter" }}>{item.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-7 pl-12 max-md:pl-0">
          <div className="aspect-[16/9] bg-[#1c1b1b] overflow-hidden">
            <img src="https://unsplash.com/photos/silhouette-person-walking-at-walkway-Afqw8XrP1V8" alt="Rois Surya at work" className="w-full h-full object-cover" style={{ filter: "grayscale(20%)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  const list = [
    { no: "01", title: "Brand Identity", desc: "Complete visual identity systems — mark, wordmark, color, typography, and brand guidelines.", items: ["Logo & Mark Design", "Color Systems", "Typography Selection", "Brand Guidelines"] },
    { no: "02", title: "Social Media Design", desc: "Consistent, on-brand content for Instagram, TikTok, and other platforms.", items: ["Feed Layout Design", "Story & Reels Templates", "Content Planning", "Performance Review"] },
    { no: "03", title: "Print & Packaging", desc: "Packaging and surface graphics for product brands. Posters, banners, and event collateral.", items: ["Packaging & Dieline", "Posters & Banners", "Menu Books", "Event Materials"] },
    { no: "04", title: "Apparel & Uniform", desc: "Custom apparel design for organizations, events, and brands.", items: ["T-Shirt & Jersey Design", "Varsity & Coach Jacket", "ID Cards & Lanyards", "Guidebook Design"] },
  ];
  return (
    <section id="services" className="px-16 max-md:px-6 py-24 border-b border-white/[0.08]">
      <div className="flex items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-3" style={{ fontFamily: "Inter" }}>Services</p>
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-white" style={{ fontFamily: "Syne" }}>What I Do</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-px bg-white/[0.08]">
        {list.map((s) => (
          <div key={s.no} className="bg-[#0e0e0e] p-8 hover:bg-[#141313] transition-colors">
            <div className="flex items-start gap-4 mb-6"><span className="text-[32px] font-bold leading-none" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.15)" }}>{s.no}</span><h3 className="text-[24px] font-bold text-white mt-1" style={{ fontFamily: "Syne" }}>{s.title}</h3></div>
            <p className="text-[15px] leading-relaxed text-[#8e9192] mb-6" style={{ fontFamily: "Inter" }}>{s.desc}</p>
            <ul className="space-y-2">{s.items.map((it) => <li key={it} className="flex items-center gap-3 text-sm text-[#c4c7c8]" style={{ fontFamily: "Inter" }}><span className="w-4 h-px bg-white/20" />{it}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); setForm({ name: "", email: "", project: "", message: "" }); };
  return (
    <section id="contact" className="px-16 max-md:px-6 py-24 border-b border-white/[0.08]">
      <div className="grid grid-cols-12 max-md:grid-cols-1">
        <div className="col-span-5 pr-12 max-md:pr-0 max-md:mb-12">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-6" style={{ fontFamily: "Inter" }}>Contact</p>
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-white mb-6" style={{ fontFamily: "Syne" }}>Start a Project.</h2>
          <p className="text-[15px] leading-relaxed text-[#8e9192] mb-10" style={{ fontFamily: "Inter" }}>Open for new commissions, collaborations, and freelance work.</p>
          <div className="space-y-6">
            {[{ l: "Email", v: "ro1ssury4@gmail.com" }, { l: "Phone", v: "+62 896-3738-9021" }, { l: "Location", v: "Makassar, Indonesia" }].map((c) => (
              <div key={c.l} className="border-t border-white/[0.08] pt-5">
                <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#444748]" style={{ fontFamily: "Inter" }}>{c.l}</p>
                <p className="text-[15px] text-[#e5e2e1] mt-1" style={{ fontFamily: "Inter" }}>{c.v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-7 pl-12 max-md:pl-0">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center py-20 border border-white/[0.08]">
              <p className="text-[40px] font-bold text-white mb-3" style={{ fontFamily: "Syne" }}>Received.</p>
              <p className="text-sm text-[#8e9192]" style={{ fontFamily: "Inter" }}>{"I'll be in touch within 48 hours."}</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              {[{ k: "name", l: "Full Name", t: "text", p: "Your Name" }, { k: "email", l: "Email", t: "email", p: "your@email.com" }, { k: "project", l: "Project Type", t: "text", p: "Branding, Social Media, Print…" }].map((f) => (
                <div key={f.k} className="border-b border-white/[0.08] py-5">
                  <label className="block text-[10px] tracking-[0.1em] uppercase text-[#444748] mb-2" style={{ fontFamily: "Inter" }}>{f.l}</label>
                  <input type={f.t} value={form[f.k as keyof typeof form]} onChange={(e) => setForm((x) => ({ ...x, [f.k]: e.target.value }))} placeholder={f.p} required className="w-full bg-transparent text-[15px] text-white placeholder-[#444748] outline-none" style={{ fontFamily: "Inter" }} />
                </div>
              ))}
              <div className="border-b border-white/[0.08] py-5">
                <label className="block text-[10px] tracking-[0.1em] uppercase text-[#444748] mb-2" style={{ fontFamily: "Inter" }}>Message</label>
                <textarea value={form.message} onChange={(e) => setForm((x) => ({ ...x, message: e.target.value }))} placeholder="Brief description…" required rows={4} className="w-full bg-transparent text-[15px] text-white placeholder-[#444748] outline-none resize-none" style={{ fontFamily: "Inter" }} />
              </div>
              <div className="pt-6">
                <button type="submit" className="group flex items-center gap-2 bg-white text-[#0e0e0e] px-8 py-4 text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#c4c7c8] transition-colors" style={{ fontFamily: "Inter" }}>Send Message <ArrowUpRight size={14} /></button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onAdmin }: { onAdmin: () => void }) {
  return (
    <footer className="px-16 max-md:px-6 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs tracking-[0.1em] uppercase text-[#444748]" style={{ fontFamily: "Inter" }}>© 2025 Rois Surya. All rights reserved.</p>
        <div className="flex items-center gap-8">
          <p className="text-xs text-[#444748]" style={{ fontFamily: "Inter" }}>Makassar, Indonesia</p>
          <button onClick={onAdmin} className="text-xs uppercase text-[#1c1b1b] hover:text-[#444748] transition-colors" style={{ fontFamily: "Inter" }}>↑ Admin</button>
        </div>
      </div>
    </footer>
  );
}

// ─── Admin Login ──────────────────────────────────────────────────────────────

function AdminLogin({ onLogin, onClose }: { onLogin: () => void; onClose: () => void }) {
  const [pw, setPw] = useState(""); const [show, setShow] = useState(false); const [err, setErr] = useState(false); const [shake, setShake] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PWD) { onLogin(); } else { setErr(true); setShake(true); setTimeout(() => setShake(false), 500); setPw(""); }
  };
  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e] flex items-center justify-center">
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`}</style>
      <button onClick={onClose} className="absolute top-6 right-6 text-[#8e9192] hover:text-white"><X size={20} /></button>
      <div className="w-full max-w-sm px-8">
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#444748] mb-4" style={{ fontFamily: "Inter" }}>Admin Access</p>
        <h2 className="text-[32px] font-bold text-white mb-10" style={{ fontFamily: "Syne" }}>Enter Password</h2>
        <form onSubmit={submit} style={shake ? { animation: "shake 0.4s ease-in-out" } : {}}>
          <div className="border-b pb-4 mb-4" style={{ borderColor: err ? "rgba(255,68,68,0.5)" : "rgba(255,255,255,0.2)" }}>
            <label className="block text-[10px] tracking-[0.1em] uppercase text-[#444748] mb-2" style={{ fontFamily: "Inter" }}>Password</label>
            <div className="flex items-center gap-3">
              <input type={show ? "text" : "password"} value={pw} onChange={(e) => { setPw(e.target.value); setErr(false); }} autoFocus placeholder="••••••••" className="flex-1 bg-transparent text-[18px] text-white outline-none placeholder-[#2a2a2a]" style={{ fontFamily: "Inter" }} />
              <button type="button" onClick={() => setShow(!show)} className="text-[#444748] hover:text-white">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
          </div>
          {err && <p className="text-[11px] text-red-400 mb-4 uppercase tracking-wide" style={{ fontFamily: "Inter" }}>Incorrect password</p>}
          <button type="submit" className="w-full bg-white text-[#0e0e0e] py-4 text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#c4c7c8] transition-colors mt-2" style={{ fontFamily: "Inter" }}>Enter</button>
        </form>
      </div>
    </div>
  );
}

// ─── Admin Helpers ────────────────────────────────────────────────────────────

const IC = "w-full bg-[#141313] border border-white/[0.08] px-4 py-3 text-sm text-white outline-none focus:border-white/30 transition-colors";

function AF({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-[10px] tracking-[0.1em] uppercase text-[#444748] mb-2" style={{ fontFamily: "Inter" }}>{label}</label>{children}</div>;
}

function Drawer({ title, onClose, onSave, ok, children }: { title: string; onClose: () => void; onSave: () => void; ok: boolean; children: React.ReactNode }) {
  return (
    <>
      <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
        <p className="text-xs tracking-[0.1em] uppercase text-white" style={{ fontFamily: "Inter" }}>{title}</p>
        <button onClick={onClose} className="text-[#8e9192] hover:text-white"><X size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">{children}</div>
      <div className="border-t border-white/[0.08] px-6 py-4 flex-shrink-0">
        <button onClick={onSave} disabled={!ok} className="w-full bg-white text-[#0e0e0e] py-3 text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#c4c7c8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" style={{ fontFamily: "Inter" }}>Save</button>
      </div>
    </>
  );
}

function DelBtn({ id, dc, setDc, onDel }: { id: string; dc: string | null; setDc: (id: string | null) => void; onDel: (id: string) => void }) {
  return dc === id
    ? <div className="flex items-center gap-1"><button onClick={() => onDel(id)} className="text-[10px] text-red-400 uppercase" style={{ fontFamily: "Inter" }}>Confirm</button><button onClick={() => setDc(null)} className="text-[10px] text-[#444748] ml-1">✕</button></div>
    : <button onClick={() => setDc(id)} className="text-[#444748] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>;
}

function PtsMgr({ pts, onChange }: { pts: string[]; onChange: (v: string[]) => void }) {
  const [inp, setInp] = useState("");
  const add = () => { if (!inp.trim()) return; onChange([...pts, inp.trim()]); setInp(""); };
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())} className="flex-1 bg-[#141313] border border-white/[0.08] px-3 py-2 text-sm text-white outline-none focus:border-white/30" style={{ fontFamily: "Inter" }} placeholder="Add point…" />
        <button onClick={add} className="bg-white/10 border border-white/[0.08] px-3 py-2 text-[#8e9192] hover:text-white"><Plus size={14} /></button>
      </div>
      <ul className="space-y-1">
        {pts.map((pt, i) => <li key={i} className="flex items-start justify-between gap-2 text-[12px] text-[#8e9192] py-1 border-b border-white/[0.05]" style={{ fontFamily: "Inter" }}><span className="flex-1">{pt}</span><button onClick={() => { const n = [...pts]; n.splice(i, 1); onChange(n); }} className="text-[#444748] hover:text-red-400 flex-shrink-0"><X size={12} /></button></li>)}
      </ul>
    </div>
  );
}

function AddTopBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="px-6 py-3 flex justify-end border-b border-white/[0.08]">
      <button onClick={onClick} className="flex items-center gap-2 bg-white text-[#0e0e0e] px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase hover:bg-[#c4c7c8] transition-colors" style={{ fontFamily: "Inter" }}><Plus size={12} /> {label}</button>
    </div>
  );
}

// ─── Admin: Hero Photo ────────────────────────────────────────────────────────

function AdminHeroPhoto({ heroPhoto, onSave }: { heroPhoto: string; onSave: (url: string) => void }) {
  const [url, setUrl] = useState(heroPhoto);
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    setUploading(true);
    try {
      const u = await uploadFile(files[0]);
      setUrl(u); onSave(u);
    } catch (e: any) {
      const msg = e?.message ?? "";
      if (msg === "BUCKET_NOT_FOUND") {
        alert("Bucket 'portfolio' belum dibuat.\n\nCara buat:\n1. Buka supabase.com/dashboard\n2. Klik Storage → New bucket\n3. Nama: portfolio\n4. Aktifkan 'Public bucket'\n5. Klik Save");
      } else {
        alert("Upload gagal: " + msg);
      }
    }
    finally { setUploading(false); if (ref.current) ref.current.value = ""; }
  };

  return (
    <div className="p-6 max-w-lg">
      <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-6" style={{ fontFamily: "Inter" }}>Hero Photo</p>
      <p className="text-[13px] text-[#8e9192] mb-6" style={{ fontFamily: "Inter" }}>Upload foto profil Anda untuk ditampilkan di bagian kanan hero halaman utama.</p>

      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
      <button onClick={() => ref.current?.click()} disabled={uploading} className="flex items-center gap-2 border border-white/[0.12] text-[#8e9192] px-5 py-3 text-xs font-semibold tracking-[0.08em] uppercase hover:text-white hover:border-white/30 transition-colors mb-4 w-full justify-center" style={{ fontFamily: "Inter" }}>
        {uploading ? <><Loader size={12} className="animate-spin" /> Uploading…</> : <><Upload size={12} /> Upload Foto dari Komputer</>}
      </button>

      <p className="text-[10px] text-[#444748] text-center mb-4" style={{ fontFamily: "Inter" }}>— atau paste URL —</p>
      <div className="flex gap-2">
        <input value={url} onChange={(e) => setUrl(e.target.value)} className={`${IC} flex-1`} style={{ fontFamily: "Inter" }} placeholder="https://…" />
        <button onClick={() => onSave(url)} className="bg-white text-[#0e0e0e] px-4 py-3 text-xs font-semibold uppercase hover:bg-[#c4c7c8] transition-colors whitespace-nowrap" style={{ fontFamily: "Inter" }}>Save URL</button>
      </div>

      {(url || heroPhoto) && (
        <div className="mt-6">
          <p className="text-[10px] uppercase text-[#444748] mb-2" style={{ fontFamily: "Inter" }}>Preview</p>
          <div className="w-48 aspect-[3/4] overflow-hidden bg-[#1c1b1b] border border-white/[0.08]">
            <img src={url || heroPhoto} alt="Hero preview" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Admin: Showcase ──────────────────────────────────────────────────────────

function AdminShowcases({ showcases, onSave }: { showcases: Showcase[]; onSave: (v: Showcase[]) => void }) {
  const [list, setList] = useState(showcases);
  const [editing, setEditing] = useState<Showcase | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [slideUrl, setSlideUrl] = useState("");
  const [slideCaption, setSlideCaption] = useState("");
  const [dc, setDc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const startNew = () => { setEditing({ id: crypto.randomUUID(), title: "", year: "", description: "", coverImage: "", slides: [], pdfUrl: "" }); setIsNew(true); };
  const startEdit = (item: Showcase) => { setEditing({ ...item, slides: item.slides.map((s) => ({ ...s })) }); setIsNew(false); };
  const save = () => { if (!editing) return; const upd = isNew ? [...list, editing] : list.map((x) => x.id === editing.id ? editing : x); setList(upd); onSave(upd); setEditing(null); };
  const del = (id: string) => { const upd = list.filter((x) => x.id !== id); setList(upd); onSave(upd); setDc(null); };

  const addSlide = () => {
    if (!slideUrl.trim() || !editing) return;
    const sl: Slide = { id: crypto.randomUUID(), type: slideUrl.toLowerCase().endsWith(".pdf") ? "pdf" : "image", url: slideUrl.trim(), caption: slideCaption.trim() || undefined };
    setEditing({ ...editing, slides: [...editing.slides, sl] });
    setSlideUrl(""); setSlideCaption("");
  };
  const removeSlide = (id: string) => { if (!editing) return; setEditing({ ...editing, slides: editing.slides.filter((s) => s.id !== id) }); };

  const handleUpload = async (files: FileList | null, target: "slide" | "cover") => {
    if (!files || !files[0] || !editing) return;
    setUploading(true);
    try {
      const u = await uploadFile(files[0]);
      if (target === "cover") { setEditing({ ...editing, coverImage: u }); }
      else { const sl: Slide = { id: crypto.randomUUID(), type: files[0].type.includes("pdf") ? "pdf" : "image", url: u, caption: files[0].name.replace(/\.[^.]+$/, "") }; setEditing({ ...editing, slides: [...editing.slides, sl] }); }
    } catch (e: any) {
      const msg = e?.message ?? "";
      if (msg === "BUCKET_NOT_FOUND") {
        alert("Bucket 'portfolio' belum dibuat.\n\nCara buat:\n1. Buka supabase.com/dashboard\n2. Klik Storage → New bucket\n3. Nama: portfolio\n4. Aktifkan 'Public bucket'\n5. Klik Save");
      } else {
        alert("Upload gagal: " + msg);
      }
    }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; if (coverRef.current) coverRef.current.value = ""; }
  };

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AddTopBtn label="Add Showcase" onClick={startNew} />
        {list.map((item) => (
          <div key={item.id} className="px-6 py-5 border-b border-white/[0.08] hover:bg-white/[0.02] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-16 bg-[#1c1b1b] flex-shrink-0 overflow-hidden">{item.coverImage && <img src={item.coverImage} alt="" className="w-full h-full object-cover" />}</div>
              <div><p className="text-[14px] font-bold text-white" style={{ fontFamily: "Syne" }}>{item.title}</p><p className="text-xs text-[#8e9192] mt-0.5" style={{ fontFamily: "Inter" }}>{item.slides.length} slides · {item.year}</p></div>
            </div>
            <div className="flex items-center gap-3"><button onClick={() => startEdit(item)} className="text-[#8e9192] hover:text-white"><Edit2 size={14} /></button><DelBtn id={item.id} dc={dc} setDc={setDc} onDel={del} /></div>
          </div>
        ))}
        {list.length === 0 && <div className="px-6 py-20 text-center"><p className="text-sm text-[#444748]" style={{ fontFamily: "Inter" }}>Belum ada showcase. Klik Add Showcase untuk mulai.</p></div>}
      </div>

      {editing && (
        <div className="w-[420px] border-l border-white/[0.08] flex flex-col overflow-hidden flex-shrink-0">
          <Drawer title={isNew ? "New Showcase" : "Edit Showcase"} onClose={() => setEditing(null)} onSave={save} ok={!!editing.title}>
            <AF label="Title *"><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} placeholder="Portfolio 2024" /></AF>
            <AF label="Year *"><input value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} placeholder="2024" /></AF>
            <AF label="Description"><textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className={`${IC} resize-none`} style={{ fontFamily: "Inter" }} /></AF>
            <AF label="PDF URL (opsional)"><input value={editing.pdfUrl ?? ""} onChange={(e) => setEditing({ ...editing, pdfUrl: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} placeholder="https://…" /></AF>
            <AF label="Cover Image">
              <input value={editing.coverImage} onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })} className={`${IC} mb-2`} style={{ fontFamily: "Inter" }} placeholder="Paste URL atau upload" />
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files, "cover")} />
              <button onClick={() => coverRef.current?.click()} disabled={uploading} className="flex items-center gap-2 border border-white/[0.08] px-3 py-2 text-xs text-[#8e9192] hover:text-white w-full justify-center hover:border-white/30 transition-colors" style={{ fontFamily: "Inter" }}>
                {uploading ? <><Loader size={12} className="animate-spin" /> Uploading…</> : <><Upload size={12} /> Upload Cover Image</>}
              </button>
              {editing.coverImage && <div className="aspect-[3/4] overflow-hidden bg-[#1c1b1b] mt-2"><img src={editing.coverImage} alt="Cover" className="w-full h-full object-cover" /></div>}
            </AF>
            <div>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#444748] mb-3" style={{ fontFamily: "Inter" }}>Slides ({editing.slides.length})</p>
              <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleUpload(e.target.files, "slide")} />
              <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 border border-white/[0.08] px-3 py-2 text-xs text-[#8e9192] hover:text-white w-full justify-center mb-3 hover:border-white/30 transition-colors" style={{ fontFamily: "Inter" }}>
                {uploading ? <><Loader size={12} className="animate-spin" /> Uploading…</> : <><Upload size={12} /> Upload Gambar / PDF</>}
              </button>
              <div className="flex gap-2 mb-2">
                <input value={slideUrl} onChange={(e) => setSlideUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSlide())} className="flex-1 bg-[#141313] border border-white/[0.08] px-3 py-2 text-sm text-white outline-none focus:border-white/30" style={{ fontFamily: "Inter" }} placeholder="Atau paste URL…" />
                <button onClick={addSlide} className="bg-white/10 border border-white/[0.08] px-3 py-2 text-[#8e9192] hover:text-white"><Plus size={14} /></button>
              </div>
              <input value={slideCaption} onChange={(e) => setSlideCaption(e.target.value)} className="w-full bg-[#141313] border border-white/[0.08] px-3 py-2 text-xs text-white outline-none focus:border-white/30 mb-3" style={{ fontFamily: "Inter" }} placeholder="Caption (opsional)" />
              <div className="space-y-2">
                {editing.slides.map((sl, i) => (
                  <div key={sl.id} className="flex items-center gap-3 border border-white/[0.08] p-2">
                    <div className="w-10 h-7 bg-[#1c1b1b] flex-shrink-0 overflow-hidden">{sl.type === "image" ? <img src={sl.url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[9px] text-[#8e9192]">PDF</div>}</div>
                    <p className="flex-1 text-[11px] text-[#8e9192] truncate" style={{ fontFamily: "Inter" }}>{sl.caption || `Slide ${i + 1}`}</p>
                    <button onClick={() => removeSlide(sl.id)} className="text-[#444748] hover:text-red-400 flex-shrink-0"><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </div>
  );
}

// ─── Admin: Projects ──────────────────────────────────────────────────────────

function AdminProjects({ projects, onSave }: { projects: Project[]; onSave: (p: Project[]) => void }) {
  const [list, setList] = useState(projects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [dc, setDc] = useState<string | null>(null);

  const startNew = () => { setEditing({ id: crypto.randomUUID(), title: "", category: "Brand Identity", year: new Date().getFullYear().toString(), description: "", imageUrl: "", tags: [], featured: false }); setIsNew(true); };
  const save = () => { if (!editing) return; const upd = isNew ? [...list, editing] : list.map((p) => p.id === editing.id ? editing : p); setList(upd); onSave(upd); setEditing(null); };
  const del = (id: string) => { const upd = list.filter((p) => p.id !== id); setList(upd); onSave(upd); setDc(null); };
  const addTag = () => { if (!tagInput.trim() || !editing) return; setEditing({ ...editing, tags: [...editing.tags, tagInput.trim()] }); setTagInput(""); };
  const removeTag = (t: string) => { if (!editing) return; setEditing({ ...editing, tags: editing.tags.filter((x) => x !== t) }); };

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AddTopBtn label="Add Project" onClick={startNew} />
        <div className="grid px-6 py-3 border-b border-white/[0.08] bg-[#141313]" style={{ gridTemplateColumns: "2fr 1fr 1fr 80px 80px" }}>
          {["Title", "Category", "Year", "Featured", ""].map((h, i) => <p key={i} className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#444748]" style={{ fontFamily: "Inter" }}>{h}</p>)}
        </div>
        {list.map((p) => (
          <div key={p.id} className="grid px-6 py-4 border-b border-white/[0.08] hover:bg-white/[0.02] items-center" style={{ gridTemplateColumns: "2fr 1fr 1fr 80px 80px" }}>
            <div className="flex items-center gap-3"><div className="w-10 h-7 bg-[#1c1b1b] flex-shrink-0 overflow-hidden">{p.imageUrl && <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />}</div><p className="text-[13px] font-medium text-white truncate" style={{ fontFamily: "Inter" }}>{p.title}</p></div>
            <p className="text-xs text-[#8e9192]" style={{ fontFamily: "Inter" }}>{p.category}</p>
            <p className="text-xs text-[#8e9192]" style={{ fontFamily: "Inter" }}>{p.year}</p>
            <span className="text-[10px] uppercase px-2 py-1 w-fit" style={{ fontFamily: "Inter", backgroundColor: p.featured ? "rgba(255,255,255,0.1)" : "transparent", color: p.featured ? "#fff" : "#444748", border: p.featured ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent" }}>{p.featured ? "Yes" : "No"}</span>
            <div className="flex items-center gap-3"><button onClick={() => { setEditing({ ...p }); setIsNew(false); setTagInput(""); }} className="text-[#8e9192] hover:text-white"><Edit2 size={14} /></button><DelBtn id={p.id} dc={dc} setDc={setDc} onDel={del} /></div>
          </div>
        ))}
      </div>
      {editing && (
        <div className="w-96 border-l border-white/[0.08] flex flex-col overflow-hidden flex-shrink-0">
          <Drawer title={isNew ? "New Project" : "Edit Project"} onClose={() => setEditing(null)} onSave={save} ok={!!editing.title}>
            <AF label="Title *"><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} placeholder="Project title" /></AF>
            <AF label="Category"><select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={IC} style={{ fontFamily: "Inter" }}>{CATS.filter((c) => c !== "All").map((c) => <option key={c} value={c} style={{ backgroundColor: "#141313" }}>{c}</option>)}</select></AF>
            <AF label="Year"><input value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} placeholder="2025" /></AF>
            <AF label="Image URL"><input value={editing.imageUrl} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} placeholder="https://…" />{editing.imageUrl && <div className="mt-2 aspect-video bg-[#1c1b1b] overflow-hidden"><img src={editing.imageUrl} alt="" className="w-full h-full object-cover" /></div>}</AF>
            <AF label="Description"><textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className={`${IC} resize-none`} style={{ fontFamily: "Inter" }} /></AF>
            <AF label="Tags">
              <div className="flex gap-2 mb-2"><input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} className="flex-1 bg-[#141313] border border-white/[0.08] px-3 py-2 text-sm text-white outline-none" style={{ fontFamily: "Inter" }} placeholder="Add tag…" /><button onClick={addTag} className="bg-white/10 border border-white/[0.08] px-3 py-2 text-[#8e9192] hover:text-white"><Plus size={14} /></button></div>
              <div className="flex flex-wrap gap-2">{editing.tags.map((t) => <span key={t} className="flex items-center gap-1 text-[10px] uppercase px-2 py-1 border border-white/[0.12] text-[#8e9192]" style={{ fontFamily: "Inter" }}>{t}<button onClick={() => removeTag(t)} className="hover:text-white ml-1"><X size={10} /></button></span>)}</div>
            </AF>
            <div className="flex items-center justify-between border border-white/[0.08] px-4 py-3">
              <span className="text-xs uppercase text-[#8e9192]" style={{ fontFamily: "Inter" }}>Featured</span>
              <button onClick={() => setEditing({ ...editing, featured: !editing.featured })} className="w-10 h-5 relative" style={{ backgroundColor: editing.featured ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}><span className="absolute top-0.5 w-4 h-4 bg-white transition-all" style={{ left: editing.featured ? "calc(100% - 18px)" : "1px" }} /></button>
            </div>
          </Drawer>
        </div>
      )}
    </div>
  );
}

// ─── Admin: CV Sections ───────────────────────────────────────────────────────

function AdminExperience({ items, onSave }: { items: Experience[]; onSave: (v: Experience[]) => void }) {
  const [list, setList] = useState(items); const [editing, setEditing] = useState<Experience | null>(null); const [isNew, setIsNew] = useState(false); const [dc, setDc] = useState<string | null>(null);
  const save = () => { if (!editing) return; const upd = isNew ? [...list, editing] : list.map((x) => x.id === editing.id ? editing : x); setList(upd); onSave(upd); setEditing(null); };
  const del = (id: string) => { const upd = list.filter((x) => x.id !== id); setList(upd); onSave(upd); setDc(null); };
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AddTopBtn label="Add Experience" onClick={() => { setEditing({ id: crypto.randomUUID(), company: "", role: "", period: "", location: "", points: [] }); setIsNew(true); }} />
        {list.map((item, i) => (
          <div key={item.id} className="px-6 py-5 border-b border-white/[0.08] hover:bg-white/[0.02] flex items-start justify-between gap-4">
            <div className="flex gap-4 flex-1 min-w-0"><span className="text-[18px] font-bold w-8 flex-shrink-0" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.15)" }}>{String(i + 1).padStart(2, "0")}</span><div><p className="text-[14px] font-bold text-white" style={{ fontFamily: "Syne" }}>{item.company}</p><p className="text-xs text-[#8e9192] mt-0.5" style={{ fontFamily: "Inter" }}>{item.role} · {item.period}</p></div></div>
            <div className="flex items-center gap-3 flex-shrink-0"><button onClick={() => { setEditing({ ...item, points: [...item.points] }); setIsNew(false); }} className="text-[#8e9192] hover:text-white"><Edit2 size={14} /></button><DelBtn id={item.id} dc={dc} setDc={setDc} onDel={del} /></div>
          </div>
        ))}
      </div>
      {editing && <div className="w-96 border-l border-white/[0.08] flex flex-col overflow-hidden flex-shrink-0"><Drawer title={isNew ? "New Experience" : "Edit"} onClose={() => setEditing(null)} onSave={save} ok={!!editing.company}><AF label="Company *"><input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Role"><input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Period"><input value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} placeholder="2023 — Present" /></AF><AF label="Location"><input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Responsibilities"><PtsMgr pts={editing.points} onChange={(v) => setEditing({ ...editing, points: v })} /></AF></Drawer></div>}
    </div>
  );
}

function AdminEducation({ items, onSave }: { items: Education[]; onSave: (v: Education[]) => void }) {
  const [list, setList] = useState(items); const [editing, setEditing] = useState<Education | null>(null); const [isNew, setIsNew] = useState(false); const [dc, setDc] = useState<string | null>(null);
  const save = () => { if (!editing) return; const upd = isNew ? [...list, editing] : list.map((x) => x.id === editing.id ? editing : x); setList(upd); onSave(upd); setEditing(null); };
  const del = (id: string) => { const upd = list.filter((x) => x.id !== id); setList(upd); onSave(upd); setDc(null); };
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AddTopBtn label="Add Education" onClick={() => { setEditing({ id: crypto.randomUUID(), institution: "", degree: "", period: "", location: "" }); setIsNew(true); }} />
        {list.map((item, i) => <div key={item.id} className="px-6 py-5 border-b border-white/[0.08] hover:bg-white/[0.02] flex items-center justify-between gap-4"><div className="flex gap-4 flex-1"><span className="text-[18px] font-bold w-8 flex-shrink-0" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.15)" }}>{String(i + 1).padStart(2, "0")}</span><div><p className="text-[14px] font-bold text-white" style={{ fontFamily: "Syne" }}>{item.institution}</p><p className="text-xs text-[#8e9192] mt-0.5" style={{ fontFamily: "Inter" }}>{item.degree} · {item.period}</p></div></div><div className="flex items-center gap-3"><button onClick={() => { setEditing({ ...item }); setIsNew(false); }} className="text-[#8e9192] hover:text-white"><Edit2 size={14} /></button><DelBtn id={item.id} dc={dc} setDc={setDc} onDel={del} /></div></div>)}
      </div>
      {editing && <div className="w-96 border-l border-white/[0.08] flex flex-col overflow-hidden flex-shrink-0"><Drawer title={isNew ? "New Education" : "Edit"} onClose={() => setEditing(null)} onSave={save} ok={!!editing.institution}><AF label="Institution *"><input value={editing.institution} onChange={(e) => setEditing({ ...editing, institution: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Degree"><input value={editing.degree} onChange={(e) => setEditing({ ...editing, degree: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Period"><input value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Location"><input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF></Drawer></div>}
    </div>
  );
}

function AdminAchievements({ items, onSave }: { items: Achievement[]; onSave: (v: Achievement[]) => void }) {
  const [list, setList] = useState(items); const [editing, setEditing] = useState<Achievement | null>(null); const [isNew, setIsNew] = useState(false); const [dc, setDc] = useState<string | null>(null);
  const save = () => { if (!editing) return; const upd = isNew ? [...list, editing] : list.map((x) => x.id === editing.id ? editing : x); setList(upd); onSave(upd); setEditing(null); };
  const del = (id: string) => { const upd = list.filter((x) => x.id !== id); setList(upd); onSave(upd); setDc(null); };
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AddTopBtn label="Add Achievement" onClick={() => { setEditing({ id: crypto.randomUUID(), title: "", year: "" }); setIsNew(true); }} />
        {list.map((item, i) => <div key={item.id} className="px-6 py-5 border-b border-white/[0.08] hover:bg-white/[0.02] flex items-center justify-between gap-4"><div className="flex gap-4 flex-1 min-w-0"><span className="text-[18px] font-bold w-8 flex-shrink-0" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.15)" }}>{String(i + 1).padStart(2, "0")}</span><div className="min-w-0"><p className="text-[14px] text-[#e5e2e1] truncate" style={{ fontFamily: "Inter" }}>{item.title}</p><span className="text-[11px] text-[#444748] border border-white/[0.06] px-2 py-0.5 inline-block mt-1" style={{ fontFamily: "Inter" }}>{item.year}</span></div></div><div className="flex items-center gap-3 flex-shrink-0"><button onClick={() => { setEditing({ ...item }); setIsNew(false); }} className="text-[#8e9192] hover:text-white"><Edit2 size={14} /></button><DelBtn id={item.id} dc={dc} setDc={setDc} onDel={del} /></div></div>)}
      </div>
      {editing && <div className="w-96 border-l border-white/[0.08] flex flex-col overflow-hidden flex-shrink-0"><Drawer title={isNew ? "New" : "Edit"} onClose={() => setEditing(null)} onSave={save} ok={!!editing.title}><AF label="Title *"><textarea value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} rows={3} className={`${IC} resize-none`} style={{ fontFamily: "Inter" }} /></AF><AF label="Year"><input value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF></Drawer></div>}
    </div>
  );
}

function AdminOrgs({ items, onSave }: { items: Organization[]; onSave: (v: Organization[]) => void }) {
  const [list, setList] = useState(items); const [editing, setEditing] = useState<Organization | null>(null); const [isNew, setIsNew] = useState(false); const [dc, setDc] = useState<string | null>(null);
  const save = () => { if (!editing) return; const upd = isNew ? [...list, editing] : list.map((x) => x.id === editing.id ? editing : x); setList(upd); onSave(upd); setEditing(null); };
  const del = (id: string) => { const upd = list.filter((x) => x.id !== id); setList(upd); onSave(upd); setDc(null); };
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <AddTopBtn label="Add Organization" onClick={() => { setEditing({ id: crypto.randomUUID(), name: "", role: "", period: "", location: "", points: [] }); setIsNew(true); }} />
        {list.map((item, i) => <div key={item.id} className="px-6 py-5 border-b border-white/[0.08] hover:bg-white/[0.02] flex items-start justify-between gap-4"><div className="flex gap-4 flex-1 min-w-0"><span className="text-[18px] font-bold w-8 flex-shrink-0" style={{ fontFamily: "Syne", color: "rgba(255,255,255,0.15)" }}>{String(i + 1).padStart(2, "0")}</span><div><p className="text-[14px] font-bold text-white" style={{ fontFamily: "Syne" }}>{item.name}</p><p className="text-xs text-[#8e9192] mt-0.5" style={{ fontFamily: "Inter" }}>{item.role} · {item.period}</p></div></div><div className="flex items-center gap-3 flex-shrink-0"><button onClick={() => { setEditing({ ...item, points: [...item.points] }); setIsNew(false); }} className="text-[#8e9192] hover:text-white"><Edit2 size={14} /></button><DelBtn id={item.id} dc={dc} setDc={setDc} onDel={del} /></div></div>)}
      </div>
      {editing && <div className="w-96 border-l border-white/[0.08] flex flex-col overflow-hidden flex-shrink-0"><Drawer title={isNew ? "New Org" : "Edit"} onClose={() => setEditing(null)} onSave={save} ok={!!editing.name}><AF label="Organization *"><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Role"><input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Period"><input value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Location"><input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className={IC} style={{ fontFamily: "Inter" }} /></AF><AF label="Responsibilities"><PtsMgr pts={editing.points} onChange={(v) => setEditing({ ...editing, points: v })} /></AF></Drawer></div>}
    </div>
  );
}

function AdminSkills({ items, onSave }: { items: Skill[]; onSave: (v: Skill[]) => void }) {
  const [list, setList] = useState(items); const [nm, setNm] = useState(""); const [cat, setCat] = useState<Skill["category"]>("Hard Skill"); const [dc, setDc] = useState<string | null>(null);
  const add = () => { if (!nm.trim()) return; const upd = [...list, { id: crypto.randomUUID(), name: nm.trim(), category: cat }]; setList(upd); onSave(upd); setNm(""); };
  const del = (id: string) => { const upd = list.filter((x) => x.id !== id); setList(upd); onSave(upd); setDc(null); };
  return (
    <div className="overflow-y-auto p-6 h-full">
      <div className="flex gap-3 mb-8 flex-wrap">
        <input value={nm} onChange={(e) => setNm(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} className="flex-1 min-w-40 bg-[#141313] border border-white/[0.08] px-4 py-3 text-sm text-white outline-none focus:border-white/30" style={{ fontFamily: "Inter" }} placeholder="New skill…" />
        <select value={cat} onChange={(e) => setCat(e.target.value as Skill["category"])} className="bg-[#141313] border border-white/[0.08] px-4 py-3 text-sm text-white outline-none" style={{ fontFamily: "Inter" }}>{SKILL_CATS.map((c) => <option key={c} value={c} style={{ backgroundColor: "#141313" }}>{c}</option>)}</select>
        <button onClick={add} className="flex items-center gap-2 bg-white text-[#0e0e0e] px-4 py-3 text-xs font-semibold uppercase hover:bg-[#c4c7c8] transition-colors" style={{ fontFamily: "Inter" }}><Plus size={12} /> Add</button>
      </div>
      {SKILL_CATS.map((c) => { const its = list.filter((s) => s.category === c); if (!its.length) return null; return (
        <div key={c} className="mb-8"><p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#8e9192] mb-4 border-b border-white/[0.08] pb-3" style={{ fontFamily: "Inter" }}>{c}</p>
          <div className="flex flex-wrap gap-2">{its.map((sk) => <div key={sk.id} className="flex items-center gap-1 border border-white/[0.1] px-3 py-1.5 group"><span className="text-[13px] text-[#c4c7c8]" style={{ fontFamily: "Inter" }}>{sk.name}</span>{dc === sk.id ? <div className="flex items-center gap-1 ml-2"><button onClick={() => del(sk.id)} className="text-[10px] text-red-400">✓</button><button onClick={() => setDc(null)} className="text-[10px] text-[#444748]">✕</button></div> : <button onClick={() => setDc(sk.id)} className="ml-1 text-[#444748] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={11} /></button>}</div>)}</div>
        </div>
      ); })}
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

type ATab = "hero" | "showcase" | "projects" | "experience" | "education" | "skills" | "achievements" | "organizations";

function AdminPanel({ projects, onSaveProjects, cv, onSaveCV, showcases, onSaveShowcases, heroPhoto, onSaveHero, onClose }: {
  projects: Project[]; onSaveProjects: (p: Project[]) => void;
  cv: CVData; onSaveCV: (cv: CVData) => void;
  showcases: Showcase[]; onSaveShowcases: (s: Showcase[]) => void;
  heroPhoto: string; onSaveHero: (url: string) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<ATab>("hero");
  const tabs: ATab[] = ["hero", "showcase", "projects", "experience", "education", "skills", "achievements", "organizations"];
  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e] flex flex-col overflow-hidden">
      <div className="border-b border-white/[0.08] px-6 py-4 flex items-center justify-between flex-shrink-0 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.1em] uppercase text-[#8e9192]" style={{ fontFamily: "Inter" }}>Admin Panel</span>
          <span className="w-px h-4 bg-white/[0.08]" />
          <span className="text-xs tracking-[0.1em] uppercase text-white" style={{ fontFamily: "Inter" }}>Portfolio Manager</span>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 border border-white/[0.12] text-[#8e9192] px-4 py-2 text-xs tracking-[0.08em] uppercase hover:text-white hover:border-white/30 transition-colors" style={{ fontFamily: "Inter" }}><LogOut size={12} /> Exit</button>
      </div>
      <div className="border-b border-white/[0.08] px-6 flex flex-shrink-0 overflow-x-auto">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className="px-5 py-3 text-xs font-semibold tracking-[0.08em] uppercase border-b-2 transition-colors whitespace-nowrap" style={{ fontFamily: "Inter", borderBottomColor: tab === t ? "#fff" : "transparent", color: tab === t ? "#fff" : "#8e9192" }}>{t}</button>)}
      </div>
      <div className="flex-1 overflow-hidden">
        {tab === "hero" && <AdminHeroPhoto heroPhoto={heroPhoto} onSave={onSaveHero} />}
        {tab === "showcase" && <AdminShowcases showcases={showcases} onSave={onSaveShowcases} />}
        {tab === "projects" && <AdminProjects projects={projects} onSave={onSaveProjects} />}
        {tab === "experience" && <AdminExperience items={cv.experiences} onSave={(v) => onSaveCV({ ...cv, experiences: v })} />}
        {tab === "education" && <AdminEducation items={cv.education} onSave={(v) => onSaveCV({ ...cv, education: v })} />}
        {tab === "skills" && <AdminSkills items={cv.skills} onSave={(v) => onSaveCV({ ...cv, skills: v })} />}
        {tab === "achievements" && <AdminAchievements items={cv.achievements} onSave={(v) => onSaveCV({ ...cv, achievements: v })} />}
        {tab === "organizations" && <AdminOrgs items={cv.organizations} onSave={(v) => onSaveCV({ ...cv, organizations: v })} />}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const { projects, cv, showcases, heroPhoto, ready, saveProjects, saveCV, saveShowcases, saveHeroPhoto } = useData();
  const [active, setActive] = useState("hero");
  const [showLogin, setShowLogin] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const nav = (s: string) => { document.getElementById(s)?.scrollIntoView({ behavior: "smooth", block: "start" }); setActive(s); };
  const openAdmin = () => { if (authed) setShowAdmin(true); else setShowLogin(true); };
  const handleLogin = () => { setAuthed(true); setShowLogin(false); setShowAdmin(true); };
  const closeAdmin = () => { setShowAdmin(false); setAuthed(false); };

  useEffect(() => {
    const sections = ["hero", "work", "showcase", "resume", "about", "services", "contact"];
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  if (!ready) return (
    <div className="fixed inset-0 bg-[#0e0e0e] flex items-center justify-center">
      <div className="text-center"><Loader size={24} className="text-white/30 animate-spin mx-auto mb-4" /><p className="text-xs tracking-[0.1em] uppercase text-[#444748]" style={{ fontFamily: "Inter" }}>Loading</p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] relative">
      <Grid />
      <div className="relative z-10">
        <Nav active={active} onNav={nav} />
        <Hero heroPhoto={heroPhoto} onNav={nav} />
        <Work projects={projects} />
        <ShowcaseSection showcases={showcases} />
        <Resume cv={cv} />
        <About />
        <Services />
        <Contact />
        <Footer onAdmin={openAdmin} />
      </div>
      {showLogin && <AdminLogin onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      {showAdmin && authed && (
        <AdminPanel projects={projects} onSaveProjects={saveProjects} cv={cv} onSaveCV={saveCV} showcases={showcases} onSaveShowcases={saveShowcases} heroPhoto={heroPhoto} onSaveHero={saveHeroPhoto} onClose={closeAdmin} />
      )}
    </div>
  );
}
