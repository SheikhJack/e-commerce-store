"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


interface UserResource {
  id: string;
  user: string;
  email: string;
  username?: string; // Optional username
  emailAddresses: string;
}

interface CartItem {
  _id: string;
  price: number;
  color?: string;
  size?: string;
  quantity: number;
}

const BankingDetails = () => {
  const cart = useCart();
  const { user } = useUser();
  const router = useRouter();

  console.log("render cart", cart)

  
  const customer = user? {
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
  }: null;

  console.log("user:", user)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("API URL:", baseUrl);

  const handleOrder = async () => {
    console.log("Customer data:", user);
    console.log("Cart items at handleOrder execution:", cart.cartItems);
  
      if (user) {
        const { id, emailAddresses, username } = user as unknown as UserResource;
  
        try {
          const res = await fetch(`${baseUrl}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cartItems: cart.cartItems.map((item: CartItem) => ({
                item: {
                  _id: item._id,
                  price: item.price,
                  color: item.color || "defaultColor",
                  size: item.size || "defaultSize",
                },
                quantity: item.quantity,
              })),
              user: { id, emailAddresses, username },
            }),
          });
  
          if (res.ok) {
            const data = await res.json();
            console.log("Order created successfully:", data);
            cart.clearCart();
            router.push("/order-confirmation");
          } else {
            const errorData = await res.json();
            console.error("Order failed:", errorData);
          }
        } catch (error) {
          console.error("Order failed:", error);
        }
      } else {
        console.error("User is not available. Please log in or refresh the page.");
      }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-heading4-bold mb-5">Banking Details</h1>
      <p>Please use the following details to complete your payment:</p>
      <p>Bank Name: XYZ Bank</p>
      <p>Account Number: 123456789</p>
      <p>Reference: Use your order ID as the reference: {user?.id}</p>
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
