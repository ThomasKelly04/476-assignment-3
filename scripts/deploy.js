import hre from "hardhat";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  if (!process.env.PRIVATE_KEY || !process.env.RPC_URL) {
    throw new Error("Please set RPC_URL and PRIVATE_KEY in .env");
  }

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying from:", deployer.address);

  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy();

  const receipt = await token.deployTransaction.wait();

  console.log("Deploy tx hash:", token.deployTransaction.hash);
  console.log("Deployed contract address:", token.address);
  console.log("Block number:", receipt.blockNumber);

  console.log("✅ Copy this address into your .env as TOKEN_ADDRESS");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

