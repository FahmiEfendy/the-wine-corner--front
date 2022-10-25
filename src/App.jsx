import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import { Home } from "./components/Home";
import { ProductList } from "./components/ProductList";
import { ProductDetail } from "./components/ProductDetail";
import { Topbar } from "./components/Topbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <Container maxWidth="xl">
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beer" element={<ProductList productType="Beer" />} />
          <Route path="/other" element={<ProductList productType="Other" />} />
          <Route
            path="/red-wine"
            element={<ProductList productType="Red Wine" />}
          />
          <Route
            path="/rose-wine"
            element={<ProductList productType="Rose Wine" />}
          />
          <Route path="/soju" element={<ProductList productType="Soju" />} />
          <Route
            path="/whisky"
            element={<ProductList productType="Whisky" />}
          />
          <Route
            path="/white-wine"
            element={<ProductList productType="White Wine" />}
          />
          <Route path="/product-detail" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
