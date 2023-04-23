import React, { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import useHttpRequest from "../hooks/http-hook";
import { ErrorAlert, ProductList } from "../components";

const Home = () => {
  const [productList, setProductList] = useState([]);

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product`
        );

        setProductList(responseData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRequest();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {!error && isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem 0",
          }}
        >
          <CircularProgress color="error" />
        </Box>
      ) : (
        productList?.map((data) => {
          return (
            <ProductList
              key={data.id}
              productType={data.productType}
              productPath={data.productPath}
              fourItem={data.products.length >= 4 && true}
              viewAllButton={data.products.length >= 4 && true}
            />
          );
        })
      )}
      <ErrorAlert error={error} onClose={clearErrorHandler} />
    </React.Fragment>
  );
};

export default Home;
