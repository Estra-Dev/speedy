"use client";

import React, { useContext, useEffect, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

const Booking = () => {
  const [screenHeight, setScreenHeight] = useState(0);
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);
  const router: any = useRouter();

  useEffect(() => {
    setScreenHeight(window.innerHeight * 0.72);
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className=" border-[1px] p-5 rounded-md border-gray-200 max-h-screen"
        // style={{ height: screenHeight }}
      >
        <AutoCompleteAddress />
        <Cars />
        <Cards />
        <button
          className={` w-full bg-gray-200 p-1 rounded-md mt-4 text-black font-semibold cursor-pointer ${
            carAmount ? "bg-yellow-400" : null
          }`}
          onClick={() => router.push("/payment")}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
