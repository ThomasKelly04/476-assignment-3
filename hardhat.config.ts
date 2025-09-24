import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import "@nomicfoundation/hardhat-ethers";
import "dotenv/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    didlab: {
	type: "http",
	url: process.env.RPC_URL || "",
      	chainId: Number(process.env.CHAIN_ID),
      	accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;

