import React from "react";
import { Grid, Typography } from "@mui/material";
import { productList } from "../seeder/productList";
import { Product } from "./Product";

export const ProductList = (props) => {
  const { productType } = props;

  return (
    <div>
      <Typography
        variant="h6"
        style={{ fontWeight: "700", marginTop: "2.5rem" }}
      >
        {productType}
      </Typography>
      <Grid container>
        {productList
          .filter((data) => {
            return data.productType === productType;
          })
          .map((data) => {
            return (
              <Grid item xs={3}>
                <Product
                  key={data.no}
                  productImage={data.productImage}
                  productName={data.productName}
                  productPrice={data.productPrice}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};
