import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Box, Container, Divider, Paper } from "@mui/material";

import TheWineCornerLogo from "../assets/The Wine Corner Logo.svg";
import { ProductBar, SearchBar } from "./";
import { productList } from "../seeder/productList";

const links = {
  textDecoration: "none",
  color: "#FFFFFF",
  fontSize: "20px",
  margin: "0 1rem",
  "&:hover": {
    borderBottom: "1px solid white",
  },
};

const Topbar = () => {
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  const allProduct = productList
    .map((data) => data.data.map((data) => data))
    .flat();

  const filteredProduct = allProduct.filter((data) => {
    return searchQuery.length > 0
      ? data.productName.toLowerCase().includes(searchQuery)
      : [];
  });

  useEffect(() => {
    setSearchQuery("");
  }, [location]);

  return (
    <Box
      sx={{
        backgroundColor: "#AF1515",
      }}
    >
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <Link to="/">
          <img src={TheWineCornerLogo} alt="The Wine Corner Logo" />
        </Link>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <SearchBar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          <Paper
            sx={{
              maxHeight: "30rem",
              width: "30rem",
              overflow: "auto",
              position: "absolute",
              marginTop: "5rem",
            }}
          >
            {searchQuery &&
              filteredProduct?.map((data) => {
                return (
                  <Fragment key={data.no}>
                    <ProductBar
                      productImage={data.productImage}
                      productName={data.productName}
                      productPath={data.no.replace(/[0-9]/g, "").slice(0, -1)}
                      productPrice={data.productPrice}
                    />
                    <Divider />
                  </Fragment>
                );
              })}
          </Paper>
        </Box>
        <Box
          style={{ display: "flex", alignItems: "center", marginLeft: "2rem" }}
        >
          {productList.map((data, index) => {
            return (
              <Link to={`/${data.productPath}`} key={index} style={links}>
                {data.productType}
              </Link>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Topbar;
