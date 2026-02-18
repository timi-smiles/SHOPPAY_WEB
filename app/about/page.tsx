import Image from "next/image";
import DownloadApp from "@/components/DownloadApp";
import AboutIntro from "@/components/AboutIntro";
import AnimateIn from "@/components/AnimateIn";

const COMPANY_DESCRIPTION =
  "ShopPay is a secure, mobile-first e-commerce and fintech platform in Nigeria that enables safe buying and selling of new and used products online. We provide escrow-protected transactions (funds held until delivery confirmation via OTP), social commerce integration (Instagram, WhatsApp, TikTok), airtime, data and utility bill payments, and low transaction fees (3% on new items, 6% on used items). Our mission is to eliminate online scams, reduce marketplace fees, and empower micro-entrepreneurs and everyday Nigerians to shop and sell with trust and convenience.";

const LEADERSHIP = [
  {
    name: "Tony Odoh",
    role: "Founder & CEO",
    bio: "Mass Communicator, Cybersecurity Analyst, and Entrepreneur. Tony leads ShopPay's vision to make online commerce safe and accessible for every Nigerian.",
    image: "/WhatsApp%20Image%202026-02-15%20at%2010.51.51.jpeg",
  },
  {
    name: "Timilehin Ogunnowo",
    role: "Chief Technology Officer",
    bio: "Timilehin drives product and technology strategy, ensuring ShopPay remains secure, fast, and reliable for buyers and sellers.",
    image: "/WhatsApp%20Image%202026-02-15%20at%2010.31.56.jpeg",
  },
  {
    name: "Josephine Adebayo",
    role: "Chief Operating Officer & Company Secretary",
    bio: "Josephine oversees operations and governance, keeping ShopPay compliant and running smoothly for our users and partners.",
    image: "/WhatsApp%20Image%202026-02-15%20at%2010.16.33.jpeg",
  },
  {
    name: "David Dean",
    role: "Social Media Manager / Head of Marketing",
    bio: "David leads brand and growth across social channels, helping more Nigerians discover and trust ShopPay.",
    image: null,
  },
];

export const metadata = {
  title: "About – ShopPay Nigeria",
  description: COMPANY_DESCRIPTION.slice(0, 160),
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="border-b border-[var(--border)] bg-white px-4 py-12 sm:px-6 sm:py-16">
        <AnimateIn>
          <AboutIntro />
        </AnimateIn>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <AnimateIn>
          <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Meet our team</h2>
          <p className="mt-2 text-[var(--text-secondary)]">The people behind ShopBay Global Market Limited</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {LEADERSHIP.map((person) => (
              <div
                key={person.name}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
              >
                <div className="relative aspect-[4/3] w-full bg-[var(--purple-light)]">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className={person.role.includes("CEO") ? "object-cover object-top" : "object-cover"}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-[var(--primary)]">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{person.name}</h3>
                  <p className="text-sm font-medium text-[var(--primary)]">{person.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </AnimateIn>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--tint-pink)]/50 px-4 py-10 sm:px-6 sm:py-12">
        <AnimateIn>
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Get the ShopPay app</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Download on Google Play and start shopping safely.</p>
          <div className="mt-5">
            <DownloadApp variant="badge" />
          </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
