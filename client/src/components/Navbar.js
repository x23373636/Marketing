import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import WalletConnect from "./WalletConnect";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Left: App Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
        >
          Campaign DApp
        </Typography>

        {/* Center: Navigation */}
        <Box display="flex" gap={2} flexWrap="wrap" mt={{ xs: 1, sm: 0 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/create">Create</Button>
          <Button color="inherit" component={Link} to="/accept">Accept</Button>
          <Button color="inherit" component={Link} to="/submit">Submit</Button>
          <Button color="inherit" component={Link} to="/complete">Complete</Button>
        </Box>

        {/* Right: Wallet */}
        <Box mt={{ xs: 1, sm: 0 }}>
          <WalletConnect />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
