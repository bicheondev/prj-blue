import type { Product } from "./types";

import imgBeer from "figma:asset/a16ac54d8f28bca4dd21f135c7a35ef1966d8831.png";
import imgSoju from "figma:asset/e1bf144cc4b21883acbc1ad418c48a99f9e60220.png";

export const PRODUCTS: Product[] = [
  {
    id: "beer-500",
    manufacturer: "대동강맥주공장",
    name: "대동강 2호 맥주 500ml",
    price: 15000,
    imageUrl: imgBeer,
    category: "대동강맥주",
  },
  {
    id: "soju-360",
    manufacturer: "대동강식료공장",
    name: "평양소주 360ml",
    price: 24000,
    imageUrl: imgSoju,
    category: "평양소주",
  },
];
