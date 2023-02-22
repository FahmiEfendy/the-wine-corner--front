import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, setSearchQuery, sx, sxSearch }) => {
  const navigate = useNavigate();

  const searchHandler = (e) => {
    setSearchQuery?.(e.target.value);
  };

  const searchClickHandler = () => {
    if (searchQuery.length > 0) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const enterHandler = (e) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      navigate(`/search/${searchQuery}`);
    }
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
        onKeyDown={enterHandler}
        InputProps={{
          style: {
            height: "3rem",
            fontSize: "12px",
            borderRadius: "5px 0px 0px 5px",
            backgroundColor: "#FFFFFF",
            ...sx,
          },
        }}
      />
      <Box
        sx={{
          backgroundColor: "black",
          borderRadius: "0px 5px 5px 0px",
          ...sxSearch,
        }}
      >
        <IconButton
          sx={{ color: "white", ...sxSearch }}
          onClick={searchClickHandler}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;
