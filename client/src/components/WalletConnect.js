import { Button } from '@mui/material';
import { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

export default function WalletConnect() {
  const { account, connectWallet, disconnectWallet } = useContext(WalletContext);

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      {account ? (
        <div>
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
          <Button 
            variant="contained" 
            color="error"
            onClick={disconnectWallet}
            style={{ marginTop: '10px' }}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button 
          variant="contained" 
          color="primary"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}