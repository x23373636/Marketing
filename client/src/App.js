import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Navbar from "./components/Navbar";
import HomePage from "./HomePage";
import CreateCampaign from "./components/CreateCampaign";
import AcceptCampaign from "./components/AcceptCampaign";
import CompleteCampaign from "./components/CompleteCampaign";
import SubmitWork from "./components/submitWork";
import { Container } from "@mui/material";

function App() {
  return (
    <WalletProvider>
      <Router>
        <Navbar />
        <Container maxWidth="md" sx={{ py: 4, minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateCampaign />} />
            <Route path="/accept" element={<AcceptCampaign />} />
            <Route path="/submit" element={<SubmitWork />} />
            <Route path="/complete" element={<CompleteCampaign />} />
          </Routes>
        </Container>
      </Router>
    </WalletProvider>
  );
}

export default App;
