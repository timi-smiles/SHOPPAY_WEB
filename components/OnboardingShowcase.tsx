"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { src: "/onboarding1.jpg", alt: "ShopPay – Safe shopping in Nigeria" },
  { src: "/onboarding2.jpg", alt: "Escrow protection and easy selling" },
  { src: "/onboarding3.jpg", alt: "Pay bills and shop in one app" },
];

const ROTATE_INTERVAL_MS = 3000;

export default function OnboardingShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate on mobile only (no md: in JS, we use one layout for mobile)
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-18"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--accent)] sm:text-sm">
          In the app
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          See how it works
        </h2>
        <p className="mt-3 text-center text-base text-[var(--text-secondary)] sm:text-lg">
          Safe buying, easy selling, one app.
        </p>

        {/* Mobile: single image, auto-rotating */}
        <div className="mt-8 md:mt-10">
          <div className="relative mx-auto max-w-sm md:hidden">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--gray-bg)] shadow-md">
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.src}
                  className="absolute inset-0 transition-opacity duration-500 ease-out"
                  style={{
                    opacity: currentIndex === i ? 1 : 0,
                    pointerEvents: currentIndex === i ? "auto" : "none",
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2 md:hidden">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i
                      ? "w-6 bg-[var(--accent)]"
                      : "w-2 bg-[var(--border)]"
                  }`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>

          {/* Desktop: 3-image grid */}
          <div className="hidden grid-cols-3 gap-6 md:grid">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                className={`rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--gray-bg)] shadow-md transition-all duration-500 ease-out ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: inView ? `${i * 120}ms` : "0ms",
                }}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="33vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
