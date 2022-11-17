import React from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import { productList } from "../seeder/productList";
import { ProductList } from "./";

const ProductDetail = () => {
  const params = useParams();

  const matches = useMediaQuery("(max-width:768px)");

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
    (data) => data.productName.replace("%", "") === productName
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
              height: matches ? "150px" : "500px",
              margin: "0 auto",
              display: "block",
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <Box style={{ marginTop: !matches && "2.5rem" }}>
            <Typography variant={matches ? "body2" : "h4"} fontWeight={700}>
              {selectedProduct.productName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                margin: matches ? ".5rem 0" : "1rem 0 2rem 0",
              }}
            >
              <Typography
                variant={matches ? "body2" : "h4"}
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
                sx={{
                  backgroundColor: "#AF1515",
                  color: "#FFFFFF",
                  height: matches ? "1.5rem" : "3rem",
                  padding: "0 1rem",
                  fontSize: matches && "10px",
                  textTransform: "capitalize",
                  marginTop: matches && "1rem",
                  "&:hover": {
                    backgroundColor: "#D93434",
                  },
                }}
                onClick={mailHandler}
              >
                Contact via Email
              </Button>
              <Button
                startIcon={<PhoneIcon />}
                sx={{
                  border: "1px solid #AF1515",
                  color: "#AF1515",
                  height: matches ? "1.5rem" : "3rem",
                  padding: "0 1rem",
                  margin: matches ? ".5rem 0 2rem 0" : "0 auto 0 2rem",
                  fontSize: matches && "10px",
                  textTransform: "capitalize",
                  "&:hover": {
                    color: "#D93434",
                    border: "1px solid #D93434",
                  },
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
