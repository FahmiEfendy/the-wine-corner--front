import React from "react";

import { ProductList } from "./";
import { productList } from "../seeder/productList";

const Home = () => {
  return (
    <>
      {productList.map((data, index) => {
        return (
          <ProductList
            key={index}
            productType={data.productType}
            productPath={data.productPath}
            fourItem={data.data.length >= 4 && true}
            viewAllButton={data.data.length >= 4 && true}
          />
        );
      })}
    </>
  );
};

export default Home;
