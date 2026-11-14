#!/usr/bin/env python3
"""Build one lossless lead composite per review article.

The site's old images were cropped at render time: `.prose img:first-of-type`
forced a 16:9 box with `object-fit: cover`, and the homepage cards forced a
4:3 box the same way. Twenty-one of the 28 hero photos are portrait
(0.50-0.95 wide/tall), so the browser sliced the top and the bottom off
products, badges and spec callouts.

This script writes a NEW file, `lead.jpg`, next to every `hero.jpg`:

    public/images/reviews/<dir>/lead.jpg   1600x900, complete photo inside

`hero.jpg` is never modified - it stays the pristine master used by the OG
generator. The composite contains the whole photo, so the browser can size it
however it likes and nothing can be cut off.

Requires Pillow:
    uv run --with pillow python scripts/build-hero-composites.py
"""

import os
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imagekit

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, "public", "images", "reviews")

W, H = 1600, 900
OUT_NAME = "lead.jpg"
QUALITY = 86


def build(src_path, out_path):
    img = Image.open(src_path).convert("RGB")
    canvas = imagekit.composite(img, W, H)
    canvas.save(out_path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return canvas


def main():
    made = []
    for name in sorted(os.listdir(IMAGES)):
        d = os.path.join(IMAGES, name)
        if not os.path.isdir(d):
            continue
        src = os.path.join(d, "hero.jpg")
        if not os.path.exists(src):
            continue
        out = os.path.join(d, OUT_NAME)
        canvas = build(src, out)
        mode = "scene" if imagekit.is_scene_shot(Image.open(src).convert("RGB")) else "studio"
        made.append((name, mode, canvas.size, os.path.getsize(out)))

    for name, mode, size, size_b in made:
        print(f"{name:34s} {mode:7s} {size[0]}x{size[1]}  {size_b // 1024:4d} KB")
    print(f"composed {len(made)} lead images -> {OUT_NAME}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
