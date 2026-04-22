import SocialCheckoutCallbackView from "@/components/SocialCheckoutCallbackView";

type Props = {
  searchParams: Promise<{ reference?: string }>;
};

export default async function SocialCheckoutCallbackPage({ searchParams }: Props) {
  const resolved = await searchParams;
  const reference = resolved.reference ?? "";
  return <SocialCheckoutCallbackView reference={reference} />;
}
