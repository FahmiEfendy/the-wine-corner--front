import React from "react";

import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";

import TheWineCornerLogo from "../assets/The Wine Corner Logo.svg";

const Footer = () => {
  const matches = useMediaQuery("(max-width:768px)");

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
        marginTop: matches ? "5rem" : "10rem",
        height: matches && "12rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container sx={{ display: "flex" }}>
        <img
          src={TheWineCornerLogo}
          alt="The Wine Corner Logo"
          width={matches ? 150 : 400}
        />
        <Box
          style={{
            display: "flex",
            marginTop: matches ? "1rem" : "6rem",
            flexDirection: matches && "column",
            justifyContent: matches && "space-around",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              style={{
                color: "#FFFFFF",
                fontWeight: "400",
                fontSize: matches && "10px",
              }}
            >
              OUR SOCIAL MEDIA
            </Typography>
            <Button
              startIcon={<InstagramIcon />}
              style={{ color: "#FFFFFF", fontSize: matches && ".6rem" }}
              onClick={igHandler}
            >
              @thewinecorner.id
            </Button>
          </Box>
          <Box
            style={{
              marginLeft: !matches && "3rem",
              minWidth: matches && "100%",
            }}
          >
            <Typography
              variant={matches ? "body2" : "h6"}
              style={{
                color: "#FFFFFF",
                fontWeight: "400",
                fontSize: matches && "10px",
              }}
            >
              CONTACT US
            </Typography>
            <Button
              startIcon={<PhoneIcon />}
              style={{ color: "#FFFFFF", fontSize: matches && ".6rem" }}
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
