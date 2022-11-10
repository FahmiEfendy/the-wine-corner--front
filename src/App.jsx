import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import { Home } from "./components/Home";
import { ProductList } from "./components/ProductList";
import { ProductDetail } from "./components/ProductDetail";
import { Topbar } from "./components/Topbar";
import { Footer } from "./components/Footer";
import { productList } from "./seeder/productList";

function App() {
  return (
    <Container maxWidth="xl">
      <Topbar />
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
        <Route path="/:productPath/:productName" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
