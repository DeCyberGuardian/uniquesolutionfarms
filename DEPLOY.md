# Unique Solution Farms — Deployment Guide

This guide describes how we ship the Next.js + Tailwind site to production using **Vercel** (recommended) and how to attach the **Hostinger** domain `uniquesolutionfarms.com`. It also includes an alternative flow for hosting on Hostinger’s Node.js environment.

---

## 0) Quick checklist (pre‑deploy)

* [ ] Local build passes: `npm run build`
* [ ] `content/gallery.json` uses three filters: **Crops & Plants**, **Processing & Packaging**, **Videos**
* [ ] Global nav shows **Gallery** (Blog removed everywhere)
* [ ] About page copy updated; Team section reads from `content/team.json`
* [ ] `public/banners/*` and `public/media/*` files exist and match JSON paths
* [ ] SEO: base `<head>` tags present, OpenGraph images exist, `robots.txt` & `sitemap.xml` in `public/`

---

## 1) Repo & scripts

**Recommended structure** (excerpt):

```
/ content
  ├─ site-config.json
  ├─ products.json
  ├─ gallery.json
  └─ team.json
/ lib
  └─ content.ts
/ public
  ├─ banners/            # hero & gallery images
  └─ media/              # videos + posters
/ pages (or /app)
/ components
/ styles
  └─ globals.css
```

**package.json** scripts (minimum):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p $PORT",
    "lint": "next lint"
  }
}
```

---

## 2) Git push workflow

```bash
# Make sure you’re on main and up to date
git fetch origin
git switch main
git pull --rebase origin main

# Stage, commit, push
git add -A
git commit -m "feat: gallery filters + nav updates; docs: add DEPLOY.md"
git push origin main
```

**Verify on GitHub:** check the commit in the repo and ensure Vercel (if connected) starts a new build.

---

## 3) Deploy with Vercel (recommended)

### A) One-time project setup

1. **Import GitHub repo** in Vercel → New Project → Select `uniquesolutionfarms`.
2. **Framework**: Next.js auto‑detected. No special build command needed (`next build`).
3. **Environment variables** (optional):

   * `NEXT_PUBLIC_SITE_URL=https://uniquesolutionfarms.com`
   * Add any analytics or 3rd‑party keys here (never commit secrets).
4. **Build & Output**: default.

### B) Add the domain

1. Vercel → Project → **Settings → Domains** → Add:

   * `uniquesolutionfarms.com` (set as **Primary**)
   * `www.uniquesolutionfarms.com`
2. **Redirect** `www → apex` (Vercel UI or `vercel.json` below).

### C) Configure DNS at Hostinger (hPanel → Domains → DNS Zone)

* **A (apex)**: `@ → 76.76.21.21`
* **CNAME (www)**: `www → cname.vercel-dns.com`
* Remove conflicting A/AAAA/CNAME records for `@` or `www`.

**Verify propagation:**

```bash
dig +short uniquesolutionfarms.com
# should show 76.76.21.21

dig +short www.uniquesolutionfarms.com CNAME
# should show cname.vercel-dns.com
```

### D) Optional: `vercel.json` for redirects & headers

Create `vercel.json` at the repo root:

```json
{
  "redirects": [
    { "source": "/", "has": [{"type":"host","value":"www.uniquesolutionfarms.com"}], "destination": "https://uniquesolutionfarms.com", "permanent": true }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    }
  ]
}
```

---

## 4) Alternative: Host directly on Hostinger (Node.js)

> Use this only if you can’t use Vercel. Hostinger’s Node panel will run `next start` behind their proxy.

1. **Node app** in hPanel → select Node version (>= 18).
2. **Install & build:** `npm ci && npm run build`.
3. **Start:** `npm run start` (Hostinger sets `$PORT`). If they require an entry file, add `server.js`:

```js
// server.js
const { createServer } = require('http');
const next = require('next');
const app = next({ dev: false });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log('> Ready on port', port);
  });
});
```

Set `"start": "NODE_ENV=production node server.js"` in `package.json`.

4. **Domain mapping**: hPanel → point `uniquesolutionfarms.com` to the Node app; ensure free SSL is enabled.

---

## 5) Post‑deploy QA

* **Canonical & redirects**: `www` redirects to apex, HTTP→HTTPS
* **SEO basics**: title/description per page; OpenGraph/Twitter meta; valid OG image
* **Sitemaps**: `public/robots.txt` and `public/sitemap.xml` exist
* **Gallery**: tabs render: Crops & Plants, Processing & Packaging, Videos; search/tags work; lightbox ok
* **Hero**: Ken Burns slider loops, no CLS; images reasonably compressed
* **Core Web Vitals**: Largest images use `<Image>` or are properly sized

---

## 6) Troubleshooting

* **DNS not resolving:** flush DNS and wait up to a few hours; confirm records match above.
* **White page / 500 on Hostinger:** ensure `npm run build` ran; check Node version; confirm `server.js` entry.
* **OG not showing in socials:** wait for cache, or use each platform’s URL debugger; ensure absolute OG image URL.
* **Large repo size:** put heavy videos under `/public/media` (static) or a CDN; avoid committing raw 4K clips.

---

## 7) Rollback

* **Vercel:** Project → Deployments → Promote a previous successful build.
* **Git:** `git revert <SHA>` to undo a bad commit and push again.

---

## 8) Useful commands

```bash
# Check remote vs local
git log origin/main -1 --stat

git log --oneline origin/main..HEAD   # to be pushed

git log --oneline HEAD..origin/main   # to be pulled

# Local build test
npm run build

# Tailwind class scan (Next.js 13+): ensure content globs are correct in tailwind.config.js
```
