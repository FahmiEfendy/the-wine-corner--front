import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Paper, Typography, useMediaQuery } from "@mui/material";

const Product = (props) => {
  const { productImage, productName, productPrice, productPath } = props;

  const matches = useMediaQuery("(max-width:768px)");

  const navigate = useNavigate();

  const productDetailHandler = () => {
    navigate(`/${productPath}/${productName.replace("%", "")}`);
  };

  return (
    <Paper
      elevation={1}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: matches ? ".5rem" : "1rem",
        cursor: "pointer",
      }}
      onClick={productDetailHandler}
    >
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={productImage}
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
          {productName}
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
  );
};

export default Product;
