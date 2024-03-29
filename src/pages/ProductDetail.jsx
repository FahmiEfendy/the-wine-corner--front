import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";

import useHttpRequest from "../hooks/http-hook";
import { ErrorAlert, ProductList } from "../components";

const style = (matches) => ({
  border: "1px solid #AF1515",
  color: "#AF1515",
  height: matches ? "1.5rem" : "3rem",
  margin: matches ? ".5rem 0 0 0" : "0 auto 0 2rem",
  fontSize: matches && "10px",
  textTransform: "none",
  "&:hover": {
    color: "#D93434",
    border: "1px solid #D93434",
  },
});

const ProductDetail = () => {
  const { productId, productPath } = useParams();

  const productType = productPath
    .replace("-", " ")
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

  const matches = useMediaQuery("(max-width:768px)");

  const [selectedProduct, setSelectedProduct] = useState();

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  const discountedProductPrice = null;

  const blibliHandler = () => {
    window.open("https://www.blibli.com/merchant/the-wine-corner/THW-70022");
  };

  const topedHandler = () => {
    window.open("https://www.tokopedia.com/thewinecornerid");
  };

  const whatsAppHandler = () => {
    const phoneNumber = 628991890269;

    window.open(
      `https://wa.me/${phoneNumber}?text=Hello,%20apakah%20${selectedProduct[0].productName}%20ready?`
    );
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/${productPath}/${productId}`
        );
        setSelectedProduct(responseData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRequest();
  }, [productId, productPath, sendRequest]);

  return (
    <React.Fragment>
      {!error &&
        (isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem 0",
            }}
          >
            <CircularProgress color="error" />
          </Box>
        ) : (
          selectedProduct && (
            <React.Fragment>
              <Grid container style={{ margin: "5rem 0rem" }}>
                <Grid item xs={6}>
                  <img
                    src={`${process.env.REACT_APP_ASSET_URL}/${selectedProduct[0].productImage}`}
                    alt={selectedProduct[0].productName}
                    style={{
                      objectFit: "contain",
                      height: matches ? "150px" : "500px",
                      margin: "0 auto",
                      display: "block",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box style={{ marginTop: !matches && "2.5rem" }}>
                    <Typography
                      variant={matches ? "body2" : "h4"}
                      fontWeight={700}
                    >
                      {selectedProduct[0].productName}
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
                        {selectedProduct[0].productPrice}
                      </Typography>
                      <Typography variant="h4" style={{ marginLeft: "1rem" }}>
                        {discountedProductPrice}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        startIcon={
                          <WhatsAppIcon sx={{ marginBottom: "2px" }} />
                        }
                        sx={{
                          backgroundColor: "#AF1515",
                          color: "#FFFFFF",
                          height: matches ? "1.5rem" : "3rem",
                          padding: "0 1rem",
                          fontSize: matches && "10px",
                          textTransform: "none",
                          marginTop: matches && "1rem",
                          "&:hover": {
                            backgroundColor: "#D93434",
                          },
                        }}
                        onClick={whatsAppHandler}
                      >
                        Contact via WhatsApp
                      </Button>
                      <Button
                        startIcon={
                          <img
                            style={{
                              width: "20px",
                              height: "20px",
                              marginLeft: ".3rem",
                            }}
                            src={require("../assets/logo-blibli.png")}
                            alt="Blibli Logo"
                          />
                        }
                        sx={style(matches)}
                        onClick={blibliHandler}
                      >
                        Official Store via Blibli
                      </Button>
                      <Button
                        startIcon={
                          <img
                            style={{
                              width: "13px",
                              height: "17px",
                              margin: "0 .1rem 0 .7rem",
                            }}
                            src={require("../assets/logo-tokopedia.png")}
                            alt="Tokopedia Logo"
                          />
                        }
                        sx={style(matches)}
                        onClick={topedHandler}
                      >
                        Official Store via Tokopedia
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <ProductList
                productId={productId}
                productType={productType}
                productPath={`/${productPath}`}
                fourItem={true}
                recommendation={true}
              />
            </React.Fragment>
          )
        ))}
      <ErrorAlert error={error} onClose={clearErrorHandler} />
    </React.Fragment>
  );
};

export default ProductDetail;
