import React from "react";
import { ProductList } from "./ProductList";

export const Home = () => {
  return (
    <>
      <ProductList productType="Red Wine" fourItem={true} />
      <ProductList productType="Soju" fourItem={true} />
    </>
  );
};
