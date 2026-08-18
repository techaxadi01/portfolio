"use client";

import { useEffect, useState } from "react";

export default function ClientProfileCard() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    profile: null,
    fetchedAt: ""
  });

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch profile.");
        }

        const data = await response.json();

        if (active) {
          setState({
            loading: false,
            error: "",
            profile: data.profile,
            fetchedAt: data.fetchedAt
          });
        }
      } catch {
        if (active) {
          setState({
            loading: false,
            error: "Client-side fetch failed.",
            profile: null,
            fetchedAt: ""
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
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        Client-side API data
      </h2>

      {state.loading ? (
        <p className="mt-4 text-sm text-slate-600">Loading profile from the API...</p>
      ) : state.error ? (
        <p className="mt-4 text-sm text-red-600">{state.error}</p>
      ) : (
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-950">Name:</span> {state.profile.fullName}
          </p>
          <p>
            <span className="font-semibold text-slate-950">Role:</span> {state.profile.role}
          </p>
          <p>
            <span className="font-semibold text-slate-950">Source:</span> /api/profile
          </p>
          <p>
            <span className="font-semibold text-slate-950">Fetched at:</span>{" "}
            {new Date(state.fetchedAt).toLocaleString()}
          </p>
        </div>
      )}
    </article>
  );
}
