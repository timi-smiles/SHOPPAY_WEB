type JsonLike = Record<string, unknown>;

export type ProductPreview = {
  title: string;
  caption?: string;
  imageUrl?: string;
  city?: string;
  condition?: string;
  amount: number;
  currency: string;
  inStock: boolean;
  linkActive: boolean;
  sellerName?: string;
  sellerEmail?: string;
  availableStock?: number;
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

function messageFromBody(raw: JsonLike): string | undefined {
  if (typeof raw.error === "string" && raw.error) return raw.error;
  if (typeof raw.message === "string" && raw.message) return raw.message;
  return undefined;
}

/** Handles `{ success, data?, error? }` envelopes from the public checkout API. */
function parseApiData(body: unknown, fallbackError: string): JsonLike {
  if (!body || typeof body !== "object") throw new Error(fallbackError);
  const envelope = body as JsonLike;
  if (envelope.success === false) {
    throw new Error(messageFromBody(envelope) ?? fallbackError);
  }
  return unwrapData(body);
}

async function readJsonResponse(response: Response, fallbackError: string): Promise<JsonLike> {
  let body: unknown = {};
  try {
    body = await response.json();
  } catch {
    /* non-JSON body */
  }
  if (!response.ok) {
    const raw = body && typeof body === "object" ? (body as JsonLike) : {};
    throw new Error(messageFromBody(raw) ?? `${fallbackError} (${response.status})`);
  }
  return parseApiData(body, fallbackError);
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

  const json = await readJsonResponse(response, "Unable to load this checkout link");
  const product =
    json.product && typeof json.product === "object" ? (json.product as JsonLike) : ({} as JsonLike);

  const title =
    typeof product.title === "string" && product.title.trim()
      ? product.title.trim()
      : typeof json.title === "string"
        ? json.title
        : "ShopPay Checkout";

  const caption = typeof product.caption === "string" ? product.caption : undefined;
  const imageUrl =
    typeof product.image === "string" && product.image.trim()
      ? product.image.trim()
      : typeof json.imageUrl === "string"
        ? json.imageUrl
        : typeof json.productImage === "string"
          ? json.productImage
          : undefined;

  const city = typeof product.city === "string" ? product.city : typeof json.city === "string" ? json.city : undefined;
  const condition =
    typeof product.condition === "string"
      ? product.condition
      : typeof json.condition === "string"
        ? json.condition
        : undefined;

  const amount = toAmount(
    json.unitPrice ?? json.amount ?? json.snapshotPrice ?? json.price ?? product.price ?? product.unitPrice,
  );
  const currency = typeof json.currency === "string" ? json.currency : "NGN";

  const stockRaw = json.availableStock;
  const availableStock = typeof stockRaw === "number" ? stockRaw : undefined;
  const inStock =
    typeof stockRaw === "number" ? stockRaw > 0 : Boolean(json.inStock ?? json.available ?? true);

  const linkActive = Boolean(json.linkActive ?? json.active ?? true);

  const sellerEmail = typeof json.sellerEmail === "string" ? json.sellerEmail : undefined;
  const sellerName = typeof json.sellerName === "string" ? json.sellerName : undefined;

  return {
    title,
    caption,
    imageUrl,
    city,
    condition,
    amount,
    currency,
    inStock,
    linkActive,
    sellerName,
    sellerEmail,
    availableStock,
  };
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

  const json = await readJsonResponse(response, "Unable to initialize payment");
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

export type DeliveryConfirmResult = {
  success: true;
  alreadyReleased?: boolean;
  message: string;
};

export async function confirmGuestDelivery(token: string): Promise<DeliveryConfirmResult> {
  const response = await fetch(endpoint("/api/public/checkout/confirm-delivery"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const json = (await response.json()) as Record<string, unknown>;

  if (!response.ok || json.success === false) {
    const msg = typeof json.error === "string" ? json.error : typeof json.message === "string" ? json.message : "Unable to confirm delivery";
    throw new Error(msg);
  }

  return {
    success: true,
    alreadyReleased: json.alreadyReleased === true,
    message: typeof json.message === "string" ? json.message : "Delivery confirmed! Payment has been released to the seller.",
  };
}

export async function getPublicCheckoutStatus(reference: string): Promise<CheckoutStatus> {
  const response = await fetch(endpoint(`/api/public/checkout/social/status/${encodeURIComponent(reference)}`), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const json = await readJsonResponse(response, "Unable to verify payment status");
  const order = json.order && typeof json.order === "object" ? (json.order as JsonLike) : ({} as JsonLike);

  return {
    state: normalizeStatus(json.status ?? json.state),
    reference: String(json.reference ?? reference),
    amount: toAmount(json.amount ?? order.totalAmount ?? order.amount),
    currency: typeof json.currency === "string" ? json.currency : "NGN",
    message: typeof json.message === "string" ? json.message : undefined,
  };
}
