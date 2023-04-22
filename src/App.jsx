import { Routes, Route } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";

import { CircularProgress, Container } from "@mui/material";

import useAuth from "./hooks/auth-hook";
import useHttpRequest from "./hooks/http-hook";
import AuthContenxt from "./context/auth-context";
import { ErrorAlert, Footer, ProductList, Topbar } from "./components";
import {
  Admin,
  Login,
  Home,
  ProductDetail,
  UrlNotFound,
  ProductSearch,
} from "./pages";

function App() {
  const [productList, setProductList] = useState();

  const { userId, userToken, login, logout } = useAuth();

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
    <AuthContenxt.Provider
      value={{ isLogin: !!userToken, userId, userToken, login, logout }}
    >
      <Topbar />
      <Container maxWidth="xl" sx={{ minHeight: "37.1rem" }}>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            {userToken ? (
              <Route path="/admin" element={<Admin />} />
            ) : (
              <Route path="/admin" element={<Login />} />
            )}
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
            <Route
              path="/:productPath/:productId"
              element={<ProductDetail />}
            />
            <Route path="/search/:productSearch" element={<ProductSearch />} />
            <Route path="*" element={<UrlNotFound />} />
          </Routes>
        </Suspense>
      </Container>
      <ErrorAlert error={error} onClose={clearErrorHandler} />
      <Footer />
    </AuthContenxt.Provider>
  );
}

export default App;
