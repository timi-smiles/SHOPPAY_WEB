export const metadata = {
  title: "Terms & Conditions – ShopPay Nigeria",
  description: "Terms and conditions for using ShopPay e-commerce and fintech services in Nigeria.",
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-[var(--primary)]">Terms &amp; Conditions</h1>
      <p className="mt-2 text-[var(--text-muted)]">Last updated: February 2025</p>

      <div className="prose prose-neutral mt-8 space-y-6 text-[var(--text-secondary)]">
        <p>
          Welcome to ShopPay. By using our website, mobile application, and services you agree to these terms. ShopPay
          Nigeria Ltd. provides a secure e-commerce and fintech platform in Nigeria including escrow-protected
          transactions, social commerce, and utility payments.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Use of the platform</h2>
          <p>
            You must use the platform lawfully, provide accurate information, and comply with Nigerian law. Fees apply as
            stated (e.g. 3% on new items, 6% on used items). Escrow terms require delivery confirmation (e.g. via OTP)
            before funds are released.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Eligibility</h2>
          <p>
            You must be of legal age and capacity to enter into binding contracts. Use of certain financial or
            payment features may require additional verification as required by regulators.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Limitation of liability</h2>
          <p>
            ShopPay is not liable for indirect, consequential, or incidental damages arising from use of the platform
            to the maximum extent permitted by law. Our liability is limited as set out in our full terms and applicable
            regulations.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Contact</h2>
          <p>
            For questions:{" "}
            <a href="mailto:hq@shoppay.market" className="text-[var(--primary)] hover:underline">
              hq@shoppay.market
            </a>
            , or ShopBay Global Market Limited, Block 1, 401 Road, Gowon Estate, Lagos, Nigeria. Phone:{" "}
            <a href="tel:+2348085486738" className="text-[var(--primary)] hover:underline">
              +234 808 548 6738
            </a>
            .
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
