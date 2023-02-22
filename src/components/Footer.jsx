import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const matches = useMediaQuery("(max-width:768px)");

  const igHandler = () => {
    window.open("https://www.instagram.com/thewinecorner.id/");
  };

  const phoneHandler = () => {
    const phoneNumber = "08991890269";

    window.open(`tel:${[phoneNumber]}`);
  };

  const storeHandler = () => {
    window.open(
      "https://www.google.com/maps/place/The+Wine+Corner/@-6.2643896,106.783088,15z/data=!4m5!3m4!1s0x0:0x5cde2091b0d7ada3!8m2!3d-6.2643735!4d106.7830896"
    );
  };

  return (
    <Box
      style={{
        backgroundColor: "#AF1515",
        marginTop: matches ? "5rem" : "10rem",
        height: matches && "12rem",
        display: "flex",
      }}
    >
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <img
          src={require("../assets/logo-wine-corner-min.jpg")}
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
              OUR STORE
            </Typography>
            <Button
              startIcon={<StoreIcon />}
              style={{
                color: "#FFFFFF",
                fontSize: matches && ".6rem",
                textAlign: "left",
                alignItems: "flex-start",
                textDecoration: "none",
              }}
              onClick={storeHandler}
            >
              PIM 2 Lt. LG North Atrium No. 3<br />
              Jakarta Selatan - 12310
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
