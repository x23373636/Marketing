import { useState, useContext } from 'react';
import { WalletContext } from '../context/WalletContext';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box,
  Alert
} from '@mui/material';

export default function AcceptCampaign() {
  const [campaignId, setCampaignId] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { account, contract } = useContext(WalletContext);

  const handleAcceptCampaign = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!campaignId) {
      setError("Please enter Campaign ID");
      return;
    }

    try {
      const tx = await contract.acceptCampaign(campaignId);
      await tx.wait();
      setSuccess('Campaign Accepted Successfully!');
      setCampaignId('');
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || "Failed to accept campaign");
      setSuccess('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Accept Campaign
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
        gap: 3
      }}>
        <TextField
          label="Campaign ID"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          fullWidth
          required
        />
        <Button 
          variant="contained" 
          onClick={handleAcceptCampaign}
          disabled={!account}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Accept
        </Button>
      </Box>
    </Paper>
  );
}