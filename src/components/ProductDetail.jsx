import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import { ProductList } from "./ProductList";

export const ProductDetail = () => {
  const discountedProductPrice = null;

  const productName = useSelector((state) => state.productName);
  const productPrice = useSelector((state) => state.productPrice);
  const productImage = useSelector((state) => state.productImage);

  return (
    <>
      <Box style={{ display: "flex", marginTop: "5rem" }}>
        <img
          src={productImage}
          alt=""
          style={{ objectFit: "contain", width: "40%", height: "500px" }}
        />
        <Box style={{ marginTop: "2.5rem" }}>
          <Typography variant="h3" fontWeight={700}>
            {productName}
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
              {productPrice}
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
            >
              Contact via Phone
            </Button>
          </Box>
        </Box>
      </Box>
      <ProductList productType="Soju" fourItem={true} recommendation={true} />
    </>
  );
};
