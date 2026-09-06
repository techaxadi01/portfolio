# Personal Portfolio

🚀 **Live Demo:** [https://portfolio-techax-adi.vercel.app/](https://portfolio-techax-adi.vercel.app/)

A modern, high-performance personal developer portfolio built with Next.js 14 App Router, TypeScript, and Tailwind CSS, featuring a sleek dark cyber aesthetic, glassmorphism, dual dynamic routing, and interactive project filtering.

---

## ✨ Features

- **Dark Cyber Aesthetic:** Curated dark palette (`#0d1117`, `#161b22`), glassmorphism cards, glowing neon emerald accents (`#00e676`), and typography via Google Fonts Inter & JetBrains Mono.
- **Full TypeScript Migration:** Strongly typed data contracts and components for end-to-end type safety.
- **Dual Dynamic Routing:** Supports both human-readable slugs and numeric index paths for projects and education (e.g., `/projects/eduflow` and `/projects/1`).
- **Interactive Project Filter:** Client-side search and category filtering across all GitHub repositories.
- **Academic Credentials & Hyperlinks:** Direct links to official websites for Christ University, Government Nagarjuna PG College of Science, and Kendriya Vidyalaya No. 2.
- **Printable Curriculum Vitae:** Dedicated `/resume` page with clean `@media print` styling for one-click PDF export.
- **Live API Inspector:** Demonstrates real-time client-side streaming and inspection of the `/api/profile` endpoint.

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Frontend:** React 18
- **Styling:** Tailwind CSS & Vanilla CSS Variables
- **Icons & Assets:** Custom SVG Icons & SVG Brand Logo

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm

### Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Sync profile environment variables:
   ```bash
   npm run sync:profile
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 📜 Available Scripts

- `npm run dev` — Starts the development server
- `npm run build` — Builds the application for production (generates all static & dynamic routes)
- `npm run start` — Starts the production server
- `npm run lint` — Runs ESLint checks
- `npm run sync:profile` — Syncs profile info from `data/cv-data.txt` to `.env.local`
