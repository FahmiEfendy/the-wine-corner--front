import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import TheWineCornerLogo from "../assets/The Wine Corner Logo.svg";
import { ProductBar, SearchBar } from "./";
import { productList } from "../seeder/productList";

const Topbar = () => {
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const matches = useMediaQuery("(max-width:768px)");

  const allProduct = productList
    .map((data) => data.data.map((data) => data))
    .flat();

  const filteredProduct = allProduct.filter((data) => {
    return searchQuery.length > 0
      ? data.productName.toLowerCase().includes(searchQuery.toLowerCase())
      : [];
  });

  const toggleMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuHandler = () => {
    setIsMenuOpen(false);
  };

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
            src={TheWineCornerLogo}
            alt="The Wine Corner Logo"
            width={matches ? 50 : 100}
            style={{
              position: matches && "absolute",
              left: 10,
              top: 5,
            }}
          />
        </Link>
        {matches && (
          <IconButton
            sx={{
              color: "#FFFFFF",
              position: "absolute",
              right: 10,
              top: 8,
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
            height: matches ? (isMenuOpen ? "22.5rem" : "3.5rem") : "6.6rem",
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
                    width: matches ? "21.5rem" : "30rem",
                    height: matches ? "2rem" : "3rem",
                  }}
                  sxSearch={{ height: matches ? "2rem" : "2.5rem" }}
                />
                <Paper
                  sx={{
                    maxHeight: "25rem",
                    width: matches ? "21.5rem" : "30rem",
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
                    filteredProduct?.map((data) => {
                      return (
                        <Fragment key={data.no}>
                          <ProductBar
                            productImage={data.productImage}
                            productName={data.productName}
                            productPath={data.no
                              .replace(/[0-9]/g, "")
                              .slice(0, -1)}
                            productPrice={data.productPrice}
                          />
                          <Divider />
                        </Fragment>
                      );
                    })}
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
                        to={`/${data.productPath}`}
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
                      {index < 7 && matches && (
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
    </Box>
  );
};

export default Topbar;
