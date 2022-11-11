import React from "react";

import { productList } from "../seeder/productList";
import { ProductList } from "./";

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
