"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/types/portfolio";

interface ApiResponse {
  profile: Profile;
  source: string;
  fetchedAt: string;
}

interface State {
  loading: boolean;
  error: string;
  data: ApiResponse | null;
}

export default function ClientProfileCard() {
  const [state, setState] = useState<State>({
    loading: true,
    error: "",
    data: null
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const json: ApiResponse = await response.json();

        if (active) {
          setState({
            loading: false,
            error: "",
            data: json
          });
        }
      } catch (err: unknown) {
        if (active) {
          setState({
            loading: false,
            error: err instanceof Error ? err.message : "Client-side fetch failed.",
            data: null
          });
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  return (
    <article className="glass-card p-6 overflow-hidden relative">
      {/* Subtle glowing corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e676]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="live-dot" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
            Live API Client Inspector
          </h3>
        </div>
        <span className="tag text-[10px] py-0.5 px-2 font-mono">
          GET /api/profile
        </span>
      </div>

      {state.loading ? (
        <div className="py-8 flex flex-col items-center justify-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#00e676] border-t-transparent" />
          <p className="font-mono text-xs text-[#8b949e]">Streaming endpoint payload...</p>
        </div>
      ) : state.error ? (
        <div className="py-6 text-center">
          <p className="font-mono text-xs text-red-400">Error: {state.error}</p>
        </div>
      ) : state.data ? (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-[#30363d]/60 bg-[#161b22]/70 p-3">
              <span className="text-[11px] font-mono text-[#8b949e] block">Profile Name</span>
              <span className="font-medium text-[#e6edf3] text-sm mt-0.5 block">
                {state.data.profile.fullName}
              </span>
            </div>
            <div className="rounded-lg border border-[#30363d]/60 bg-[#161b22]/70 p-3">
              <span className="text-[11px] font-mono text-[#8b949e] block">Current Focus</span>
              <span className="font-medium text-[#00e676] text-sm mt-0.5 block">
                {state.data.profile.role}
              </span>
            </div>
            <div className="rounded-lg border border-[#30363d]/60 bg-[#161b22]/70 p-3">
              <span className="text-[11px] font-mono text-[#8b949e] block">Location</span>
              <span className="font-medium text-[#e6edf3] text-sm mt-0.5 block">
                {state.data.profile.location}
              </span>
            </div>
            <div className="rounded-lg border border-[#30363d]/60 bg-[#161b22]/70 p-3">
              <span className="text-[11px] font-mono text-[#8b949e] block">Synced At</span>
              <span className="font-mono text-[#8b949e] text-xs mt-0.5 block truncate">
                {new Date(state.data.fetchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] font-mono text-[#6e7681]">
              Status: 200 OK &bull; Cache: no-store
            </span>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-mono text-[#00e676] hover:underline"
            >
              {expanded ? "Hide raw JSON &uarr;" : "View raw JSON &darr;"}
            </button>
          </div>

          {expanded && (
            <pre className="mt-2 max-h-56 overflow-auto rounded-lg border border-[#30363d] bg-[#0d1117] p-3 font-mono text-[11px] text-[#00e676]/90">
              {JSON.stringify(state.data, null, 2)}
            </pre>
          )}
        </div>
      ) : null}
    </article>
  );
}
