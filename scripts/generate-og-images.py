#!/usr/bin/env python3
"""Generate the site's Open Graph / Twitter card images.

Every review page points its og:image at /og/<slug>.png. Without those files
the whole site shipped 404 social previews, so this script builds one card per
article from that article's own hero photo, plus a site-wide default card.

Requires Pillow:
    uv run --with pillow python scripts/generate-og-images.py

Run from the repository root.
"""

import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REVIEWS = os.path.join(ROOT, "src", "content", "reviews")
IMAGES = os.path.join(ROOT, "public", "images", "reviews")
OUT = os.path.join(ROOT, "public", "og")

W, H = 1200, 630
MARGIN = 72
MAX_TITLE_LINES = 3

FONT_DIR = "C:/Windows/Fonts"
SERIF_BOLD = os.path.join(FONT_DIR, "georgiab.ttf")
SANS_BOLD = os.path.join(FONT_DIR, "arialbd.ttf")
SANS = os.path.join(FONT_DIR, "arial.ttf")

ACCENT = (147, 197, 253)  # light blue, readable on the dark scrim
WHITE = (255, 255, 255)
MUTED = (203, 213, 225)


def read_frontmatter(path):
    """Return (title, category) from a markdown file's frontmatter."""
    text = open(path, encoding="utf-8").read()
    if not text.startswith("---"):
        return None, None
    block = text.split("---", 2)[1]
    title = re.search(r'^title:\s*["\']?(.*?)["\']?\s*$', block, re.M)
    category = re.search(r'^category:\s*["\']?(.*?)["\']?\s*$', block, re.M)
    return (
        title.group(1).strip() if title else None,
        category.group(1).strip() if category else None,
    )


def article_image_dirs():
    """Parse the slug -> image directory map straight out of ArticleCard.astro."""
    source = open(
        os.path.join(ROOT, "src", "components", "ArticleCard.astro"), encoding="utf-8"
    ).read()
    block = source.split("ARTICLE_TO_IMAGE_DIR", 1)[1].split("};", 1)[0]
    return dict(re.findall(r"'([^']+)'\s*:\s*'([^']+)'", block))


def cover(img, width, height):
    """Scale and centre-crop to exactly width x height."""
    sw, sh = img.size
    scale = max(width / sw, height / sh)
    nw, nh = int(sw * scale + 0.5), int(sh * scale + 0.5)
    img = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - width) // 2
    top = (nh - height) // 2
    return img.crop((left, top, left + width, top + height))


def scrim(img):
    """Darken the frame, deepen the lower-left corner for the headline, and shade
    the top band so the wordmark and category eyebrow stay legible even when the
    hero image is pale in that corner."""
    base = img.convert("RGB")
    veil = Image.new("RGB", base.size, (8, 12, 20))
    base = Image.blend(base, veil, 0.34)

    dark = Image.new("RGB", base.size, (6, 10, 18))

    grad = Image.new("L", (1, base.size[1]))
    for y in range(base.size[1]):
        t = y / max(1, base.size[1] - 1)
        grad.putpixel((0, y), int(235 * max(0.0, (t - 0.18) / 0.82) ** 1.35))
    grad = grad.resize(base.size)
    base = Image.composite(dark, base, grad)

    top = Image.new("L", (1, base.size[1]))
    for y in range(base.size[1]):
        t = y / max(1, base.size[1] - 1)
        top.putpixel((0, y), int(185 * max(0.0, (0.36 - t) / 0.36) ** 1.1))
    top = top.resize(base.size)
    return Image.composite(dark, base, top)


def wrap(draw, text, font, max_width):
    """Wrap text to max_width. Returns (lines, truncated)."""
    words = text.split()
    lines, current = [], ""
    for word in words:
        trial = (current + " " + word).strip()
        if draw.textlength(trial, font=font) <= max_width or not current:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    truncated = len(lines) > MAX_TITLE_LINES
    if truncated:
        lines = lines[:MAX_TITLE_LINES]
        while draw.textlength(lines[-1] + "…", font=font) > max_width and lines[-1]:
            lines[-1] = lines[-1][:-1]
        lines[-1] = lines[-1].rstrip() + "…"
    return lines, truncated


def fit_title(draw, text, max_width):
    """Return (font, lines, line_height) using the largest size that fits."""
    for size in (60, 54, 48, 42, 38, 34, 30):
        font = ImageFont.truetype(SERIF_BOLD, size)
        lines, truncated = wrap(draw, text, font, max_width)
        if not truncated:
            return font, lines, int(draw.textbbox((0, 0), "Ag", font=font)[3] * 1.18)
    font = ImageFont.truetype(SERIF_BOLD, 30)
    lines, _ = wrap(draw, text, font, max_width)
    return font, lines, 36


def build_card(hero_path, title, category):
    img = cover(Image.open(hero_path), W, H)
    canvas = scrim(img)
    draw = ImageDraw.Draw(canvas)

    eyebrow_font = ImageFont.truetype(SANS_BOLD, 24)
    brand_font = ImageFont.truetype(SERIF_BOLD, 30)

    draw.text((MARGIN, 46), "SOURCEDREVIEWS", font=brand_font, fill=WHITE)
    draw.rectangle(
        [MARGIN, 92, MARGIN + 52, 96], fill=(96, 165, 250)
    )
    if category:
        draw.text((MARGIN, 116), category.upper(), font=eyebrow_font, fill=ACCENT)

    font, lines, line_h = fit_title(draw, title, W - 2 * MARGIN)
    y = H - MARGIN - len(lines) * line_h - 14
    for line in lines:
        draw.text((MARGIN, y), line, font=font, fill=WHITE)
        y += line_h

    return canvas


def build_default():
    canvas = Image.new("RGB", (W, H), (12, 18, 30))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle([0, 0, W, 10], fill=(37, 99, 235))
    draw.rectangle([0, H - 10, W, H], fill=(37, 99, 235))

    title_font = ImageFont.truetype(SERIF_BOLD, 78)
    sub_font = ImageFont.truetype(SANS, 32)
    tagline = "Independent reviews, sourced from published testing"

    draw.text((MARGIN, 236), "Sourcedreviews", font=title_font, fill=WHITE)
    draw.text((MARGIN, 350), tagline, font=sub_font, fill=MUTED)
    draw.rectangle([MARGIN, 330, MARGIN + 60, 334], fill=(96, 165, 250))
    return canvas


def main():
    os.makedirs(OUT, exist_ok=True)
    dirs = article_image_dirs()

    made = 0
    missing = []
    for name in sorted(os.listdir(REVIEWS)):
        if not name.endswith(".md"):
            continue
        slug = name[:-3]
        title, category = read_frontmatter(os.path.join(REVIEWS, name))
        if not title:
            missing.append(slug)
            continue
        image_dir = dirs.get(slug)
        hero = os.path.join(IMAGES, image_dir, "hero.jpg") if image_dir else None
        if not hero or not os.path.exists(hero):
            missing.append(slug)
            hero = None
        if hero:
            card = build_card(hero, title, category)
        else:
            card = build_default()
            draw = ImageDraw.Draw(card)
            font = ImageFont.truetype(SERIF_BOLD, 54)
            draw.text((MARGIN, 250), title, font=font, fill=WHITE)
        card.save(os.path.join(OUT, f"{slug}.png"), "PNG", optimize=True)
        made += 1

    build_default().save(os.path.join(ROOT, "public", "og-default.png"), "PNG", optimize=True)
    print(f"generated {made} og cards + public/og-default.png")
    if missing:
        print("no hero image for:", ", ".join(missing))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
