"use client";

import { useState } from "react";

const SHORT_INTRO = "ShopPay is Nigeria's secure e-commerce and fintech platform for safe buying and selling.";
const FULL_DESCRIPTION =
  "We provide escrow-protected transactions (funds held until delivery confirmation via OTP), social commerce integration (Instagram, WhatsApp, TikTok), airtime, data and utility bill payments, and low transaction fees (3% on new items, 6% on used items). Our mission is to eliminate online scams, reduce marketplace fees, and empower micro-entrepreneurs and everyday Nigerians to shop and sell with trust and convenience.";

export default function AboutIntro() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">About ShopPay</h1>
      <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">{SHORT_INTRO}</p>
      {/* Desktop: full description always visible */}
      <p className="mt-4 hidden leading-relaxed text-[var(--text-secondary)] sm:block sm:text-lg">
        {FULL_DESCRIPTION}
      </p>
      {/* Mobile: Read more to expand */}
      <div className="mt-4 sm:hidden">
        {expanded ? (
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">{FULL_DESCRIPTION}</p>
        ) : (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            Read more
          </button>
        )}
      </div>
      <p className="mt-6 text-lg font-semibold text-[var(--accent)]">
        Pay Safe, Shop Free.<sup className="ml-0.5 text-base font-normal opacity-90">™</sup>
      </p>
    </div>
  );
}
