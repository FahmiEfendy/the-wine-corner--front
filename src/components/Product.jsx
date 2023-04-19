import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, Paper, Typography, useMediaQuery } from "@mui/material";

const Product = ({ productImage, productName, productPrice, productPath }) => {
  const matches = useMediaQuery("(max-width:768px)");

  const formatProductName = (text) => {
    const maxLength = 80;

    return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
  };

  return (
    <Link
      to={`/${productPath}/${productName.replace("%", "")}`}
      style={{
        textDecoration: "none",
        color: "#000000",
      }}
    >
      <Paper
        elevation={1}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: matches ? ".5rem" : "1rem",
          cursor: "pointer",
        }}
      >
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={`${process.env.REACT_APP_ASSET_URL}/${productImage}`}
            alt={productName}
            style={{
              objectFit: "contain",
              width: "70%",
              height: matches ? "100px" : "250px",
            }}
          />
        </Box>
        <Box
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography style={{ fontSize: matches ? "12px" : "16px" }}>
            {formatProductName(productName)}
          </Typography>
        </Box>
        <Typography
          style={{ fontWeight: "700", fontSize: matches ? "12px" : "18px" }}
        >
          {productPrice}
        </Typography>
        <Button
          sx={{
            alignSelf: "flex-end",
            backgroundColor: "#AF1515",
            color: "#FFFFFF",
            fontSize: matches ? "6px" : "8px",
            "&:hover": {
              backgroundColor: "#D93434",
            },
          }}
        >
          See Details
        </Button>
      </Paper>
    </Link>
  );
};

export default Product;
