import {
  getCheckoutUrlForCurrentCart,
  getCheckoutUrlForProduct,
  getCheckoutUrlForProductValues,
} from "@/wix-api/checkout";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import { useToast } from "./use-toast";
import { useState } from "react";

export function useCartCheckout() {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient);
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast: ({
        variant: "destructive",
        description: "Failed to load checkout. Please try again.",
      });
    }
  }

  return { startCheckoutFlow, pending };
}

export function useQuickBuy() {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  async function startCheckoutFlow(values: getCheckoutUrlForProductValues) {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForProduct(
        wixBrowserClient,
        values,
      );
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast: ({
        variant: "destructive",
        description: "Failed to load checkout. Please try again.",
      });
    }
  }
  
  return { startCheckoutFlow, pending };
}
