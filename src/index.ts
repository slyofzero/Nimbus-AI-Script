import { cleanUpInstances } from "./cleanUpInstances";
import { unlockAccounts } from "./unlockAccounts";
import { log } from "./utils/handlers";
// Check for new transfers at every 20 seconds
const interval = 20;

(async function () {
  log("Script started");

  async function toRepeat() {
    unlockAccounts();
    cleanUpInstances();

    setTimeout(toRepeat, interval * 1e3);
  }
  await toRepeat();
})();
