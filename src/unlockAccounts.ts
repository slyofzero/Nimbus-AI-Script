import { getDocument, updateDocumentById } from "@/firebase";
import { provider } from "@/rpc";
import { StoredAccount } from "@/types";
import { decrypt } from "@/utils/cryptography";
import { errorHandler } from "@/utils/handlers";
import { ethers } from "ethers";
import { splitPayment } from "./utils/web3";

export async function unlockAccounts() {
  const accounts = (await getDocument({
    collectionName: "accounts",
  })) as StoredAccount[];

  for (const { id, secretKey: encryptedSecretKey, locked } of accounts) {
    try {
      const decryptedKey = decrypt(encryptedSecretKey);
      const wallet = new ethers.Wallet(decryptedKey, provider);
      const balance = (await wallet.getBalance()).toBigInt();

      // if (locked) {
      //   await splitPayment(decryptedKey, balance);
      // }

      if (balance === BigInt(0)) {
        updateDocumentById({
          updates: { locked: false, lockedAt: null },
          collectionName: "accounts",
          id: id || "",
        }).then(() => `Unlocked account ${wallet.address}`);
      }
    } catch (error) {
      errorHandler(error);
    }
  }
}
