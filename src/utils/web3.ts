import { ethers } from "ethers";
import { errorHandler, log } from "./handlers";
import { gasLimit, splitPaymentsWith } from "./constants";
import { provider, web3 } from "@/rpc";

export async function sendTransaction(
  secretKey: string,
  amount: number,
  to?: string
) {
  try {
    const wallet = new ethers.Wallet(secretKey, provider);
    const gasPrice = await web3.eth.getGasPrice();
    const valueAfterGas = BigInt(amount) - BigInt(gasLimit) * gasPrice;

    const tx = await wallet.sendTransaction({
      to: to,
      value: valueAfterGas,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
    });

    log(`Fees of ${valueAfterGas} wei sent, ${tx?.hash}`);

    return tx;
  } catch (error) {
    log(`No transaction for ${amount} to ${to}`);
    errorHandler(error);
  }
}

export async function splitPayment(
  secretKey: string,
  totalPaymentAmount: bigint
) {
  for (const revShare in splitPaymentsWith) {
    const { address, share } = splitPaymentsWith[revShare];
    const amountToShare = Number(totalPaymentAmount) * share;

    sendTransaction(secretKey, amountToShare, address);
  }
}
