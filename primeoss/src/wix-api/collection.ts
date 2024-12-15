import { getWixClient } from "@/lib/wix-client.base";

export async function getCollectionBySlug(slug: string) {
  const wixClient = getWixClient();

  const { collection } =
    await wixClient.collections.getCollectionBySlug("featured-products");

  return collection || null;
}
