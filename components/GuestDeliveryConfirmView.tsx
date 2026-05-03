"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { confirmGuestDelivery, DeliveryConfirmResult } from "@/lib/socialCheckoutApi";

type Props = {
  token: string;
};

function Spinner() {
  return (
    <svg
      className="h-10 w-10 animate-spin text-[var(--primary)]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--success)]/15">
      <svg className="h-9 w-9 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function XIcon() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--danger)]/10">
      <svg className="h-9 w-9 text-[var(--danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
}

export default function GuestDeliveryConfirmView({ token }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DeliveryConfirmResult | null>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("No confirmation token found in this link. Please check your email and try again.");
      return;
    }

    if (calledRef.current) return;
    calledRef.current = true;

    confirmGuestDelivery(token)
      .then((res) => {
        setError("");
        setResult(res);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to confirm delivery. Please contact support.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="bg-[var(--gray-bg-alt)] px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl">

        {/* Loading state */}
        {loading ? (
          <section className="flex flex-col items-center rounded-2xl border border-[var(--border)] bg-white p-10 text-center shadow-sm">
            <Spinner />
            <h1 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">Confirming your delivery…</h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Please wait — we are releasing the payment to the seller.
            </p>
          </section>
        ) : null}

        {/* Error state */}
        {!loading && error ? (
          <section className="flex flex-col items-center rounded-2xl border border-[var(--danger)]/30 bg-white p-10 text-center shadow-sm">
            <XIcon />
            <h1 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">Confirmation failed</h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{error}</p>
            <p className="mt-5 text-sm text-[var(--text-secondary)]">
              Need help?{" "}
              <a href="mailto:hq@shoppay.market" className="font-medium text-[var(--primary)] hover:underline">
                hq@shoppay.market
              </a>
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex h-11 items-center rounded-xl border-2 border-[var(--primary)] px-6 font-medium text-[var(--primary)] hover:bg-[var(--purple-light)]"
              >
                Back to ShopPay NG
              </Link>
            </div>
          </section>
        ) : null}

        {/* Success state */}
        {!loading && !error && result ? (
          <div className="space-y-4">
            <section className="flex flex-col items-center rounded-2xl border border-[var(--success)]/30 bg-white p-10 text-center shadow-sm">
              <CheckIcon />
              <h1 className="mt-6 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                {result.alreadyReleased ? "Already confirmed" : "Delivery confirmed!"}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{result.message}</p>
              {result.alreadyReleased ? (
                <p className="mt-3 text-xs text-[var(--text-secondary)]">
                  You may have already clicked this link before — no action needed.
                </p>
              ) : (
                <p className="mt-4 rounded-xl bg-[var(--success)]/8 px-4 py-3 text-sm text-[var(--text-secondary)]">
                  Thank you for confirming. Escrow funds are now paid to the seller&apos;s ShopPay wallet.
                </p>
              )}
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex h-11 items-center rounded-xl border-2 border-[var(--primary)] px-6 font-medium text-[var(--primary)] hover:bg-[var(--purple-light)]"
                >
                  Back to ShopPay NG
                </Link>
              </div>
            </section>

            {/* Account upsell card */}
            <section
              className="rounded-2xl border border-[var(--accent)]/25 p-6 text-center shadow-sm"
              style={{ background: "linear-gradient(135deg, var(--tint-pink) 0%, var(--purple-light) 100%)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Tip</p>
              <h2 className="mt-2 text-base font-bold text-[var(--text-primary)] sm:text-lg">
                Want to track future orders in one place?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                Create a ShopPay account — your order history is already saved. Just set a password and you&apos;re in.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.shoppay.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
                >
                  Get the app
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center rounded-xl border-2 border-[var(--accent)] px-5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--tint-pink)]"
                >
                  Contact us
                </Link>
              </div>
            </section>
          </div>
        ) : null}

      </div>
    </div>
  );
}
