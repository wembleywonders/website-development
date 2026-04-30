# Image Deployment — Known Issues and Solutions
## Wembley Wonders CIC · Recorded March 2026

---

## Problem: Updated image not showing after deployment

### Symptoms
- New image deployed to VPS
- Browser still shows old image after Ctrl+Shift+R hard refresh
- Live site and localhost both showing stale version

### Root causes (three separate problems, all can occur independently)

---

### Root Cause 1 — Source file not actually updated

**What happened:**
`src/pages/AboutUsPage.tsx` still referenced the old filename even after
downloading and copying a new version. The `cp` command was run but an
earlier version of the file was already in the downloads folder, or the
file was copied before the filename change was made.

**How to diagnose:**
```bash
grep 'judith' src/pages/AboutUsPage.tsx
```
If this shows the old filename, the source was never updated.

**Fix:**
```bash
# Replace filename directly in source
sed -i 's|old-filename.jpg|new-filename.png|g' src/pages/AboutUsPage.tsx

# Verify the change
grep 'judith' src/pages/AboutUsPage.tsx
```

---

### Root Cause 2 — Vite not regenerating the bundle

**What happened:**
Because the source file content had not changed between builds, Vite
produced an identical JS bundle with the same content hash
(e.g. `index-90c166f7.js`). The browser had this bundle cached and
never fetched the new one — so the old image filename was still being
served even after deployment.

**How to diagnose:**
```bash
# Check what filename the live bundle actually references
ssh root@204.168.155.15 "grep -o 'judith[^\"]*' /var/www/wembleywonders/assets/js/index-*.js | head -5"
```
If this shows the old filename, the bundle was not regenerated.

**Fix:**
```bash
# Delete dist entirely to force full rebuild
rm -rf dist

# Rebuild — new hash will be generated
npm run build && scp -r dist/* root@204.168.155.15:/var/www/wembleywonders/ && ssh root@204.168.155.15 "systemctl reload nginx && echo 'LIVE'"
```
The new bundle will have a different hash (e.g. `index-86ee3b51.js`)
which the browser has never seen — it loads fresh automatically.

---

### Root Cause 3 — Dead space in the image causing CSS crop failures

**What happened:**
The source photo (Judith's cutout PNG) had 121 pixels of pure black
dead space above her face. Every CSS approach to positioning
(`object-position` percentages, fixed heights, `aspect-ratio`) behaved
differently depending on card width — at some widths it showed the
dead space, at others it cropped into the face. No CSS value worked
consistently across all screen sizes.

**How to diagnose:**
```bash
python3 -c "
from PIL import Image
import numpy as np
img = Image.open('photo.png')
arr = np.array(img)
mask = (arr[:,:,0] > 20) | (arr[:,:,1] > 20) | (arr[:,:,2] > 20)
rows = np.any(mask, axis=1)
rmin = np.where(rows)[0][0]
print(f'Face starts at row {rmin} of {img.size[1]} — {rmin/img.size[1]*100:.0f}% dead space above')
"
```
If face starts more than 5% down the image, remove the dead space.

**Fix — remove dead space from the image in Python:**
```bash
python3 -c "
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np, os

img = Image.open('source-photo.png').convert('RGBA')
arr = np.array(img)

# Remove ONLY pure black pixels (threshold 8) — preserves dark skin/hair/jacket
black_bg = (arr[:,:,0] <= 8) & (arr[:,:,1] <= 8) & (arr[:,:,2] <= 8)
arr[black_bg, 3] = 0

# Crop to face bounding box
visible = arr[:,:,3] > 0
rows = np.any(visible, axis=1)
cols = np.any(visible, axis=0)
rmin, rmax = np.where(rows)[0][[0,-1]]
cmin, cmax = np.where(cols)[0][[0,-1]]

pad = 10
face = Image.fromarray(arr).crop((
    max(0, cmin-pad), max(0, rmin-pad),
    min(arr.shape[1], cmax+pad), min(arr.shape[0], rmax+pad)
))

# Scale to 500px wide
w, h = face.size
face = face.resize((500, int(h*500/w)), Image.LANCZOS)
face.save('judith-v4.png', 'PNG', optimize=True)
print(f'Done: {face.size}')
"
```

**Key threshold:** Use `<= 8` not `< 30` for black removal.
`< 30` removes dark skin pixels and creates white holes in the face.
`<= 8` only removes pure black background.

**CSS after fixing the image:**
```css
.founderImg {
  width: 100%;
  height: 100%;
  object-fit: contain;      /* NOT cover — contain shows full image always */
  object-position: center bottom;
}
```

---

### Rule: always version image filenames when replacing

The Vite build system auto-hashes JS and CSS files but NOT files
in `/public/images/` — these are served directly by Nginx.

**Always rename when replacing a public image:**
```
judith-fontanelle.jpg  →  judith-v2.jpg  →  judith-v3.jpg  →  judith-v4.png
```

**And always clean up old versions from both places:**
```bash
# Local
rm public/images/judith-fontanelle.jpg
rm public/images/judith-fontanelle-v2.jpg
rm public/images/judith-fontanelle-v3.jpg

# VPS
ssh root@204.168.155.15 "cd /var/www/wembleywonders/images && rm -f judith-fontanelle.jpg judith-fontanelle-v2.jpg judith-fontanelle-v3.jpg"
```

---

### Diagnosis checklist (run in order)

```bash
# 1. What does the source file actually say?
grep 'judith' src/pages/AboutUsPage.tsx

# 2. What does the live bundle actually say?
ssh root@204.168.155.15 "grep -o 'judith[^\"]*' /var/www/wembleywonders/assets/js/index-*.js | head -5"

# 3. What files are on the VPS?
ssh root@204.168.155.15 "ls /var/www/wembleywonders/images/"

# 4. What files are in local public?
ls public/images/
```

If 1 and 2 match and the file exists on the VPS, the image is correct
and any remaining issue is browser cache — open a fresh tab (not refresh).

---

*Recorded after resolving Judith Fontanelle portrait display issue,*
*About page, March 2026. Three builds, five filename iterations,*
*one Python image processing fix. Perseverance pays.*
