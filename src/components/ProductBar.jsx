import { useNavigate } from "react-router-dom";

import { Grid, Typography, useMediaQuery } from "@mui/material";

const ProductBar = (props) => {
  const { productImage, productName, productPath, productPrice } = props;

  const navigate = useNavigate();

  const matches = useMediaQuery("(max-width:768px)");

  const productDetailHandler = () => {
    navigate(`/${productPath}/${productName.replace("%", "")}`);
  };

  return (
    <Grid
      container
      style={{ display: "flex", margin: "1rem 0", cursor: "pointer" }}
      onClick={productDetailHandler}
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
        <Typography style={{ fontSize: matches ? "12px" : "16px" }}>
          {productName}
        </Typography>
        <Typography style={{ fontSize: matches ? "12px" : "18px" }}>
          {productPrice}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProductBar;
