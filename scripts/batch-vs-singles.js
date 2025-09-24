import hre from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  if (!process.env.TOKEN_ADDRESS) throw new Error("TOKEN_ADDRESS not set in .env");

  const [owner, a1, a2, a3] = await hre.ethers.getSigners();
  const token = await hre.ethers.getContractAt("MyToken", process.env.TOKEN_ADDRESS);

  const recipients = [a1.address, a2.address, a3.address];
  const amounts = [
    hre.ethers.parseUnits("5", 18),
    hre.ethers.parseUnits("7", 18),
    hre.ethers.parseUnits("3", 18),
  ];

  // Batch airdrop
  const txBatch = await token.airdrop(recipients, amounts, {
    maxFeePerGas: hre.ethers.parseUnits("50", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("2", "gwei"),
  });
  const receiptBatch = await txBatch.wait();
  console.log("Batch gas:", receiptBatch.gasUsed.toString());

  // Single transfers
  let totalGas = 0n;
  for (let i = 0; i < recipients.length; i++) {
    const tx = await token.transfer(recipients[i], amounts[i], {
      maxFeePerGas: hre.ethers.parseUnits("50", "gwei"),
      maxPriorityFeePerGas: hre.ethers.parseUnits("2", "gwei"),
    });
    const r = await tx.wait();
    totalGas += r.gasUsed;
  }
  console.log("Singles gas:", totalGas.toString());

  const saved = ((Number(totalGas - receiptBatch.gasUsed) / Number(totalGas)) * 100).toFixed(2);
  console.log("Gas saved %:", saved);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

