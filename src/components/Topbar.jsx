import React from "react";
import { Box, Link } from "@mui/material";

import TheWineCornerLogo from "../assets/The Wine Corner Logo.svg";
import { SearchBar } from "./SearchBar";

const links = {
  textDecoration: "none",
  color: "#FFFFFF",
  fontSize: "20px",
  margin: "0 1rem",
  "&:hover": {
    borderBottom: "1px solid white",
  },
};

export const Topbar = () => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#AF1515" }}>
      <Link href="/" style={links}>
        <img src={TheWineCornerLogo} alt="The Wine Corner Logo" />
      </Link>
      <SearchBar />
      <Box
        style={{ display: "flex", alignItems: "center", marginLeft: "2rem" }}
      >
        <Link href="/beer" style={links}>
          Beer
        </Link>
        <Link href="/other" style={links}>
          Other
        </Link>
        <Link href="/red-wine" style={links}>
          Red Wine
        </Link>
        <Link href="/rose-wine" style={links}>
          Rose Wine
        </Link>
        <Link href="/soju" style={links}>
          Soju
        </Link>
        <Link href="/whisky" style={links}>
          Whisky
        </Link>
        <Link href="/white-wine" style={links}>
          White Wine
        </Link>
        <Link href="/product-detail" style={links}>
          Product Detail
        </Link>
      </Box>
    </Box>
  );
};
