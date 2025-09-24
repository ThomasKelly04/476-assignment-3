import hre from "hardhat";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  if (!process.env.TOKEN_ADDRESS) {
    throw new Error("TOKEN_ADDRESS not set in .env");
  }

  const [owner, second] = await hre.ethers.getSigners();
  const token = await hre.ethers.getContractAt("MyToken", process.env.TOKEN_ADDRESS);

  console.log("Balances before:");
  console.log("Owner:", (await token.balanceOf(owner.address)).toString());
  console.log("Second:", (await token.balanceOf(second.address)).toString());

  // Transfer 10 tokens
  const tx1 = await token.transfer(second.address, hre.ethers.parseUnits("10", 18));
  const r1 = await tx1.wait();
  console.log("Transfer tx:", tx1.hash, "Block:", r1.blockNumber, "Gas used:", r1.gasUsed.toString());

  // Approve 5 tokens
  const tx2 = await token.appr

