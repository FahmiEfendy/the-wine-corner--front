import React from "react";
import { Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";

import { productList } from "./seeder/productList";
import { Footer, ProductList, Topbar } from "./components";
import { Home, ProductDetail, UrlNotFound, ProductSearch } from "./pages";

function App() {
  return (
    <>
      <Topbar />
      <Container maxWidth="xl" sx={{ minHeight: "37.1rem" }}>
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
          <Route path="/:productPath/:productId" element={<ProductDetail />} />
          <Route path="/search/:productSearch" element={<ProductSearch />} />
          <Route path="*" element={<UrlNotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
