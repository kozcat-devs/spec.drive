# spec.drive — multi-page rebuild

## What changed
- Split into real pages: `index.html`, `about.html`, `library.html`, `brand.html`, `car.html`
  (no more JS view-swapping — these are actual separate URLs now).
- `brand.html?name=Nissan` and `car.html?id=nissan-gtr-r35` read the brand/car from the URL.
- Shared header/footer/nav, translations, data loading, and animations live in
  `assets/js/app.js` so you don't repeat that code five times.
- Hero background is now the GT-R photo you sent (`assets/img/hero-gtr.jpg`) with a slow
  Ken Burns zoom instead of the video.
- New interactive touches: scroll-reveal on sections, card hover lift + glow, animated
  nav underline, a "livery stripe" divider that draws itself in on scroll, country filter
  chips on the Library page, a back-to-top button, and loading skeletons while data.json fetches.

## What YOU need to do before pushing
1. **Replace the sample data.** `data/cars.json` and `data/brands.json` in this zip are
   placeholders (just Nissan GT-R, Pagani Huayra R, Koenigsegg Sadair's Spear as examples).
   Swap in your real `cars.json` / `brands.json` — the format is identical to what you had before,
   so it's a straight drop-in.
2. **Add your logo.** Put your logo file at `assets/img/logo.png`. If it's missing, the header
   just quietly hides the image and shows the text logo — no broken-image icon.
3. **Car images.** Each car object has an `"image"` field (a path like `assets/img/cars/whatever.jpg`).
   Add that folder and drop your car photos in — same as your old setup.

## File map
```
index.html            → home page (hero, search, featured strip)
about.html             → about page
library.html           → brand grid + country filter
brand.html              → model list for one brand (?name=Nissan)
car.html                → full spec sheet for one car (?id=nissan-gtr-r35)
assets/css/style.css    → shared design tokens + animations
assets/js/app.js        → header/footer, i18n, data loading, scroll reveal (shared)
assets/js/home.js       → home page logic
assets/js/library.js    → library page logic
assets/js/brand.js      → brand page logic
assets/js/car.js        → car page logic
data/cars.json          → your car database (replace with the real one)
data/brands.json        → your brand list (replace with the real one)
```

## Reminder
Same as before — `fetch()` needs the site served over http(s). Opening `index.html`
by double-clicking (file://) will fail with a CORS error. Test on GitHub Pages or
run a local server (`python3 -m http.server`) to preview.
