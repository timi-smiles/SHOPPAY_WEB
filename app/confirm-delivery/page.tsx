import type { Metadata } from "next";
import GuestDeliveryConfirmView from "@/components/GuestDeliveryConfirmView";

export const metadata: Metadata = {
  title: "Confirm Delivery – ShopPay NG",
  description: "Confirm that you received your order so the seller can be paid.",
};

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ConfirmDeliveryPage({ searchParams }: Props) {
  const resolved = await searchParams;
  const token = resolved.token ?? "";
  return <GuestDeliveryConfirmView token={token} />;
}
