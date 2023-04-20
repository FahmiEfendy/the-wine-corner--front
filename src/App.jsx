import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";

import useHttpRequest from "./hooks/http-hook";
import { ErrorAlert, Footer, ProductList, Topbar } from "./components";
import {
  Admin,
  Home,
  ProductDetail,
  UrlNotFound,
  ProductSearch,
} from "./pages";

function App() {
  const [productList, setProductList] = useState();

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product`
        );

        setProductList(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequest();
  }, [sendRequest]);

  return (
    <>
      <Topbar />
      <Container maxWidth="xl" sx={{ minHeight: "37.1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {!error &&
            !isLoading &&
            productList &&
            productList.map((data, index) => {
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
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<UrlNotFound />} />
        </Routes>
      </Container>
      <ErrorAlert error={error} onClose={clearErrorHandler} />
      <Footer />
    </>
  );
}

export default App;
