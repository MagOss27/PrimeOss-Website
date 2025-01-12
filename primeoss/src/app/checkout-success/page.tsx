import Order from "@/components/Order";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getLoggedInMember } from "@/wix-api/members";
import { getOrder } from "@/wix-api/order";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout success",
};

interface PageProps {
  searchParams: { orderId: string };
}

export default async function Page({ searchParams: { orderId } }: PageProps) {
  const wixClient = getWixServerClient();

  const [order, loggedInMember] = await Promise.all([
    getOrder(wixClient, orderId),
    getLoggedInMember(wixClient),
  ]);

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center space-y-5 py-10">
      <h1 className="text-3xl font-bold">We received your order!</h1>
      <p>A summary of your orderwas sent to your email address.</p>
      <h2 className="text-2xl font-bold">Order details</h2>
      <Order order={order} />
      {loggedInMember && (
        <Link href="/profile" className="block text-primary hover:underline">
          View all your orders
        </Link>
      )}
    </main>
  );
}

// Funcionar a questão de compra de produtos do site
// https://manage.wix.com/premium-purchase-plan/dynamo?siteGuid=7c26352d-3c1b-4b59-90c9-ee9856b5c751&referralAdditionalInfo=bizMgrHeader
