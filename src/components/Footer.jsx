import React from "react";
import { Box, Button, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";

import TheWineCornerLogo from "../assets/The Wine Corner Logo.svg";

export const Footer = () => {
  return (
    <Box
      style={{
        display: "flex",
        backgroundColor: "#AF1515",
        marginTop: "10rem",
      }}
    >
      <img src={TheWineCornerLogo} alt="The Wine Corner Logo" width={400} />
      <Box style={{ display: "flex", marginTop: "6rem" }}>
        <Box>
          <Typography
            variant="h6"
            style={{ color: "#FFFFFF", fontWeight: "400" }}
          >
            OUR SOCIAL MEDIA
          </Typography>
          <Button startIcon={<InstagramIcon />} style={{ color: "#FFFFFF" }}>
            @thewinecorner.id
          </Button>
        </Box>
        <Box style={{ marginLeft: "3rem" }}>
          <Typography
            variant="h6"
            style={{ color: "#FFFFFF", fontWeight: "400" }}
          >
            CONTACT US
          </Typography>
          <Button startIcon={<PhoneIcon />} style={{ color: "#FFFFFF" }}>
            08991890269
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
