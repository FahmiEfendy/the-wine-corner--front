import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@mui/material";

import TheWineCornerLogo from "../assets/The Wine Corner Logo.svg";
import { SearchBar } from "./";
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
  return (
    <Box sx={{ display: "flex", backgroundColor: "#AF1515" }}>
      <Link to="/" style={links}>
        <img src={TheWineCornerLogo} alt="The Wine Corner Logo" />
      </Link>
      <SearchBar />
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
    </Box>
  );
};

export default Topbar;
