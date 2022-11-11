import React from "react";

import { Box, Button, Container, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";

import TheWineCornerLogo from "../assets/The Wine Corner Logo.svg";

const Footer = () => {
  const igHandler = () => {
    window.open("https://www.instagram.com/thewinecorner.id/");
  };

  const phoneHandler = () => {
    const phoneNumber = 1234567890;

    window.open(`tel:${[phoneNumber]}`);
  };

  return (
    <Box
      style={{
        backgroundColor: "#AF1515",
        marginTop: "10rem",
      }}
    >
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <img src={TheWineCornerLogo} alt="The Wine Corner Logo" width={400} />
        <Box style={{ display: "flex", marginTop: "6rem" }}>
          <Box>
            <Typography
              variant="h6"
              style={{ color: "#FFFFFF", fontWeight: "400" }}
            >
              OUR SOCIAL MEDIA
            </Typography>
            <Button
              startIcon={<InstagramIcon />}
              style={{ color: "#FFFFFF" }}
              onClick={igHandler}
            >
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
            <Button
              startIcon={<PhoneIcon />}
              style={{ color: "#FFFFFF" }}
              onClick={phoneHandler}
            >
              08991890269
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
