const hre = require("hardhat");

async function main() {
  const ContractFactory = await hre.ethers.getContractFactory("MarketingCampaign");
  const contract = await ContractFactory.deploy();

  // ✅ Correct method for Ethers v6
  await contract.waitForDeployment();

  // ✅ Get contract address safely
  const contractAddress = await contract.getAddress();
  console.log("✅ Contract deployed to:", contractAddress);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
