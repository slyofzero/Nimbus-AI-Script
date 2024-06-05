export const firebaseCollectionPrefix = "hostai";
export const gasLimit = 21000;
export const splitPaymentsWith: {
  [key: string]: { address: string; share: number };
} = {
  dev: {
    address: "0xdE2193378CA3fb5A256a8F86a8F4513Fc68aB4DA",
    share: 1,
  },
};
