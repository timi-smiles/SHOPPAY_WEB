"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  BuyerCheckoutInput,
  createPublicCheckout,
  formatAmount,
  getPublicCheckoutBySlug,
  ProductPreview,
} from "@/lib/socialCheckoutApi";

const initialForm: BuyerCheckoutInput = {
  buyerName: "",
  buyerEmail: "",
  buyerPhone: "",
  shippingAddress: {
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  },
};

export default function SocialCheckoutPage() {
  const routeParams = useParams<{ slug: string }>();
  const slug = routeParams?.slug ?? "";
  const [data, setData] = useState<ProductPreview | null>(null);
  const [form, setForm] = useState<BuyerCheckoutInput>(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    let active = true;

    getPublicCheckoutBySlug(slug)
      .then((res) => {
        if (!active) return;
        setError("");
        setData(res);
        setForm((current) => ({
          ...current,
          shippingAddress: {
            ...current.shippingAddress,
            name: current.shippingAddress.name || current.buyerName,
            phone: current.shippingAddress.phone || current.buyerPhone,
          },
        }));
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load checkout details");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!slug || !data) return;
    setSubmitting(true);
    setError("");

    try {
      const result = await createPublicCheckout(slug, form);
      window.location.href = result.authorizationUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to start payment");
      setSubmitting(false);
    }
  };

  const unavailable = data ? !data.inStock || !data.linkActive : false;

  return (
    <div className="bg-[var(--gray-bg-alt)] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] sm:text-sm">Secure social checkout</p>
          <h1 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-4xl">Pay Safe, Shop Free.</h1>
        </div>

        {loading ? (
          <section className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-[var(--text-secondary)]">Loading product details...</p>
          </section>
        ) : null}

        {!loading && error ? (
          <section className="rounded-2xl border border-[var(--danger)]/30 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">This checkout link is unavailable</h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{error}</p>
          </section>
        ) : null}

        {!loading && !error && data ? (
          <div className="grid gap-6 md:grid-cols-2">
            <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-[var(--gray-bg)]">
                {data.imageUrl ? (
                  <Image src={data.imageUrl} alt={data.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">No image preview</div>
                )}
              </div>
              <div className="space-y-3 p-5">
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{data.title}</h2>
                <p className="text-2xl font-bold text-[var(--primary)]">{formatAmount(data.amount, data.currency)}</p>
                <div className="flex flex-wrap gap-2">
                  {data.condition ? (
                    <span className="rounded-full bg-[var(--purple-light)] px-3 py-1 text-xs font-medium text-[var(--primary)]">{data.condition}</span>
                  ) : null}
                  {data.city ? (
                    <span className="rounded-full bg-[var(--tint-pink)] px-3 py-1 text-xs font-medium text-[var(--accent)]">{data.city}</span>
                  ) : null}
                  {data.sellerName ? (
                    <span className="rounded-full bg-[var(--gray-bg)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">{data.sellerName}</span>
                  ) : null}
                </div>
                {unavailable ? (
                  <p className="rounded-xl bg-[var(--danger)]/10 px-3 py-2 text-sm font-medium text-[var(--danger)]">
                    This product is currently out of stock or the link is not active.
                  </p>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    Escrow-protected payment. Funds are only released after confirmed delivery.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Buyer details</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Fill this form to continue to Paystack.</p>

              <form className="mt-5 space-y-4" onSubmit={onSubmit}>
                <input
                  required
                  value={form.buyerName}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      buyerName: e.target.value,
                      shippingAddress: {
                        ...current.shippingAddress,
                        name: current.shippingAddress.name || e.target.value,
                      },
                    }))
                  }
                  placeholder="Buyer full name"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--tint-input)] px-4 text-sm outline-none focus:border-[var(--primary)]"
                />
                <input
                  required
                  type="email"
                  value={form.buyerEmail}
                  onChange={(e) => setForm((current) => ({ ...current, buyerEmail: e.target.value }))}
                  placeholder="Buyer email"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--tint-input)] px-4 text-sm outline-none focus:border-[var(--primary)]"
                />
                <input
                  required
                  value={form.buyerPhone}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      buyerPhone: e.target.value,
                      shippingAddress: {
                        ...current.shippingAddress,
                        phone: current.shippingAddress.phone || e.target.value,
                      },
                    }))
                  }
                  placeholder="Buyer phone number"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--tint-input)] px-4 text-sm outline-none focus:border-[var(--primary)]"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={form.shippingAddress.name}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, name: e.target.value },
                      }))
                    }
                    placeholder="Receiver name"
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--tint-input)] px-4 text-sm outline-none focus:border-[var(--primary)]"
                  />
                  <input
                    required
                    value={form.shippingAddress.phone}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, phone: e.target.value },
                      }))
                    }
                    placeholder="Receiver phone"
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--tint-input)] px-4 text-sm outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <input
                  required
                  value={form.shippingAddress.address}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      shippingAddress: { ...current.shippingAddress, address: e.target.value },
                    }))
                  }
                  placeholder="Delivery address"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--tint-input)] px-4 text-sm outline-none focus:border-[var(--primary)]"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={form.shippingAddress.city}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, city: e.target.value },
                      }))
                    }
                    placeholder="City"
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--tint-input)] px-4 text-sm outline-none focus:border-[var(--primary)]"
                  />
                  <input
                    required
                    value={form.shippingAddress.state}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, state: e.target.value },
                      }))
                    }
                    placeholder="State"
                    className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--tint-input)] px-4 text-sm outline-none focus:border-[var(--primary)]"
                  />
                </div>

                {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}

                <button
                  type="submit"
                  disabled={submitting || unavailable}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--primary)] px-6 font-semibold text-white hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Redirecting to Paystack..." : `Pay ${formatAmount(data.amount, data.currency)}`}
                </button>
              </form>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
