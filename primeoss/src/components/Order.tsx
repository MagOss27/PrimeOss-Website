import { orders } from "@wix/ecom";

interface OrderProps {
  order: orders.Order;
}

export default function Order({ order }: OrderProps) {
  return (
    <div className="w-full space-y-5 border p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-bold">Order #{order.number}</span>
      </div>
    </div>
  );
}
