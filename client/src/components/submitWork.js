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

export default function SubmitWork() {
  const [campaignId, setCampaignId] = useState("");
  const [proofLink, setProofLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { account } = useContext(WalletContext);

  const submitWork = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!campaignId || !proofLink) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      const tx = await contract.submitWork(campaignId, proofLink);
      await tx.wait();
      
      setSuccess("Work submitted successfully!");
      setCampaignId("");
      setProofLink("");
    } catch (error) {
      console.error("Submission failed:", error);
      setError(error.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Submit Work Proof
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
        
        <TextField
          label="Proof Link (URL)"
          variant="outlined"
          value={proofLink}
          onChange={(e) => setProofLink(e.target.value)}
          fullWidth
          required
        />
        
        <Button
          variant="contained"
          onClick={submitWork}
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
              Submitting...
            </>
          ) : (
            "Submit Work"
          )}
        </Button>
      </Box>
    </Paper>
  );
}