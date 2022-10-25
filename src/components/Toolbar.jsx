import React from "react";
import { Box, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

import TheWineCornerLogo from "../assets/The Wine Corner Logo.svg";
import { SearchBar } from "./SearchBar";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: "20px",
    margin: "0 1rem",
    "&:hover": {
      borderBottom: "1px solid white",
    },
  },
}));

export default function Toolbar() {
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex", backgroundColor: "#AF1515" }}>
      <img src={TheWineCornerLogo} alt="The Wine Corner Logo" />
      <SearchBar />
      <Box
        style={{ display: "flex", alignItems: "center", marginLeft: "2rem" }}
      >
        <Link href="#" className={classes.link}>
          Beer
        </Link>
        <Link href="#" className={classes.link}>
          Gin
        </Link>
        <Link href="#" className={classes.link}>
          Other
        </Link>
        <Link href="#" className={classes.link}>
          Red Wine
        </Link>
        <Link href="#" className={classes.link}>
          Rose Wine
        </Link>
        <Link href="#" className={classes.link}>
          Soju
        </Link>
        <Link href="#" className={classes.link}>
          Whisky
        </Link>
        <Link href="#" className={classes.link}>
          White Wine
        </Link>
      </Box>
    </Box>
  );
}
