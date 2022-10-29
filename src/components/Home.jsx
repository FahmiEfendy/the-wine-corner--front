import React from "react";
import { ProductList } from "./ProductList";

export const Home = () => {
  return (
    <>
      <ProductList productType="Beer" fourItem={true} />
      <ProductList productType="Other" fourItem={true} />
      <ProductList productType="Red Wine" fourItem={true} />
      <ProductList productType="Rose Wine" fourItem={true} />
      <ProductList productType="Soju" fourItem={true} />
      <ProductList productType="Whisky" fourItem={true} />
      <ProductList productType="White Wine" fourItem={true} />
    </>
  );
};
