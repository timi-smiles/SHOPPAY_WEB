"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SocialCheckoutStatusCard from "@/components/SocialCheckoutStatusCard";
import { CheckoutStatus, getPublicCheckoutStatus } from "@/lib/socialCheckoutApi";

type Props = {
  reference: string;
};

export default function SocialCheckoutCallbackView({ reference }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<CheckoutStatus | null>(null);

  useEffect(() => {
    if (!reference) return;

    getPublicCheckoutStatus(reference)
      .then((res) => setStatus(res))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to verify payment status"))
      .finally(() => setLoading(false));
  }, [reference]);

  return (
    <div className="bg-[var(--gray-bg-alt)] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {!reference ? (
          <section className="rounded-2xl border border-[var(--danger)]/30 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Missing payment reference</h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              No payment reference was provided in this callback URL.
            </p>
          </section>
        ) : null}

        {loading && reference ? (
          <section className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Verifying payment</h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">Please wait while we confirm your transaction with Paystack.</p>
          </section>
        ) : null}

        {!loading && error ? (
          <section className="rounded-2xl border border-[var(--danger)]/30 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Unable to verify payment</h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{error}</p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex h-11 items-center rounded-xl border-2 border-[var(--primary)] px-5 font-medium text-[var(--primary)] hover:bg-[var(--purple-light)]"
              >
                Back to home
              </Link>
            </div>
          </section>
        ) : null}

        {!loading && !error && status && reference ? <SocialCheckoutStatusCard status={status} title="Payment verification result" /> : null}
      </div>
    </div>
  );
}
