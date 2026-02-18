import DownloadApp from "@/components/DownloadApp";
import AnimateIn from "@/components/AnimateIn";

const EMAIL = "hq@shoppay.market";
const PHONE = "+234 808 548 6738";
const ADDRESS_LINE = "Block 1, 401 Road, Gowon Estate, Lagos, Nigeria";
const COMPANY_NAME = "ShopBay Global Market Limited";

export const metadata = {
  title: "Contact – ShopPay Nigeria",
  description: "Get in touch with ShopPay. Email, phone, and office address in Lagos.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="border-b border-[var(--border)] bg-white px-4 py-12 sm:px-6 sm:py-16">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">Contact us</h1>
          <p className="mt-4 text-[var(--text-secondary)]">
            Reach out for partnerships, support, or general enquiries.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Email</h2>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 block text-lg font-medium text-[var(--primary)] hover:underline"
              >
                {EMAIL}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Phone</h2>
              <a
                href="tel:+2348085486738"
                className="mt-2 block text-lg font-medium text-[var(--primary)] hover:underline"
              >
                {PHONE}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Office address</h2>
              <p className="mt-2 text-lg text-[var(--text-primary)]">
                {COMPANY_NAME}
                <br />
                {ADDRESS_LINE}
              </p>
            </div>
          </div>
          </div>
        </AnimateIn>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-12">
        <AnimateIn>
          <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Find us on the map</h2>
          <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--gray-bg)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.356600911363!2d3.378314274!3d6.524393793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2c2c2c2c2c%3A0x0!2sGowon%20Estate%2C%20Lagos!5e0!3m2!1sen!2sng!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ShopPay office location - Gowon Estate, Lagos"
            />
          </div>
          </div>
        </AnimateIn>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--purple-light)]/60 px-4 py-10 sm:px-6 sm:py-12">
        <AnimateIn>
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Download ShopPay on Google Play</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Secure e-commerce and payments in Nigeria.</p>
          <div className="mt-5">
            <DownloadApp variant="banner" />
          </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
