import SocialCheckoutCallbackView from "@/components/SocialCheckoutCallbackView";

function firstQuery(value: string | string[] | undefined): string {
  if (value === undefined) return "";
  return Array.isArray(value) ? (value[0] ?? "") : value;
}

type Props = {
  searchParams: Promise<{ reference?: string | string[]; trxref?: string | string[] }>;
};

export default async function SocialCheckoutCallbackPage({ searchParams }: Props) {
  const resolved = await searchParams;
  const reference = firstQuery(resolved.reference) || firstQuery(resolved.trxref);
  return <SocialCheckoutCallbackView reference={reference} />;
}
