import React from "react";
import { Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";

import { productList } from "./seeder/productList";
import {
  Footer,
  Home,
  ProductDetail,
  ProductList,
  ProductNotFound,
  Topbar,
} from "./components";

function App() {
  return (
    <>
      <Topbar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          {productList.map((data, index) => {
            return (
              <Route
                key={index}
                path={`/${data.productPath}`}
                element={
                  <ProductList
                    productType={data.productType}
                    productPath={data.productPath}
                  />
                }
              />
            );
          })}
          <Route
            path="/:productPath/:productName"
            element={<ProductDetail />}
          />
          <Route path="*" element={<ProductNotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
