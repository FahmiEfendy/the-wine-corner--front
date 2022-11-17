import { useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";

const ProductBar = (props) => {
  const { productImage, productName, productPath, productPrice } = props;

  const navigate = useNavigate();

  const productDetailHandler = () => {
    navigate(`/${productPath}/${productName.replace("%", "")}`);
  };

  return (
    <Grid
      container
      style={{ display: "flex", margin: "1rem 0", cursor: "pointer" }}
      onClick={productDetailHandler}
    >
      <Grid item xs={3}>
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
      <Grid item xs={9}>
        <Typography variant="body2">{productName}</Typography>
        <Typography variant="body1">{productPrice}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProductBar;
