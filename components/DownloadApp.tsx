const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.shopbay.ShopPay";
const GOOGLE_PLAY_BADGE_URL = "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";

type Variant = "hero" | "badge" | "compact" | "banner";

interface DownloadAppProps {
  variant?: Variant;
  className?: string;
}

export default function DownloadApp({ variant = "badge", className = "" }: DownloadAppProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 rounded-xl";

  if (variant === "hero") {
    return (
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} rounded-2xl border-2 border-[var(--border)] bg-white px-4 py-2 hover:border-[var(--primary)] hover:bg-[var(--purple-light)] ${className}`}
        aria-label="Download ShopPay on Google Play"
      >
        <img
          src={GOOGLE_PLAY_BADGE_URL}
          alt="Get it on Google Play"
          className="h-12 w-auto"
          width={155}
          height={60}
        />
      </a>
    );
  }

  if (variant === "banner") {
    return (
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} h-12 w-full rounded-xl bg-[var(--primary)] px-5 text-white hover:bg-[var(--primary-dark)] sm:w-auto sm:min-w-[200px] ${className}`}
        aria-label="Download ShopPay on Google Play"
      >
        <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
        </svg>
        <span>Download on Google Play</span>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} h-10 rounded-full bg-[var(--primary)] px-4 text-sm text-white hover:bg-[var(--primary-dark)] ${className}`}
        aria-label="Download ShopPay on Google Play"
      >
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
        </svg>
        <span>Get the app</span>
      </a>
    );
  }

  /* badge – official Google Play badge from CDN */
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} rounded-xl border-2 border-[var(--border)] bg-white px-3 py-2 hover:border-[var(--primary)] hover:bg-[var(--purple-light)] ${className}`}
      aria-label="Download ShopPay on Google Play"
    >
      <img
        src={GOOGLE_PLAY_BADGE_URL}
        alt="Get it on Google Play"
        className="h-10 w-auto"
        width={129}
        height={50}
      />
    </a>
  );
}
