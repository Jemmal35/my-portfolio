# Jemmal Ali – Portfolio

Static portfolio site (HTML, CSS, vanilla JS). No build step.

## Structure
- `index.html`: page markup and SEO/social metadata
- `style.css`: design tokens (dark and light themes) and all styles
- `script.js`: theme toggle, menu, skills/approach tabs, form
- `assets/`: images (optimized), icons, favicon, `resume.pdf`

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Push to GitHub
Copy these files into your existing portfolio repo folder (keep its `.git`), then:
```bash
git add -A
git commit -m "Redesign portfolio: navy/cyan theme with light and dark modes"
git push
```
Vercel redeploys automatically if the repo is connected.

## Editing
- Colors: the `--color-*` variables at the top of `style.css`
- Project images: `assets/images/projects/` (keep the same file names, or update `index.html`)
- Contact form: opens the visitor's email app (mailto). For direct sending, connect a form service such as Formspree.
