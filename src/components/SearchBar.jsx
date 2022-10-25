import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";

export const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto 0",
        height: "2.5rem",
      }}
    >
      <TextField
        size="small"
        placeholder="Search something..."
        InputProps={{
          style: {
            height: "3rem",
            width: "15rem",
            fontSize: "12px",
            borderRadius: "5px 0px 0px 5px",
            backgroundColor: "#FFFFFF",
          },
        }}
      />
      <Box sx={{ backgroundColor: "black", borderRadius: "0px 5px 5px 0px" }}>
        <IconButton sx={{ color: "white" }}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
