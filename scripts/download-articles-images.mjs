#!/usr/bin/env node
/**
 * Download Amazon CDN product images for the 18 new articles.
 * Reads docs/usreviews-picks.json, downloads each pick hash at SL1500
 * to public/images/reviews/{article-dir}/{name}.jpg.
 *
 * Run once: `node scripts/download-articles-images.mjs`
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const ROOT = process.cwd();

// article-slug -> image-dir mapping
const SLUG_TO_DIR = {
  'best-coffee-makers': 'coffee-makers',
  'best-drip-coffee-makers': 'drip-coffee-makers',
  'best-pour-over-coffee-makers': 'pour-over-coffee-makers',
  'best-cold-brew-coffee-makers': 'cold-brew-coffee-makers',
  'best-single-serve-coffee-makers': 'single-serve-coffee-makers',
  'best-keurig-coffee-makers': 'keurig-coffee-makers',
  'best-coffee-makers-with-grinder': 'coffee-makers-with-grinder',
  'best-mechanical-keyboards': 'mechanical-keyboards',
  'best-standing-desks': 'standing-desks',
  'best-gaming-chairs': 'gaming-chairs',
  'best-gaming-chairs-under-100': 'gaming-chairs-under-100',
  'best-gaming-chairs-under-150': 'gaming-chairs-under-150',
  'best-gaming-chairs-for-streamers': 'gaming-chairs-for-streamers',
  'best-gaming-chairs-for-heavy-people': 'gaming-chairs-for-heavy-people',
  'best-gaming-chairs-for-good-posture': 'gaming-chairs-for-good-posture',
  'best-gaming-chairs-for-console-players': 'gaming-chairs-for-console-players',
  'best-steak-knife-set': 'steak-knife-set',
  'best-carving-knife-and-fork': 'carving-knife-and-fork',
};

const picks = JSON.parse(readFileSync('docs/usreviews-picks.json', 'utf-8'));

let downloaded = 0;
let skipped = 0;
let failed = 0;

for (const [slug, list] of Object.entries(picks)) {
  const dir = SLUG_TO_DIR[slug];
  if (!dir) continue;
  const targetDir = `public/images/reviews/${dir}`;
  mkdirSync(targetDir, { recursive: true });

  // Hero = first pick
  if (list.length > 0) {
    const heroHash = list[0].hash;
    const heroPath = `${targetDir}/hero.jpg`;
    if (!existsSync(heroPath)) {
      try {
        execSync(`curl -s --max-time 20 -A "Mozilla/5.0" -o "${heroPath}" "https://m.media-amazon.com/images/I/${heroHash}._AC_SL1500_.jpg"`, { stdio: 'pipe' });
        const size = execSync(`stat -c %s "${heroPath}"`).toString().trim();
        if (Number(size) > 1000) {
          downloaded++;
        } else {
          execSync(`rm -f "${heroPath}"`);
          failed++;
        }
      } catch (e) {
        failed++;
      }
    } else {
      skipped++;
    }
  }

  // Picks = rest
  list.forEach((p, idx) => {
    const filename = idx === 0 ? 'hero.jpg' : `pick-${idx}.jpg`;
    const targetPath = `${targetDir}/${filename}`;
    if (existsSync(targetPath)) {
      skipped++;
      return;
    }
    try {
      execSync(`curl -s --max-time 20 -A "Mozilla/5.0" -o "${targetPath}" "https://m.media-amazon.com/images/I/${p.hash}._AC_SL1500_.jpg"`, { stdio: 'pipe' });
      const size = execSync(`stat -c %s "${targetPath}"`).toString().trim();
      if (Number(size) > 1000) {
        downloaded++;
      } else {
        execSync(`rm -f "${targetPath}"`);
        failed++;
      }
    } catch (e) {
      failed++;
    }
  });

  console.log(`${slug}: ${list.length} picks -> ${dir}/`);
}

console.log(`\nDownloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
