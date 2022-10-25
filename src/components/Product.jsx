import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

export const Product = (props) => {
  const { productImage, productName, productPrice } = props;

  return (
    <Paper
      elevation={1}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: ".5rem",
        padding: "1rem",
      }}
    >
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={productImage}
          alt={productName}
          style={{ objectFit: "contain", width: "70%", height: "250px" }}
        />
      </Box>
      <Box style={{ height: "50px", display: "flex", alignItems: "center" }}>
        <Typography style={{ fontSize: "12px" }}>{productName}</Typography>
      </Box>
      <Typography style={{ fontWeight: "700", fontSize: "14px" }}>
        {productPrice}
      </Typography>
      <Button
        style={{
          alignSelf: "flex-end",
          backgroundColor: "#AF1515",
          color: "#FFFFFF",
          fontSize: "8px",
        }}
      >
        See Details
      </Button>
    </Paper>
  );
};
