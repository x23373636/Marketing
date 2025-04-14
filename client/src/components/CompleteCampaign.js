import { useState, useContext } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../context/WalletContext";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert
} from "@mui/material";
import contractABI from "../contract/MarketingCampaignABI.json";

const CONTRACT_ADDRESS = "0xAa10FdE12a5C11C3Db1b76c41D49967601921C8e";

export default function CompleteCampaign() {
  const [campaignId, setCampaignId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { account } = useContext(WalletContext);

  const completeCampaign = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!campaignId) {
      setError("Please enter a Campaign ID");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      const tx = await contract.releasePayment(campaignId);
      await tx.wait();
      
      setSuccess("Payment released successfully!");
      setCampaignId("");
    } catch (error) {
      console.error("Completion failed:", error);
      setError(error.message || "Failed to complete campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Complete Campaign
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Box component="form" sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        '& .MuiTextField-root': {
          mb: 2
        }
      }}>
        <TextField
          label="Campaign ID"
          variant="outlined"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          fullWidth
          required
        />
        
        <Button
          variant="contained"
          color="success"
          onClick={completeCampaign}
          disabled={loading || !account}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Processing...
            </>
          ) : (
            "Release Payment"
          )}
        </Button>
      </Box>
    </Paper>
  );
}