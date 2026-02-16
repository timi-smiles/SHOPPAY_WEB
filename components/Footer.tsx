import Link from "next/link";
import DownloadApp from "@/components/DownloadApp";

const COMPANY_DESCRIPTION =
  "ShopPay is a secure, mobile-first e-commerce and fintech platform in Nigeria that enables safe buying and selling of new and used products online. We provide escrow-protected transactions (funds held until delivery confirmation via OTP), social commerce integration (Instagram, WhatsApp, TikTok), airtime, data and utility bill payments, and low transaction fees (3% on new items, 6% on used items). Our mission is to eliminate online scams, reduce marketplace fees, and empower micro-entrepreneurs and everyday Nigerians to shop and sell with trust and convenience.";

const ADDRESS = "Block 1, 401 Road, Gowon Estate, Lagos, Nigeria";
const EMAIL = "hq@shoppay.market";
const PHONE = "+234 808 548 6738";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--tint-pink)]/50 text-[var(--text-secondary)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-[var(--primary)]">ShopPay Nigeria Ltd.</h3>
            <p className="mb-4 max-w-xl text-sm leading-relaxed">{COMPANY_DESCRIPTION}</p>
            <p className="text-sm font-semibold text-[var(--accent)]">Pay Safe, Shop Free.<sup className="ml-0.5 font-normal opacity-90">™</sup></p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Contact</h4>
              <a href={`mailto:${EMAIL}`} className="block text-sm text-[var(--primary)] hover:underline">
                {EMAIL}
              </a>
              <a href="tel:+2348085486738" className="mt-1 block text-sm text-[var(--primary)] hover:underline">
                {PHONE}
              </a>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Office</h4>
              <p className="text-sm text-[var(--text-primary)]">
                ShopPay Nigeria Ltd.
                <br />
                {ADDRESS}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--border)] pt-8">
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--primary)] hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[var(--text-secondary)] hover:text-[var(--primary)] hover:underline">
              Terms &amp; Conditions
            </Link>
            <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--primary)] hover:underline">
              About &amp; Team
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-[var(--text-muted)]">Download ShopPay</span>
            <DownloadApp variant="badge" />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} ShopPay Nigeria Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
