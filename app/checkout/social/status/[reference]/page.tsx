"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SocialCheckoutStatusCard from "@/components/SocialCheckoutStatusCard";
import { CheckoutStatus, getPublicCheckoutStatus } from "@/lib/socialCheckoutApi";

export default function SocialCheckoutStatusPage() {
  const routeParams = useParams<{ reference: string }>();
  const reference = routeParams?.reference ?? "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<CheckoutStatus | null>(null);

  useEffect(() => {
    if (!reference) return;

    let active = true;

    getPublicCheckoutStatus(reference)
      .then((res) => {
        if (!active) return;
        setError("");
        setStatus(res);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to fetch checkout status");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reference]);

  return (
    <div className="bg-[var(--gray-bg-alt)] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {loading ? (
          <section className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Loading status</h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">Fetching latest payment update for {reference || "your transaction"}.</p>
          </section>
        ) : null}
        {!loading && error ? (
          <section className="rounded-2xl border border-[var(--danger)]/30 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Status unavailable</h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{error}</p>
          </section>
        ) : null}
        {!loading && !error && status ? <SocialCheckoutStatusCard status={status} /> : null}
      </div>
    </div>
  );
}
