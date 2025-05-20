import { cardList } from "@/data/CardList";
import React, { ReactNode, useState } from "react";

type PaymentMethod = {
  id: string;
  name: string;
  icon: ReactNode;
};

const Cards = () => {
  const [activeIndex, setActiveIndex] = useState<any>();
  return (
    <div>
      <h2 className=" font-medium text-[14px]">Payment Methods</h2>
      <div className=" grid grid-cols-5 mt-2">
        {cardList.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className={` w-[50px] border-[1px] border-gray-300 flex justify-center items-center flex-col rounded-md hover:scale-110 transition-all cursor-pointer hover:border-yellow-400 p-1 ${
                item.id === activeIndex
                  ? " border-yellow-400 border-[2px]"
                  : null
              }`}
              key={item.id}
              onClick={() => setActiveIndex(item.id)}
            >
              <p className=" text-4xl">
                <Icon />
              </p>
              {/* <p>{item.name}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
