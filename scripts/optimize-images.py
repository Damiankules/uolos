"""Create responsive variants for every .webp in public/images.

For each original x.webp it writes x.avif plus x-w480/-w640/-w960 (.webp and
.avif, only widths smaller than the original) and records sizes in
src/data/images.json, which <Picture> uses for srcset.

Usage (after adding new photos as .webp):  npm run images
Requires Pillow with AVIF support (Pillow >= 11).
"""
import json, os
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "public")
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "data", "images.json")
WIDTHS = (480, 640, 960)

def is_variant(name):
    stem = name.rsplit(".", 1)[0]
    return any(stem.endswith(f"-w{w}") for w in WIDTHS) or stem == "band-texture"

sizes = {}
for root, _, files in os.walk(os.path.join(ROOT, "images")):
    for f in sorted(files):
        if not f.endswith(".webp") or is_variant(f):
            continue
        path = os.path.join(root, f)
        base = path[:-5]
        im = Image.open(path).convert("RGB")
        W, H = im.size
        widths = [w for w in WIDTHS if w < W * 0.9]
        if not os.path.exists(base + ".avif"):
            im.save(base + ".avif", "AVIF", quality=55, speed=4)
        for w in widths:
            if os.path.exists(f"{base}-w{w}.avif"):
                continue
            r = im.resize((w, round(H * w / W)), Image.LANCZOS)
            r.save(f"{base}-w{w}.webp", "WEBP", quality=78, method=6)
            r.save(f"{base}-w{w}.avif", "AVIF", quality=55, speed=4)
        url = "/" + os.path.relpath(path, ROOT).replace(os.sep, "/")
        sizes[url] = {"w": W, "h": H, "widths": widths}
        print(url, f"{W}x{H}", widths)

with open(OUT, "w") as fh:
    json.dump(sizes, fh, indent=1)
