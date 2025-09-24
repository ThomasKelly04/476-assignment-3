import hre from "hardhat";
import "dotenv/config";

async function main() {
  if (!process.env.TOKEN_ADDRESS) throw new Error("TOKEN_ADDRESS not set");

  const token = await hre.ethers.getContractAt("MyToken", process.env.TOKEN_ADDRESS);

  const current = await hre.ethers.provider.getBlockNumber();
  const fromBlock = current - 2000;

  console.log("Querying events from block", fromBlock, "to", current);

  const transfers = await token.queryFilter("Transfer", fromBlock, current);
  const approvals = await token.queryFilter("Approval", fromBlock, current);

  console.log("\nTransfers:");
  transfers.forEach(e =>
    console.log(`Block ${e.blockNumber} | from ${e.args.from} to ${e.args.to} value ${e.args.value}`)
  );

  console.log("\nApprovals:");
  approvals.forEach(e =>
    console.log(`Block ${e.blockNumber} | owner ${e.args.owner} spender ${e.args.spender} value ${e.args.value}`)
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});




