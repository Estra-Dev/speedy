import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = () => {
  const stripe: any = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: 58,
      }),
    });
    const secretKey = await res.json();
    console.log("secretKey", secretKey);
    const { error } = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_APP_URL,
      },
    });
  };

  return (
    <div className=" flex flex-col justify-center max-w-md mx-auto mt-7">
      <form onSubmit={handleSubmit} className=" ">
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || !elements}
          className=" w-full p-2 bg-yellow-500 mt-4 rounded-md cursor-pointer"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
