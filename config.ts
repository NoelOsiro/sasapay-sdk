import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  clientId: process.env.CLIENT_ID || "",
  clientSecret: process.env.CLIENT_SECRET || "",
  baseUrl: process.env.BASE_URL || "https://sandbox.sasapay.app/api",
};
