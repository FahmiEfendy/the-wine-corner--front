import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  useMediaQuery,
} from "@mui/material";

import useHttpRequest from "../hooks/http-hook";
import { ErrorAlert, ProductBar, SearchBar } from "./";

const Topbar = () => {
  const location = useLocation();

  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const matches = useMediaQuery("(max-width:768px)");

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  const toggleMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuHandler = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product?productSearch=${searchQuery}`
        );

        setProductList(responseData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRequest();
  }, [searchQuery, sendRequest]);

  useEffect(() => {
    setSearchQuery("");
    closeMenuHandler();
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box sx={{ backgroundColor: "#AF1515" }}>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <Link to="/">
          <img
            src={require("../assets/logo-wine-corner-min.jpg")}
            alt="The Wine Corner Logo"
            width={matches ? 50 : 100}
            style={{
              position: matches && "absolute",
              left: 10,
            }}
          />
        </Link>
        {matches && (
          <IconButton
            sx={{
              color: "#FFFFFF",
              position: "absolute",
              right: 10,
              top: 4,
            }}
            onClick={toggleMenuHandler}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: matches && "column",
            position: matches && "relative",
            top: matches && 40,
            height: matches ? (isMenuOpen ? "25rem" : "3.1rem") : "6.6rem",
          }}
        >
          {isMenuOpen || !matches ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: matches && "1rem",
                }}
              >
                <SearchBar
                  setSearchQuery={setSearchQuery}
                  searchQuery={searchQuery}
                  sx={{
                    width: matches ? "21.5rem" : "25rem",
                    height: matches ? "2rem" : "3rem",
                  }}
                  sxSearch={{ height: matches ? "2rem" : "2.5rem" }}
                />
                <Paper
                  sx={{
                    maxHeight: "25rem",
                    width: matches ? "21.5rem" : "25rem",
                    overflow: "auto",
                    position: "absolute",
                    marginTop: matches ? "2.5rem" : "5rem",
                    "&::-webkit-scrollbar": {
                      width: "10px",
                    },
                    "::-webkit-scrollbar-thumb": {
                      backgroundColor: "#AF1515",
                      borderRadius: "8px",
                      border: "3px solid transparent",
                      backgroundClip: "content-box",
                    },
                    "::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#D93434",
                    },
                  }}
                >
                  {searchQuery &&
                    !error &&
                    (isLoading ? (
                      <CircularProgress />
                    ) : (
                      productList?.map((data) => {
                        const productPath = data.productPath;
                        return data?.products.map((product) => {
                          return (
                            <Fragment key={product.id}>
                              <ProductBar
                                productId={product.id}
                                productImage={`${process.env.REACT_APP_ASSET_URL}/${product.productImage}`}
                                productName={product.productName}
                                productPath={productPath}
                                productPrice={product.productPrice}
                              />
                              <Divider />
                            </Fragment>
                          );
                        });
                      })
                    ))}
                </Paper>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: matches && "column",
                  alignItems: "center",
                  marginLeft: !matches && "3rem",
                }}
              >
                {productList.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <NavLink
                        end
                        to={`${data.productPath}`}
                        onClick={closeMenuHandler}
                        style={({ isActive }) =>
                          isActive
                            ? {
                                textDecoration: "none",
                                color: "#FFFFFF",
                                fontSize: matches ? "14px" : "20px",
                                margin: matches ? ".5rem 0rem" : "0 1rem",
                                textAlign: "center",
                                borderBottom: !matches && "1px solid white",
                                paddingBottom: !matches && "2px",
                              }
                            : {
                                textDecoration: "none",
                                color: "#FFFFFF",
                                fontSize: matches ? "14px" : "20px",
                                margin: matches ? ".5rem 0rem" : "0 1rem",
                                textAlign: "center",
                              }
                        }
                      >
                        {data.productType}
                      </NavLink>
                      {index < 8 && matches && (
                        <Divider
                          flexItem
                          style={{
                            background: "#FFFFFF",
                            width: "90%",
                            margin: "0 auto",
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Container>
      <ErrorAlert error={error} onClose={clearErrorHandler} />
    </Box>
  );
};

export default Topbar;
