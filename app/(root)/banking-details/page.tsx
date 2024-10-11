"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const BankingDetails = () => {
  const cart = useCart();
  const { user } = useUser();
  const router = useRouter();

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleOrder = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        body: JSON.stringify({ cartItems: cart.cartItems, customer }),
      });
      if (res.ok) {
        cart.clearCart();  // Clear the cart after successful order
        router.push("/order-confirmation");
      }
    } catch (err) {
      console.log("[order_POST]", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-heading4-bold mb-5">Banking Details</h1>
      <p>Please use the following details to complete your payment:</p>
      <p>Bank Name: XYZ Bank</p>
      <p>Account Number: 123456789</p>
      <p>Reference: Use your order ID as the reference</p>
      <button
        className="border rounded-lg text-body-bold bg-white py-3 p-5 mt-10 hover:bg-black hover:text-white"
        onClick={handleOrder}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default BankingDetails;
