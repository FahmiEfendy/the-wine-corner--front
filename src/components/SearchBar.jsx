import React from "react";

import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const { searchQuery, setSearchQuery } = props;

  const searchHandler = (e) => {
    setSearchQuery?.(e.target.value);
  };

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
        value={searchQuery}
        placeholder="Search something..."
        onChange={(e) => searchHandler(e)}
        InputProps={{
          style: {
            height: "3rem",
            width: "30rem",
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

export default SearchBar;
