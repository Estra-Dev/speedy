import {
  FaCcApplePay,
  FaCcMastercard,
  FaCcVisa,
  FaGooglePay,
} from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { ReactNode } from "react";

type PaymentMethod = {
  id: string;
  name: string;
  icon: React.ComponentType;
};

export const cardList: PaymentMethod[] = [
  {
    id: "1",
    name: "Master Card",
    icon: FaCcMastercard,
  },
  {
    id: "2",
    name: "Visa Card",
    icon: FaCcVisa,
  },
  {
    id: "3",
    name: "Apple Pay",
    icon: FaCcApplePay,
  },
  {
    id: "4",
    name: "Google Pay",
    icon: FaGooglePay,
  },
  {
    id: "5",
    name: "Cash",
    icon: BsCashCoin,
  },
];
