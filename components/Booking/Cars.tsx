import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import CarList from "@/data/CarList";
import Image from "next/image";
import React, { useContext, useState } from "react";

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

  const getCost = (charges: any) => {
    return (
      charges *
      directionData.routes[0]?.distance *
      0.000621371192
    ).toFixed(2);
  };
  return (
    <div className=" mt-3">
      <h2 className=" font-semibold">Select Car</h2>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-2 lg:grid-cols-3 p-3">
        {CarList.map((item) => (
          <div
            key={item.id}
            className={` h-[120px] flex flex-col gap-3 justify-center items-center mt-2 p-2 border-[1px] border-gray-300 cursor-pointer rounded-md hover:border-yellow-400 ${
              item.id === selectedCar && "border-yellow-400 border-[2px]"
            }`}
            onClick={() => {
              setSelectedCar(item.id);
              setCarAmount(getCost(item.charges));
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
              className=" w-full object-cover overflow-hidden"
            />
            <h1 className=" text-sm w-full text-gray-500">
              {item.name}
              {directionData?.routes ? (
                <span className=" float-right text-black font-medium">
                  ${getCost(item.charges)}
                </span>
              ) : null}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
