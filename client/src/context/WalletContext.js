import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../contract/MarketingCampaignABI.json";

const CONTRACT_ADDRESS = "0xAa10FdE12a5C11C3Db1b76c41D49967601921C8e";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [selectedAccount] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(selectedAccount);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI,
          signer
        );
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
  };

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          connectWallet();
        }
      }
    };
    checkConnectedWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ account, contract, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};