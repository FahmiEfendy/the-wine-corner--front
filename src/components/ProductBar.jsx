import { Link } from "react-router-dom";

import { Grid, Typography, useMediaQuery } from "@mui/material";

const ProductBar = ({
  productImage,
  productName,
  productPath,
  productPrice,
}) => {
  const matches = useMediaQuery("(max-width:768px)");

  const formatProductName = (text) => {
    const maxLength = 80;

    return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
  };

  return (
    <Link
      to={`/${productPath}/${productName.replace("%", "")}`}
      style={{
        display: "flex",
        textDecoration: "none",
        color: "#000000",
      }}
    >
      <Grid
        container
        sx={{
          padding: "1rem 0",
          "&:hover": {
            backgroundColor: "rgba(217, 52, 52, 0.1)",
          },
        }}
      >
        <Grid item md={3} xs={4}>
          <img
            src={productImage}
            alt={productName}
            style={{
              objectFit: "contain",
              height: "80px",
              margin: " 0 auto",
              display: "block",
            }}
          />
        </Grid>
        <Grid item md={9} xs={8}>
          <Typography style={{ fontSize: matches ? "12px" : "14px" }}>
            {formatProductName(productName)}
          </Typography>
          <Typography style={{ fontSize: matches ? "12px" : "16px" }}>
            {productPrice}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

export default ProductBar;
