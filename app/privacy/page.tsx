export const metadata = {
  title: "Privacy Policy – ShopPay Nigeria",
  description: "ShopPay Nigeria Ltd. privacy policy. How we collect, use and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-[var(--primary)]">Privacy Policy</h1>
      <p className="mt-2 text-[var(--text-muted)]">Last updated: February 2025</p>

      <div className="prose prose-neutral mt-8 space-y-6 text-[var(--text-secondary)]">
        <p>
          ShopPay Nigeria Ltd. (“ShopPay”, “we”, “us”) is committed to protecting your privacy. This policy describes
          how we collect, use, and safeguard your information when you use our website, mobile application, and services.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Information we collect</h2>
          <p>
            We may collect information you provide (name, email, phone, address), transaction and payment data, device
            and usage information, and data from social commerce integrations where you have authorised access.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">How we use it</h2>
          <p>
            We use your information to provide and improve our e-commerce and fintech services, process escrow and
            payments, prevent fraud, communicate with you, and comply with applicable laws including Nigerian
            regulations (CBN, SEC, data protection).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Security</h2>
          <p>
            We implement technical and organisational measures to protect your data. Our platform uses secure
            connections and we hold funds in escrow until delivery confirmation as described in our terms.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Contact</h2>
          <p>
            For privacy-related questions contact us at{" "}
            <a href="mailto:hq@shoppay.market" className="text-[var(--primary)] hover:underline">
              hq@shoppay.market
            </a>
            , or at our office: Block 1, 401 Road, Gowon Estate, Lagos, Nigeria.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
