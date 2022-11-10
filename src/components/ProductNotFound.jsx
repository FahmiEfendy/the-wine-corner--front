import React from "react";
import { Typography } from "@mui/material";

const ProductNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", mt: "5rem" }}>
        URL Not Found
      </Typography>
    </div>
  );
};

export default ProductNotFound;
