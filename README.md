# Personal Portfolio

A personal portfolio website built with Next.js (App Router) and Tailwind CSS. Features dynamic server-side data fetching, client components, and simple profile updates via script.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18
- **Styling:** Tailwind CSS
- **Tooling:** PostCSS, ESLint

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env.local` and update your details:
   ```bash
   cp .env.example .env.local
   ```
   Or generate `.env.local` automatically from `data/cv-data.txt`:
   ```bash
   npm run sync:profile
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint checks
- `npm run sync:profile` - Syncs profile info from data file to `.env.local`
