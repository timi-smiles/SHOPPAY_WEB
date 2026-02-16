"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import DownloadApp from "@/components/DownloadApp";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 rounded-xl bg-[var(--purple-light)]/80 px-3 py-2">
          <Image
            src="/LOGO-SHOPPAY.jpeg"
            alt="ShopPay"
            width={120}
            height={40}
            className="h-9 w-auto object-contain sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--primary)]"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[var(--accent)] transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
          <a
            href="mailto:hq@shoppay.market"
            className="group relative py-1 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--primary)]"
          >
            hq@shoppay.market
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[var(--accent)] transition-transform duration-200 ease-out group-hover:scale-x-100" />
          </a>
          <DownloadApp variant="compact" />
          <a
            href="tel:+2348085486738"
            className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-dark)]"
          >
            +234 808 548 6738
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--gray-bg)] text-[var(--text-primary)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <span className="text-xl leading-none">×</span>
          ) : (
            <span className="text-lg font-light">☰</span>
          )}
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`border-t border-[var(--border)] bg-[var(--purple-light)]/40 px-4 py-4 transition-opacity duration-300 ease-out ${open ? "opacity-100" : "opacity-0"}`}
          >
            <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group relative rounded-lg py-3 pl-3 pr-2 text-[var(--text-primary)] transition-colors duration-200 hover:bg-white/60 hover:text-[var(--primary)] active:bg-white/60"
              >
                <span className="relative inline-block">
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[var(--accent)] transition-transform duration-200 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
                </span>
              </Link>
            ))}
            <a
              href="mailto:hq@shoppay.market"
              className="group relative rounded-lg py-3 pl-3 pr-2 text-[var(--text-secondary)] transition-colors duration-200 hover:bg-white/60 hover:text-[var(--primary)] active:bg-white/60"
            >
              <span className="relative inline-block">
                hq@shoppay.market
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[var(--accent)] transition-transform duration-200 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
              </span>
            </a>
            <div className="pt-2">
              <DownloadApp variant="compact" className="w-full justify-center" />
            </div>
            <a
              href="tel:+2348085486738"
              className="rounded-full bg-[var(--primary)] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[var(--primary-dark)]"
            >
              +234 808 548 6738
            </a>
          </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
