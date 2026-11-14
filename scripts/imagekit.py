#!/usr/bin/env python3
"""Shared helpers for lossless review-image composites.

The site's images used to be cropped at render time: `.prose img:first-of-type`
forced a 16:9 box with `object-fit: cover`, and the homepage cards forced a
4:3 box the same way. Twenty-one of the 28 hero photos are portrait
(0.50-0.95 wide/tall), so the browser sliced the top and the bottom off
products, badges, spec callouts and box-content captions.

A "lossless composite" is a landscape frame that holds the COMPLETE photo:

    background : a soft sweep in the photo's own background colour for
                 studio product shots, or a blurred version of the photo
                 itself for full-bleed scene shots
    foreground : the complete photo, scaled to fit and centred

Nothing is trimmed and nothing is cropped. A white studio margin simply
merges into the white sweep, so the result reads as a clean catalogue shot
with no rectangle seam and no missing content.
"""

from PIL import Image, ImageEnhance, ImageFilter

FG_SCALE = 0.94  # foreground occupies at most this share of the frame
TOL = 24  # colour distance treated as "same as the background"


def ring_pixels(img, ratio=0.03):
    """Pixels from the outer ring of the photo."""
    small = img.copy()
    small.thumbnail((260, 260))
    sw, sh = small.size
    band = max(1, int(min(sw, sh) * ratio))
    px = small.load()
    pts = []
    for x in range(sw):
        for y in range(band):
            pts.append(px[x, y])
            pts.append(px[x, sh - 1 - y])
    for y in range(sh):
        for x in range(band):
            pts.append(px[x, y])
            pts.append(px[sw - 1 - x, y])
    return pts


def is_scene_shot(img, tol=TOL):
    """True for full-bleed scene photos.

    A studio product shot has a plain bright backdrop all around, so most of
    the outer ring is one light colour. A scene photo has a dark or varied
    border - hair, a kitchen, a tablet render on a gradient.
    """
    pts = ring_pixels(img)
    if not pts:
        return True
    bright = [p for p in pts if min(p) >= 190]
    if not bright:
        return True
    med = []
    for c in range(3):
        vals = sorted(p[c] for p in bright)
        med.append(vals[len(vals) // 2])
    same = sum(1 for p in bright if max(abs(p[i] - med[i]) for i in range(3)) <= tol)
    return not ((len(bright) / len(pts)) >= 0.60 and (same / len(bright)) >= 0.55)


def sweep_color(img):
    """The photo's own background colour.

    Studio product shots have a plain white (or near white) backdrop, so the
    sweep is taken from the bright pixels along the outer ring. That is the
    colour the photo's margin already is, which is what makes the transition
    seamless.
    """
    pts = ring_pixels(img)
    bright = [p for p in pts if min(p) >= 196]
    pool = bright if bright else pts
    chans = []
    for c in range(3):
        vals = sorted(p[c] for p in pool)
        chans.append(vals[len(vals) // 2])
    return tuple(chans)


def sweep_backdrop(img, width, height):
    """A soft studio sweep with a gentle vignette, in the photo's own colour."""
    c = sweep_color(img)
    bg = Image.new("RGB", (width, height), c)

    small = Image.new("L", (64, 36), 0)
    sp = small.load()
    for y in range(36):
        for x in range(64):
            dx = (x - 31.5) / 31.5
            dy = (y - 17.5) / 17.5
            r = (dx * dx + dy * dy) ** 0.5
            sp[x, y] = int(max(0.0, min(1.0, (r - 0.30) / 0.80)) * 26)
    vignette = small.resize((width, height), Image.BILINEAR)
    darker = Image.new("RGB", (width, height), tuple(max(0, v - 24) for v in c))
    return Image.composite(darker, bg, vignette)


def cover_fit(img, width, height):
    """Scale and centre-crop to exactly width x height. Backdrops only."""
    sw, sh = img.size
    scale = max(width / sw, height / sh)
    nw, nh = int(sw * scale + 0.5), int(sh * scale + 0.5)
    img = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - width) // 2
    top = (nh - height) // 2
    return img.crop((left, top, left + width, top + height))


def scene_backdrop(img, width, height, darken=1.0):
    """A blurred version of the photo itself."""
    bg = cover_fit(img, width, height)
    bg = bg.filter(ImageFilter.GaussianBlur(radius=max(12, int(max(width, height) / 20))))
    if darken != 1.0:
        bg = ImageEnhance.Brightness(bg).enhance(darken)
    return bg


def fit_box(img, box, scale=1.0, align="center"):
    """Scale the whole photo to fit inside box = (x0, y0, x1, y1).

    Returns (resized_image, x, y). The photo is never cropped.
    """
    x0, y0, x1, y1 = box
    box_w, box_h = x1 - x0, y1 - y0
    fit = min(box_w / img.width, box_h / img.height) * scale
    nw = max(1, int(img.width * fit + 0.5))
    nh = max(1, int(img.height * fit + 0.5))
    small = img.resize((nw, nh), Image.LANCZOS)
    if align == "right":
        x = x1 - nw
    elif align == "left":
        x = x0
    else:
        x = x0 + (box_w - nw) // 2
    return small, x, y0 + (box_h - nh) // 2


def composite(img, width, height, scene=None, fg_box=None, fg_scale=None,
              backdrop=None, darken=1.0, fg_align="center"):
    """Build a lossless frame that contains the complete photo.

    scene:    True for full-bleed scene photos (blurred backdrop),
              False for studio product shots (sweep backdrop).
              Auto-detected when None.
    fg_box:   optional (x0, y0, x1, y1) region the photo may occupy - the OG
              card uses it so the headline never covers the product.
    backdrop: 'sweep', 'blur' or None (auto).
    darken:   darkening applied to a blurred backdrop.
    """
    img = img.convert("RGB")
    if scene is None:
        scene = is_scene_shot(img)
    if backdrop == "blur":
        bg = scene_backdrop(img, width, height, darken=darken)
    elif backdrop == "sweep":
        bg = sweep_backdrop(img, width, height)
    else:
        bg = scene_backdrop(img, width, height, darken=darken) if scene else sweep_backdrop(img, width, height)

    scale = fg_scale if fg_scale else FG_SCALE
    if fg_box:
        fg, x0, y0 = fit_box(img, fg_box, scale, align=fg_align)
    else:
        fg, x0, y0 = fit_box(img, (0, 0, width, height), scale)

    canvas = bg.copy()
    canvas.paste(fg, (x0, y0))
    return canvas
