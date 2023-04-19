import React, { useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";

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
        <CircularProgress />
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
