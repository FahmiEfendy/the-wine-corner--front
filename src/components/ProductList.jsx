import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";

import { productList } from "../seeder/productList";
import { Product } from "./";

const ProductList = (props) => {
  const {
    fourItem = false,
    recommendation = false,
    viewAllButton = false,
    productType,
    productPath,
    hideProduct,
  } = props;

  const navigate = useNavigate();

  const matches = useMediaQuery("(max-width:768px)");

  const viewAllHandler = () => {
    navigate(`/${productPath}`);
  };

  const selectedProductType = productList.find(
    (data) => data.productType === productType
  );

  const recommendationProduct = selectedProductType.data.filter(
    (data) => data.no !== hideProduct
  );

  const products = (recommendationProduct) => {
    if (fourItem) {
      return recommendationProduct.slice(0, 4);
    } else if (!fourItem) {
      return recommendationProduct;
    }
  };

  return (
    <div>
      <Box style={{ display: "flex", marginBottom: ".5rem" }}>
        <Typography
          variant={matches ? "body1" : "h5"}
          style={{ fontWeight: "700", marginTop: "2.5rem" }}
        >
          {recommendation
            ? products(recommendationProduct).length > 0
              ? `Other ${productType} You May Like`
              : ""
            : productType}
        </Typography>
        {viewAllButton && (
          <Button
            size="small"
            style={{
              alignSelf: "flex-end",
              marginLeft: "auto",
              fontSize: matches ? "10px" : "12px",
              border: "1px solid #AF1515",
              height: matches ? "1.5rem" : "2rem",
              width: matches ? "3rem" : "5rem",
              color: "#AF1515",
              textTransform: "capitalize",
            }}
            onClick={viewAllHandler}
          >
            View All
          </Button>
        )}
      </Box>
      <Grid container spacing={2}>
        {products(recommendationProduct).map((data) => {
          return (
            <Grid key={data.no} item md={3} xs={6}>
              <Product
                productId={data.no}
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
    </div>
  );
};

export default ProductList;
