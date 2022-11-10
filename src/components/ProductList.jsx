import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { productList } from "../seeder/productList";
import { Product } from "./Product";

export const ProductList = (props) => {
  const {
    fourItem = false,
    recommendation = false,
    viewAllButton = false,
    productType,
    productPath,
  } = props;

  const navigate = useNavigate();

  const viewAllHandler = () => {
    navigate(`/${productPath}`);
  };

  return (
    <div>
      <Box style={{ display: "flex", marginBottom: ".5rem" }}>
        <Typography
          variant="h6"
          style={{ fontWeight: "700", marginTop: "2.5rem" }}
        >
          {recommendation ? `Other ${productType} You May Like` : productType}
        </Typography>
        {viewAllButton && (
          <Button
            size="small"
            style={{
              alignSelf: "flex-end",
              marginLeft: "auto",
              fontSize: "12px",
              border: "1px solid #AF1515",
              height: "2rem",
              width: "5rem",
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
        {productList
          .filter((data) => {
            return data.productType === productType;
          })
          .map((data) => {
            return fourItem ? data.data.slice(0, 4) : data.data;
          })
          .map((data) =>
            data.map((data) => {
              return (
                <Grid key={data.no} item xs={3}>
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
            })
          )}
      </Grid>
    </div>
  );
};
