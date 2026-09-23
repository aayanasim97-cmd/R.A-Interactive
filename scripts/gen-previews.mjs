// Generates branded SVG preview placeholders + OG image into /public.
//
// These stand in for the auto-scroll full-page screenshots described in the PRD
// (§6.3 / §9). At build time, replace them with real captures — e.g. Playwright:
//   const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
//   await page.goto(url, { waitUntil: "networkidle" });
//   await page.screenshot({ path: `public/previews/${slug}.png`, fullPage: true });
// then point project.screenshot at the .png. Everything else keeps working.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const projects = [
  {
    slug: "studyforge",
    name: "StudyForge AI",
    domain: "fabolous-ai.vercel.app",
    accent: "#8b5cf6",
    accent2: "#22d3ee",
    tagline: "Your AI study workspace",
    kind: "app",
    nav: ["Tutor", "Summarize", "Recall"],
  },
  {
    slug: "5fourteen",
    name: "5Fourteen",
    domain: "5-fourteen.com",
    accent: "#3b82f6",
    accent2: "#1e40af",
    tagline: "AI strategy & business transformation",
    kind: "corporate",
    nav: ["Services", "Industries", "Insights"],
  },
  {
    slug: "capital",
    name: "Capital Rent A Car",
    domain: "capitalrentacar.pk",
    accent: "#f59e0b",
    accent2: "#b45309",
    tagline: "Self-drive & chauffeur, booked on WhatsApp",
    kind: "local",
    nav: ["Fleet", "Services", "Book"],
  },
  {
    slug: "sherrylane",
    name: "Sherry Lane Dental",
    domain: "sherrylanedental.com",
    accent: "#14b8a6",
    accent2: "#0f766e",
    tagline: "Modern, gentle dental care",
    kind: "corporate",
    nav: ["Services", "Team", "Book"],
  },
  {
    slug: "devoriented",
    name: "Dev Oriented",
    domain: "devoriented.com",
    accent: "#e5e7eb",
    accent2: "#9ca3af",
    tagline: "Your logic, our blueprint.",
    kind: "app",
    nav: ["Work", "Process", "Contact"],
  },
];

const W = 800;
const H = 1600;

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function card(x, y, w, h, r = 12, fill = "#141418", stroke = "#22222a") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
}

function bar(x, y, w, h, fill, r = 4) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
}

function makeSvg(p) {
  const dark = p.kind === "app";
  const bg = dark ? "#0b0b0d" : "#f7f7f9";
  const panel = dark ? "#141418" : "#ffffff";
  const stroke = dark ? "#22222a" : "#e5e7eb";
  const text = dark ? "#f5f5f4" : "#111827";
  const muted = dark ? "#6e6e76" : "#9ca3af";

  let s = "";
  // header
  s += bar(0, 0, W, 64, panel, 0);
  s += `<line x1="0" y1="64" x2="${W}" y2="64" stroke="${stroke}"/>`;
  s += `<circle cx="40" cy="32" r="12" fill="${p.accent}"/>`;
  s += `<text x="62" y="38" font-family="Segoe UI, sans-serif" font-size="18" font-weight="700" fill="${text}">${esc(p.name)}</text>`;
  p.nav.forEach((n, i) => {
    s += `<text x="${W - 230 + i * 78}" y="38" font-family="Segoe UI, sans-serif" font-size="13" fill="${muted}">${esc(n)}</text>`;
  });

  // hero
  const heroGrad = `hero-${p.slug}`;
  s += `<defs><linearGradient id="${heroGrad}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${p.accent}" stop-opacity="0.22"/>
    <stop offset="1" stop-color="${p.accent2}" stop-opacity="0.05"/>
  </linearGradient></defs>`;
  s += bar(0, 64, W, 380, bg, 0);
  s += `<rect x="0" y="64" width="${W}" height="380" fill="url(#${heroGrad})"/>`;
  s += bar(48, 150, 120, 22, dark ? "#1c1c22" : "#eef2ff");
  s += `<text x="60" y="166" font-family="Segoe UI, sans-serif" font-size="11" fill="${p.accent}">${esc(p.domain)}</text>`;
  s += `<text x="48" y="240" font-family="Segoe UI, sans-serif" font-size="42" font-weight="800" fill="${text}">${esc(p.name)}</text>`;
  s += `<text x="48" y="284" font-family="Segoe UI, sans-serif" font-size="20" fill="${muted}">${esc(p.tagline)}</text>`;
  s += bar(48, 320, 160, 46, p.accent, 23);
  s += `<text x="80" y="349" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="${dark ? "#0b0b0d" : "#ffffff"}">Get started</text>`;
  s += bar(224, 320, 150, 46, "none", 23) .replace('fill="none"', `fill="none" stroke="${stroke}"`);

  // feature cards row
  let y = 500;
  for (let i = 0; i < 3; i++) {
    const x = 48 + i * 240;
    s += card(x, y, 208, 180, 14, panel, stroke);
    s += `<circle cx="${x + 32}" cy="${y + 36}" r="16" fill="${p.accent}" opacity="0.2"/>`;
    s += `<circle cx="${x + 32}" cy="${y + 36}" r="7" fill="${p.accent}"/>`;
    s += bar(x + 20, y + 74, 150, 12, dark ? "#26262e" : "#e5e7eb");
    s += bar(x + 20, y + 98, 168, 8, dark ? "#1c1c22" : "#eef0f3");
    s += bar(x + 20, y + 116, 140, 8, dark ? "#1c1c22" : "#eef0f3");
    s += bar(x + 20, y + 134, 160, 8, dark ? "#1c1c22" : "#eef0f3");
  }

  // big showcase panel
  y = 730;
  s += card(48, y, 704, 300, 16, panel, stroke);
  s += `<rect x="48" y="${y}" width="704" height="300" rx="16" fill="url(#${heroGrad})"/>`;
  s += bar(80, y + 40, 260, 18, dark ? "#26262e" : "#e5e7eb");
  s += bar(80, y + 74, 420, 10, dark ? "#1c1c22" : "#eef0f3");
  s += bar(80, y + 96, 380, 10, dark ? "#1c1c22" : "#eef0f3");
  // chart-ish bars
  for (let i = 0; i < 7; i++) {
    const bh = 40 + ((i * 37) % 120);
    s += bar(500 + i * 30, y + 240 - bh, 18, bh, p.accent, 4);
  }

  // stats strip
  y = 1080;
  for (let i = 0; i < 4; i++) {
    const x = 48 + i * 178;
    s += card(x, y, 156, 96, 12, panel, stroke);
    s += `<text x="${x + 20}" y="${y + 46}" font-family="Segoe UI, sans-serif" font-size="26" font-weight="800" fill="${p.accent}">${["2×", "98%", "4.9★", "24/7"][i]}</text>`;
    s += bar(x + 20, y + 62, 100, 8, dark ? "#1c1c22" : "#eef0f3");
  }

  // content rows
  y = 1230;
  s += card(48, y, 340, 250, 14, panel, stroke);
  s += bar(72, y + 30, 200, 16, dark ? "#26262e" : "#e5e7eb");
  for (let i = 0; i < 5; i++) s += bar(72, y + 70 + i * 30, 290 - (i % 2) * 40, 10, dark ? "#1c1c22" : "#eef0f3");
  s += card(412, y, 340, 250, 14, panel, stroke);
  s += `<rect x="412" y="${y}" width="340" height="250" rx="14" fill="url(#${heroGrad})"/>`;
  s += `<circle cx="582" cy="${y + 110}" r="46" fill="${p.accent}" opacity="0.3"/>`;
  s += `<circle cx="582" cy="${y + 110}" r="22" fill="${p.accent}"/>`;

  // footer
  y = 1520;
  s += bar(0, y, W, 80, panel, 0);
  s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${stroke}"/>`;
  s += `<text x="48" y="${y + 46}" font-family="Segoe UI, sans-serif" font-size="13" fill="${muted}">© ${esc(p.name)} — ${esc(p.domain)}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  ${s}
</svg>`;
}

function makeOg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <rect width="1200" height="630" fill="#0b0b0d"/>
  <defs>
    <radialGradient id="g" cx="70%" cy="0%" r="80%">
      <stop offset="0" stop-color="#ffb020" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#ffb020" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffc24b"/><stop offset="1" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="72" y="70" width="150" height="34" rx="17" fill="#141418" stroke="#22222a"/>
  <text x="92" y="93" font-family="Segoe UI, sans-serif" font-size="14" fill="#a8a8ad">WEB DEVELOPMENT AGENCY</text>
  <text x="72" y="250" font-family="Segoe UI, sans-serif" font-size="76" font-weight="800" fill="#f5f5f4">We build websites &amp; apps</text>
  <text x="72" y="340" font-family="Segoe UI, sans-serif" font-size="76" font-weight="800" fill="url(#a)">that get you more customers.</text>
  <text x="72" y="420" font-family="Segoe UI, sans-serif" font-size="30" fill="#a8a8ad">Premium sites with real, interactive live previews.</text>
  <circle cx="96" cy="545" r="20" fill="url(#a)"/>
  <text x="128" y="554" font-family="Segoe UI, sans-serif" font-size="30" font-weight="700" fill="#f5f5f4">RA Interactive</text>
</svg>`;
}

const outDir = "public/previews";
mkdirSync(outDir, { recursive: true });
for (const p of projects) {
  writeFileSync(`${outDir}/${p.slug}.svg`, makeSvg(p));
  console.log(`✓ ${outDir}/${p.slug}.svg`);
}
mkdirSync(dirname("public/og.svg"), { recursive: true });
writeFileSync("public/og.svg", makeOg());
console.log("✓ public/og.svg");
