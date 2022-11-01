import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, Paper, Typography } from "@mui/material";

import { productActions } from "../store";

export const Product = (props) => {
  const { productImage, productName, productPrice, productId, productPath } =
    props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(
      productActions.productDetail({
        productId,
        productName,
        productPrice,
        productImage,
        productPath,
      })
    );
    navigate(`${productPath}/${productName}`);
  };

  return (
    <Paper
      elevation={1}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
      onClick={clickHandler}
    >
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={productImage}
          alt={productName}
          style={{ objectFit: "contain", width: "70%", height: "250px" }}
        />
      </Box>
      <Box style={{ height: "70px", display: "flex", alignItems: "center" }}>
        <Typography style={{ fontSize: "16px" }}>{productName}</Typography>
      </Box>
      <Typography style={{ fontWeight: "700", fontSize: "18px" }}>
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
