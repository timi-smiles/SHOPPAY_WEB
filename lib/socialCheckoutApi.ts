type JsonLike = Record<string, unknown>;

export type ProductPreview = {
  title: string;
  imageUrl?: string;
  city?: string;
  condition?: string;
  amount: number;
  currency: string;
  inStock: boolean;
  linkActive: boolean;
  sellerName?: string;
};

export type ShippingAddressInput = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
};

export type BuyerCheckoutInput = {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  shippingAddress: ShippingAddressInput;
};

export type CheckoutInitResult = {
  authorizationUrl: string;
  reference?: string;
  amount?: number;
  currency?: string;
};

export type CheckoutStatus = {
  state: "completed" | "pending" | "processing" | "failed" | "unknown";
  reference: string;
  amount?: number;
  currency?: string;
  message?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "";

function getApiBaseUrl() {
  return API_BASE_URL.replace(/\/$/, "");
}

function endpoint(path: string) {
  const base = getApiBaseUrl();
  return base ? `${base}${path}` : path;
}

function unwrapData(payload: unknown): JsonLike {
  if (payload && typeof payload === "object") {
    const raw = payload as JsonLike;
    const nested = raw.data;
    if (nested && typeof nested === "object") return nested as JsonLike;
    return raw;
  }
  return {};
}

function normalizeStatus(value: unknown): CheckoutStatus["state"] {
  if (typeof value !== "string") return "unknown";
  const lowered = value.toLowerCase();
  if (lowered === "completed" || lowered === "success" || lowered === "successful") return "completed";
  if (lowered === "pending") return "pending";
  if (lowered === "processing" || lowered === "verifying") return "processing";
  if (lowered === "failed" || lowered === "abandoned" || lowered === "cancelled") return "failed";
  return "unknown";
}

function toAmount(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const asNum = Number(value);
    if (!Number.isNaN(asNum)) return asNum;
  }
  return 0;
}

function ensureOk(response: Response, fallbackMessage: string) {
  if (response.ok) return;
  throw new Error(`${fallbackMessage} (${response.status})`);
}

export function formatAmount(amount: number, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export async function getPublicCheckoutBySlug(slug: string): Promise<ProductPreview> {
  const response = await fetch(endpoint(`/api/public/checkout/social/${encodeURIComponent(slug)}`), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  ensureOk(response, "Unable to load this checkout link");
  const json = unwrapData(await response.json());

  const title = String(json.title ?? json.productTitle ?? "ShopPay Checkout");
  const imageUrl = typeof json.imageUrl === "string" ? json.imageUrl : typeof json.productImage === "string" ? json.productImage : undefined;
  const city = typeof json.city === "string" ? json.city : undefined;
  const condition = typeof json.condition === "string" ? json.condition : undefined;
  const amount = toAmount(json.amount ?? json.snapshotPrice ?? json.price);
  const currency = typeof json.currency === "string" ? json.currency : "NGN";
  const inStock = Boolean(json.inStock ?? json.available ?? true);
  const linkActive = Boolean(json.linkActive ?? json.active ?? true);
  const sellerName = typeof json.sellerName === "string" ? json.sellerName : undefined;

  return { title, imageUrl, city, condition, amount, currency, inStock, linkActive, sellerName };
}

export async function createPublicCheckout(slug: string, payload: BuyerCheckoutInput): Promise<CheckoutInitResult> {
  const response = await fetch(endpoint(`/api/public/checkout/social/${encodeURIComponent(slug)}/checkout`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  ensureOk(response, "Unable to initialize payment");
  const json = unwrapData(await response.json());
  const authorizationUrl = String(json.authorization_url ?? json.authorizationUrl ?? "");

  if (!authorizationUrl) {
    throw new Error("Checkout link was created but no authorization URL was returned");
  }

  return {
    authorizationUrl,
    reference: typeof json.reference === "string" ? json.reference : undefined,
    amount: toAmount(json.amount),
    currency: typeof json.currency === "string" ? json.currency : "NGN",
  };
}

export async function getPublicCheckoutStatus(reference: string): Promise<CheckoutStatus> {
  const response = await fetch(endpoint(`/api/public/checkout/social/status/${encodeURIComponent(reference)}`), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  ensureOk(response, "Unable to verify payment status");
  const json = unwrapData(await response.json());

  return {
    state: normalizeStatus(json.status ?? json.state),
    reference: String(json.reference ?? reference),
    amount: toAmount(json.amount),
    currency: typeof json.currency === "string" ? json.currency : "NGN",
    message: typeof json.message === "string" ? json.message : undefined,
  };
}
