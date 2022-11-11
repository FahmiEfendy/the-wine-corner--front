import React from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import { productList } from "../seeder/productList";
import { ProductList } from "./";

const ProductDetail = () => {
  const params = useParams();

  const discountedProductPrice = null;

  const productPath = params.productPath;
  const productName = params.productName;
  const productType = productList.find(
    (data) => data.productPath === productPath
  ).productType;

  const selectedProductType = productList.find(
    (data) => data.productType === productType
  );

  const selectedProduct = selectedProductType.data.find(
    (data) => data.productName === productName
  );

  const mailHandler = () => {
    const email = "dummy_email@gmail.com";
    const cc = "dummy_cc@gmail.com";
    const subject = "Product Availability";
    const body = `Hello, is this ${productName} ready ?`;

    window.open(`mailto:${email}?cc=${cc}&subject=${subject}&body=${body}`);
  };

  const phoneHandler = () => {
    const phoneNumber = 1234567890;

    window.open(`tel:${[phoneNumber]}`);
  };

  return (
    <>
      <Grid container style={{ marginTop: "5rem" }}>
        <Grid item xs={5}>
          <img
            src={selectedProduct.productImage}
            alt={selectedProduct.productName}
            style={{
              objectFit: "contain",
              height: "500px",
              margin: " 0 auto 0 auto",
              display: "block",
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <Box style={{ marginTop: "2.5rem" }}>
            <Typography variant="h4" fontWeight={700}>
              {selectedProduct.productName}
            </Typography>
            <Box sx={{ display: "flex", margin: "1rem 0 2rem 0" }}>
              <Typography
                variant="h4"
                style={
                  discountedProductPrice && {
                    color: "red",
                    textDecoration: "line-through",
                  }
                }
              >
                {selectedProduct.productPrice}
              </Typography>
              <Typography variant="h4" style={{ marginLeft: "1rem" }}>
                {discountedProductPrice}
              </Typography>
            </Box>
            <Box>
              <Button
                startIcon={<EmailIcon />}
                style={{
                  backgroundColor: "#AF1515",
                  color: "#FFFFFF",
                  height: "3rem",
                  padding: "0 1rem",
                  textTransform: "capitalize",
                }}
                onClick={mailHandler}
              >
                Contact via Email
              </Button>
              <Button
                startIcon={<PhoneIcon />}
                style={{
                  border: "1px solid #AF1515",
                  color: "#AF1515",
                  height: "3rem",
                  padding: "0 1rem",
                  margin: "0 auto 0 2rem",
                  textTransform: "capitalize",
                }}
                onClick={phoneHandler}
              >
                Contact via Phone
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ProductList
        hideProduct={selectedProduct.no}
        productType={productType}
        productPath={productPath}
        fourItem={true}
        recommendation={true}
      />
    </>
  );
};

export default ProductDetail;
