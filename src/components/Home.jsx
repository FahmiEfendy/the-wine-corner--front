import React from "react";

import { ProductList } from "./ProductList";
import { productList } from "../seeder/productList";

export const Home = () => {
  return (
    <>
      {productList.map((data, index) => {
        return (
          <ProductList
            key={index}
            productType={data.productType}
            productPath={data.productPath}
            fourItem={true}
          />
        );
      })}
    </>
  );
};
