import Link from "next/link";
import Image from "next/image";
import DownloadApp from "@/components/DownloadApp";
import OnboardingShowcase from "@/components/OnboardingShowcase";
import AnimateIn from "@/components/AnimateIn";

export default function Home() {
  return (
    <div>
      {/* Hero – minimal copy, visual-first, mobile-optimised */}
      <section
        className="relative flex flex-col justify-center px-4 py-10 sm:min-h-[75vh] sm:px-6 sm:py-16 md:flex-row md:items-center md:gap-12 md:py-20 lg:max-w-6xl lg:mx-auto lg:gap-16"
        style={{
          background: "linear-gradient(165deg, var(--tint-pink) 0%, var(--purple-light) 50%, var(--gray-bg-alt) 100%)",
        }}
      >
        <AnimateIn className="flex flex-1 flex-col items-center text-center md:items-start md:text-left" delay={0}>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
            Shop and sell with trust
          </h1>
          <p className="mt-4 text-xl font-semibold sm:text-2xl md:text-3xl" style={{ color: "var(--accent)" }}>
            Pay Safe, Shop Free.<sup className="ml-0.5 text-sm font-normal opacity-90 md:text-base">™</sup>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Escrow protection. Lower fees. Nigeria’s secure marketplace.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <DownloadApp variant="hero" />
            <Link
              href="/about"
              className="inline-flex h-12 items-center rounded-xl border-2 border-[var(--accent)] bg-white px-5 font-medium text-[var(--accent)] hover:bg-[var(--tint-pink)] sm:h-14 sm:px-6"
            >
              Our story
            </Link>
          </div>
        </AnimateIn>
        <AnimateIn className="relative mt-8 flex flex-1 justify-center md:mt-0" delay={100}>
          <div className="relative w-full max-w-[280px] overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-lg sm:max-w-sm">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/onboarding1.jpg"
                alt="ShopPay app – safe shopping in Nigeria"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw,  min(45vw, 420px)"
                priority
              />
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* Onboarding images – auto-rotate on mobile, grid on desktop */}
      <OnboardingShowcase />

      {/* Trade with ShopPay – video + Buy gif */}
      <section className="border-t border-[var(--border)] bg-[var(--gray-bg)] py-12 sm:py-16">
        <AnimateIn>
          <div className="mx-auto max-w-6xl px-2 sm:px-3">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--accent)] sm:text-sm">
            In action
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Trade with ShopPay
          </h2>
          <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-6">
            <div className="w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md md:flex-1">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="aspect-video w-full object-cover"
                aria-label="ShopPay – trade safely in Nigeria"
              >
                <source src="/shoppay.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex w-full shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-md md:w-72">
              <Image
                src="/buy.gif"
                alt="Buy with ShopPay"
                width={200}
                height={200}
                className="h-auto w-full max-w-[200px] object-contain"
                unoptimized
              />
              <p className="mt-3 text-sm font-semibold text-[var(--primary)]">Buy with ShopPay</p>
            </div>
          </div>
          </div>
        </AnimateIn>
      </section>

      {/* Why ShopPay – features */}
      <section className="border-t border-[var(--border)] bg-white px-4 py-14 sm:px-6 sm:py-16">
        <AnimateIn>
          <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Why Nigerians choose ShopPay
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Built to eliminate scams and put you in control.
          </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
            { title: "Escrow protection", desc: "Funds stay safe until you confirm delivery with OTP.", gradient: true },
            { title: "Social commerce", desc: "Sell via Instagram, WhatsApp, TikTok. One app.", gradient: false },
            { title: "Low fees", desc: "3% new, 6% used. More money in your pocket.", gradient: true },
            { title: "Airtime & bills", desc: "Data, airtime, and utilities in one place.", gradient: false },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border border-[var(--border)] p-6 text-left ${item.gradient ? "border-[var(--accent)]/30" : ""}`}
              style={item.gradient ? { background: "linear-gradient(135deg, var(--gradient-mid) 0%, var(--gradient-end) 100%)" } : { background: "var(--purple-light)" }}
            >
              <h3 className={`font-semibold ${item.gradient ? "text-white" : "text-[var(--text-primary)]"}`}>{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${item.gradient ? "text-white/95" : "text-[var(--text-secondary)]"}`}>{item.desc}</p>
            </div>
          ))}
          </div>
        </AnimateIn>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--tint-pink)]/40 px-4 py-14 sm:px-6">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Ready to shop and sell with trust?
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Download on Google Play or email{" "}
            <a href="mailto:hq@shoppay.market" className="font-medium text-[var(--primary)] hover:underline">
              hq@shoppay.market
            </a>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <DownloadApp variant="banner" />
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-xl border-2 border-[var(--primary)] px-6 font-medium text-[var(--primary)] hover:bg-[var(--purple-light)]"
            >
              Contact us
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center rounded-xl border-2 border-[var(--accent)] px-6 font-medium text-[var(--accent)] hover:bg-[var(--tint-pink)]"
            >
              About &amp; team
            </Link>
          </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
