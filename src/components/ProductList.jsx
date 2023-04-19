import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { ErrorAlert, Product } from "./";
import useHttpRequest from "../hooks/http-hook";

const ProductList = ({
  productId,
  productPath,
  productType,
  fourItem = false,
  viewAllButton = false,
  recommendation = false,
}) => {
  const location = useLocation();

  const matches = useMediaQuery("(max-width:768px)");

  const [productList, setProductList] = useState();

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  useEffect(() => {
    const fetchRequest = async () => {
      if (fourItem) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/recommendation?productType=${productType}&productId=${productId}`
          );

          setProductList(responseData.data);
        } catch (err) {
          console.log(err.message);
        }
      } else {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/product?productType=${productType}`
          );

          setProductList(responseData.data[0].products);
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    fetchRequest();
  }, [fourItem, productId, productType, sendRequest]);

  return (
    <React.Fragment>
      {!error &&
        (isLoading ? (
          <CircularProgress />
        ) : (
          productList && (
            <Box style={{ marginTop: "2.5rem" }}>
              {location.pathname === "/" && (
                <Typography
                  variant={matches ? "body1" : "h5"}
                  style={{ fontWeight: "700" }}
                >
                  {
                    {
                      "Red Wine": "Wine",
                      Gin: "Spirit",
                      Soju: "Other Products",
                    }[productType]
                  }
                </Typography>
              )}
              <Box style={{ display: "flex", marginBottom: ".5rem" }}>
                <Typography
                  variant={matches ? "body1" : "h5"}
                  style={{ fontWeight: "400", marginTop: "1rem" }}
                >
                  {recommendation
                    ? productList.length > 0 &&
                      `Other ${productType} You May Like`
                    : productType}
                </Typography>
                {viewAllButton && (
                  <Link
                    to={`${productPath}`}
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                      marginLeft: "auto",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Button
                      size="small"
                      style={{
                        fontSize: matches ? "10px" : "12px",
                        border: "1px solid #AF1515",
                        height: matches ? "1.5rem" : "2rem",
                        width: matches ? "3rem" : "5rem",
                        color: "#AF1515",
                        textTransform: "capitalize",
                      }}
                    >
                      View All
                    </Button>
                  </Link>
                )}
              </Box>
              <Grid container spacing={2}>
                {productList.map((data) => {
                  return (
                    <Grid key={data.id} item md={3} xs={6}>
                      <Product
                        productId={data.id}
                        productImage={data.productImage}
                        productName={data.productName}
                        productPrice={data.productPrice}
                        productType={productType}
                        productPath={productPath}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )
        ))}
      <ErrorAlert error={error} onClose={clearErrorHandler} />
    </React.Fragment>
  );
};

export default ProductList;
