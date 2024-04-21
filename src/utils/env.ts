import dotenv from "dotenv";

export const { NODE_ENV } = process.env;
dotenv.config({
  path: NODE_ENV === "development" ? ".env" : ".env.production",
});

export const {
  FIREBASE_KEY,
  ENCRYPTION_KEY,
  RPC_URL,
  AWS_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
} = process.env;
