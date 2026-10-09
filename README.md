# Fonlon Hari Michel (MicWrites) — Official Links Hub

An ultra-sleek, bespoke bio-links hub and credentials portfolio for **Fonlon Hari Michel (MicWrites)** — author, storyteller, and creative strategist.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, and Lucide Icons.

---

## ✨ Features

- **Theme Toggle**: Switch seamlessly between the default luxury **Dark Theme** (deep obsidian `#050505` with warm gold accents and crisp white highlights) and a **High-Contrast Light Theme** (pristine canvas with high-legibility onyx typography and antique gold accents). Theme preference is preserved across visits via `localStorage`.
- **Informative Link Cards**: Every link card provides full context — including category tags, destination handles, titles, and straight-to-the-point descriptions.
- **One-Click Clipboard Copy**: Copy phone numbers, profile handles, or URLs instantly with visual confirmation feedback.
- **Save Contact (vCard .vcf)**: Generates and downloads a complete `.vcf` contact card directly into phone address books with phone (`+237 655 173 747`), WhatsApp, and executive profile details.
- **Share Hub & QR Code Generator**: Generates a high-contrast QR code for in-person networking and conferences, paired with Web Share API integration.
- **Interactive Filtering & Search**: Instant real-time search and segmented tab filtering (*All*, *Direct Reach*, *Creative*, *Career & CV*).

---

## 🚀 GitHub Deployment (Ready out-of-the-box)

The project is pre-configured for seamless GitHub Pages deployment:

### Method 1: Automatic GitHub Actions (Recommended)

1. Push this repository to GitHub on branch `main` or `master`.
2. On GitHub, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! Every push to `main` automatically runs `.github/workflows/deploy.yml` and publishes your site with relative asset paths.

### Method 2: Manual Build

```bash
# Install dependencies
npm install

# Build static assets (outputs to ./dist)
npm run build

# Preview build locally
npm run preview
```

---

## 🛠️ Development

```bash
# Start dev server on port 3000
npm run dev

# Run TypeScript checks
npm run lint
```

---

## 📄 License & Credits

© 2026 Fonlon Hari Michel (MicWrites). All rights reserved.
