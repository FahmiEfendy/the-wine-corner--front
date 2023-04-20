import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";

import useHttpRequest from "../hooks/http-hook";
import { ErrorAlert, Product } from "../components";

const ProductSearch = () => {
  const { productSearch } = useParams();

  const matches = useMediaQuery("(max-width:768px)");

  const [productList, setProductList] = useState([]);

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product?productSearch=${productSearch}`
        );

        setProductList(responseData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRequest();
  }, [productSearch, sendRequest]);

  return (
    <React.Fragment>
      <Box>
        <Typography
          variant={matches ? "body1" : "h6"}
          style={{
            fontWeight: "700",
            marginTop: "2.5rem",
            marginBottom: matches && "1rem",
          }}
        >
          {`Showing search results for keyword "${productSearch}"`}
        </Typography>
        <Grid container spacing={2}>
          {!error &&
            (isLoading ? (
              <CircularProgress />
            ) : (
              productList.map((data) => {
                const productPath = data.productPath;
                return data?.products.map((product) => {
                  return (
                    <Grid key={product.id} item md={3} xs={6}>
                      <Product
                        productId={product.id}
                        productImage={product.productImage}
                        productName={product.productName}
                        productPrice={product.productPrice}
                        productPath={productPath}
                      />
                    </Grid>
                  );
                });
              })
            ))}
        </Grid>
      </Box>
      <ErrorAlert error={error} onClose={clearErrorHandler} />
    </React.Fragment>
  );
};

export default ProductSearch;
