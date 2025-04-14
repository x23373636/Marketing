import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Welcome to the Marketing Campaign DApp
      </Typography>
      <Typography variant="h6" gutterBottom>
        Create, manage, and complete decentralized marketing campaigns.
      </Typography>
      <Button
        component={Link}
        to="/create"
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;
