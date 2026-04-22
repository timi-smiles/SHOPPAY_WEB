"use client";

import Link from "next/link";
import { CheckoutStatus, formatAmount } from "@/lib/socialCheckoutApi";

type Props = {
  status: CheckoutStatus;
  title?: string;
};

function badgeClasses(state: CheckoutStatus["state"]) {
  if (state === "completed") return "bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30";
  if (state === "failed") return "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20";
  if (state === "pending" || state === "processing") return "bg-[var(--warning)]/20 text-[var(--text-primary)] border-[var(--warning)]/50";
  return "bg-[var(--gray-bg)] text-[var(--text-secondary)] border-[var(--border)]";
}

function stateLabel(state: CheckoutStatus["state"]) {
  if (state === "completed") return "Payment Successful";
  if (state === "failed") return "Payment Failed";
  if (state === "pending") return "Payment Pending";
  if (state === "processing") return "Verifying Payment";
  return "Payment Status Unknown";
}

export default function SocialCheckoutStatusCard({ status, title = "Checkout status" }: Props) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">{title}</h1>
      <div className={`mt-4 inline-flex rounded-full border px-4 py-1 text-sm font-semibold ${badgeClasses(status.state)}`}>
        {stateLabel(status.state)}
      </div>

      <div className="mt-6 space-y-2 text-sm text-[var(--text-secondary)]">
        <p>
          <span className="font-semibold text-[var(--text-primary)]">Reference:</span> {status.reference}
        </p>
        {typeof status.amount === "number" && status.amount > 0 ? (
          <p>
            <span className="font-semibold text-[var(--text-primary)]">Amount:</span> {formatAmount(status.amount, status.currency ?? "NGN")}
          </p>
        ) : null}
        {status.message ? (
          <p>
            <span className="font-semibold text-[var(--text-primary)]">Update:</span> {status.message}
          </p>
        ) : null}
      </div>

      <p className="mt-6 text-sm text-[var(--text-secondary)]">
        Need help? Contact{" "}
        <a href="mailto:hq@shoppay.market" className="font-medium text-[var(--primary)] hover:underline">
          hq@shoppay.market
        </a>
        .
      </p>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-xl border-2 border-[var(--primary)] px-5 font-medium text-[var(--primary)] hover:bg-[var(--purple-light)]"
        >
          Back to ShopPay NG
        </Link>
      </div>
    </section>
  );
}
