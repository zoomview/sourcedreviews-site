// Generates public/sitemap.xml by scanning src/content/reviews/*.md for frontmatter.
// Runs automatically before `astro build` and `astro dev` (see package.json prebuild/predev).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = 'https://sourcedreviews.com';
const TODAY = new Date().toISOString().split('T')[0];

// Static pages — priority reflects editorial weight.
const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/about/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/our-method/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/editorial-policy/', priority: '0.4', changefreq: 'monthly' },
  { loc: '/authors/', priority: '0.4', changefreq: 'monthly' },
  { loc: '/affiliate-disclosure/', priority: '0.4', changefreq: 'monthly' },
  { loc: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
  { loc: '/contact/', priority: '0.5', changefreq: 'yearly' },
];

// Articles — read frontmatter `date` field; fallback to file mtime.
const articlesDir = path.join(__dirname, '..', 'src', 'content', 'reviews');
const articleFiles = fs.existsSync(articlesDir)
  ? fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
  : [];

const articles = articleFiles.map(f => {
  const fullPath = path.join(articlesDir, f);
  const content = fs.readFileSync(fullPath, 'utf8');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  let lastmod = TODAY;
  if (fmMatch) {
    const dateMatch = fmMatch[1].match(/^date:\s*(\S+)/m);
    if (dateMatch) lastmod = dateMatch[1];
  } else {
    const mtime = fs.statSync(fullPath).mtime;
    lastmod = mtime.toISOString().split('T')[0];
  }
  const slug = f.replace(/\.md$/, '');
  return {
    loc: `/reviews/${slug}/`,
    lastmod,
    changefreq: 'monthly',
    priority: '0.8',
  };
});

const allUrls = [
  ...staticPages.map(p => ({ ...p, lastmod: TODAY })),
  ...articles,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`[sitemap] generated ${allUrls.length} URLs (${articles.length} articles + ${staticPages.length} static) -> public/sitemap.xml`);