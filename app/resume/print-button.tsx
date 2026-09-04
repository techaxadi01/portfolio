"use client";

export default function PrintButton() {
  return (
    <div className="flex flex-wrap items-center gap-3 no-print">
      <button
        type="button"
        onClick={() => window.print()}
        className="btn-accent text-xs py-2 px-4 flex items-center gap-2"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Print / Save PDF
      </button>

      <a
        href="/api/profile"
        target="_blank"
        rel="noreferrer"
        className="btn-outline text-xs py-2 px-4 flex items-center gap-2"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export JSON Data
      </a>
    </div>
  );
}
