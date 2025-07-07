import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#101010",
        color: "#fff",
        py: 2,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          &copy; {new Date().getFullYear()} All Movies
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
