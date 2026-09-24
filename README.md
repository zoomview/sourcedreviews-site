# Sourcedreviews

Static review publication built with [Astro](https://astro.build) and deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Framework:** Astro 4 (static output)
- **Hosting:** Cloudflare Pages (free tier)
- **Domain:** sourcedreviews.com (registered with Cloudflare Registrar)
- **Email routing:** Cloudflare Email Routing → forwarded to your personal email
- **Analytics:** None yet (recommend adding Plausible or Cloudflare Web Analytics)
- **Content:** Astro content collections (markdown in `src/content/reviews/`)

## Project layout

```
sourcedreviews-site/
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── README.md
├── public/
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── styles/
    │   └── global.css
    ├── layouts/
    │   └── BaseLayout.astro
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── Disclosure.astro
    │   └── ArticleCard.astro
    ├── content/
    │   ├── config.ts
    │   └── reviews/
    │       └── best-mechanical-keyboards-2026.md
    └── pages/
        ├── index.astro
        ├── about.astro
        ├── editorial-policy.astro
        ├── our-method.astro
        ├── authors.astro
        ├── affiliate-disclosure.astro
        ├── privacy-policy.astro
        ├── contact.astro
        └── reviews/
            └── [slug].astro
```

## Local development

Requires Node 20+.

```bash
cd sourcedreviews-site
npm install
npm run dev          # http://localhost:4321
```

## Adding a new review

1. Create a new file in `src/content/reviews/`. The filename becomes the URL slug.
2. Add frontmatter matching the schema in `src/content/config.ts`:
   ```yaml
   ---
   title: "..."
   summary: "..."
   category: "Tech"
   date: 2026-09-24
   author: "Daniel Reeves"
   ---
   ```
3. The article appears on the home page automatically (sorted by date desc).

## Building

```bash
npm run build
```

Output goes to `dist/`.

## Pushing to your GitHub repo

```bash
cd sourcedreviews-site
git init
git add .
git commit -m "Initial scaffold"
git branch -M main
git remote add origin https://github.com/zoomview/sourcedreviews-site.git
git push -u origin main
```

## Cloudflare Pages setup

1. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select `zoomview/sourcedreviews-site`.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** `NODE_VERSION` = `20`
4. Click **Save and Deploy**. The first deploy runs immediately.
5. After deploy, in **Custom domains** → **Set up a custom domain** → enter `sourcedreviews.com`. Cloudflare handles the rest because DNS already points to Cloudflare nameservers.

## Cloudflare Email Routing

1. Cloudflare Dashboard → **Email** → **Email Routing** → **Routes**.
2. Click **Create address** (or **Edit catch-all rule**).
3. **Catch-all address** → action **Forward to** → select `zoomview@163.com` (already verified).
4. Save.

Now `contact@sourcedreviews.com` (and any other `*@sourcedreviews.com`) lands in your 163 inbox.

## Search console submission

After first deploy:

1. **Google Search Console** (search.google.com/search-console) → Add property → URL prefix → `https://sourcedreviews.com` → verify via DNS TXT record (Cloudflare makes this easy).
2. Submit sitemap: `https://sourcedreviews.com/sitemap-index.xml`.
3. **Bing Webmaster Tools** (bing.com/webmasters) → Import from Google Search Console (one-click).

## Editing content

All copy lives in `src/pages/*.astro` (compliance pages) and `src/content/reviews/*.md` (articles). Each file is plain Markdown inside an Astro template — edit, save, push, Cloudflare auto-deploys.

The disclosure wording is in:

- `src/components/Disclosure.astro` — top bar shown on every page
- `src/pages/affiliate-disclosure.astro` — full disclosure page

## Adding the affiliate link tags

This site is set up to receive links with parameters (e.g., `amazon.com/...?maas=...&tag=...&ascsubtag=...`) but the per-product link generation lives outside this scaffold. When you write an article, drop the product link (with your affiliate parameters) into the body markdown.

## License

Content is © Sourcedreviews. Code in this repo is free to reuse for similar editorial sites.