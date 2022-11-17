import React from "react";
import { useParams } from "react-router-dom";

import { Box, Grid, Typography, useMediaQuery } from "@mui/material";

import { productList } from "../seeder/productList";
import { Product } from "./";

const ProductSearch = () => {
  const params = useParams();

  const matches = useMediaQuery("(max-width:768px)");

  const productSearch = params.productSearch;

  const allProduct = productList
    .map((data) => data.data.map((data) => data))
    .flat();

  const filteredProduct = allProduct.filter((data) => {
    return productSearch.length > 0
      ? data.productName.toLowerCase().includes(productSearch.toLowerCase())
      : [];
  });

  return (
    <Box>
      <Typography
        variant={matches ? "body1" : "h6"}
        style={{
          fontWeight: "700",
          marginTop: "2.5rem",
          marginBottom: matches && "1rem",
        }}
      >
        {`Showing ${filteredProduct.length} search results for keyword "${productSearch}"`}
      </Typography>
      <Grid container spacing={2}>
        {filteredProduct.map((data) => {
          return (
            <Grid key={data.no} item md={3} xs={6}>
              <Product
                productId={data.no}
                productImage={data.productImage}
                productName={data.productName}
                productPrice={data.productPrice}
                productPath={data.no.replace(/[0-9]/g, "").slice(0, -1)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductSearch;
