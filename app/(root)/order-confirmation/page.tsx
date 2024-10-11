"use client";
import { useRouter } from "next/navigation";

const OrderConfirmation = () => {
    const router = useRouter()
    
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-heading4-bold">Order Confirmed</h1>
      <p>Your order has been placed and will be processed soon.</p>
      <p>Please complete the payment using the provided banking details.</p>
      <button
        className="border rounded-lg text-body-bold bg-white py-3 p-5 mt-10 hover:bg-black hover:text-white"
        onClick={()=>(router.push("/"))}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderConfirmation;
