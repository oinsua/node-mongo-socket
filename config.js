import { config } from "dotenv";

//execute config dotenv
config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const SECRET = process.env.SECRET;