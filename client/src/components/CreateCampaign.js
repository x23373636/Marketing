import { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from '../context/WalletContext';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box,
  Alert
} from '@mui/material';

export default function CreateCampaign() {
  const [brand, setBrand] = useState('');
  const [payment, setPayment] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { account, contract } = useContext(WalletContext);

  const createCampaign = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!brand || !payment) {
      setError("Please fill all fields");
      return;
    }

    try {
      const tx = await contract.createCampaign(brand, { 
        value: ethers.parseEther(payment) 
      });
      await tx.wait();
      setSuccess('Campaign Created Successfully!');
      setBrand('');
      setPayment('');
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || "Failed to create campaign");
      setSuccess('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Create Campaign
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
          label="Brand Name"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Payment (ETH)"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          fullWidth
          required
        />
        <Button 
          variant="contained" 
          onClick={createCampaign}
          disabled={!account}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}