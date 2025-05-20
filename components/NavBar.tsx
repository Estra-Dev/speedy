import React from "react";
import { Outfit, Supermercado_One } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const outfit = Outfit({
  subsets: ["latin"],
});
const supermercado_One = Supermercado_One({
  subsets: ["latin"],
  weight: "400",
});

const NavBar = () => {
  return (
    <nav
      className={`${outfit.className} flex justify-between items-center px-5 md:px-10 py-3 gap-7 border-b-[0.5px] border-gray-700/30 shadow-md`}
    >
      <div className=" flex gap-10 items-center">
        <h1 className={`${supermercado_One.className} text-blue-500 text-3xl`}>
          speedy
        </h1>
        <div className=" hidden md:flex gap-5 text-gray-800 text-sm">
          <h2 className=" hover:bg-gray-100 p-2 rounded-md transition-all">
            <Link href={"/"}>HOME</Link>
          </h2>
          <h2 className=" hover:bg-gray-100 p-2 rounded-md transition-all">
            <Link href={"/"}>HISTORY</Link>
          </h2>
          <h2 className=" hover:bg-gray-100 p-2 rounded-md transition-all">
            <Link href={"/"}>HELP</Link>
          </h2>
        </div>
      </div>
      <UserButton afterSwitchSessionUrl="/" />
    </nav>
  );
};

export default NavBar;
