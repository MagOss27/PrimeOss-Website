import { wixBrowserClient } from "@/lib/wix-client-browser";
import { getCart } from "@/wix-api/cart";
import { useQuery } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });
}
