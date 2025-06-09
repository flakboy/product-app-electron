import dotenv from "dotenv";

dotenv.config();

export const CART_API_HOST =
    process.env["CART_API_HOST"] || "http://localhost:3000/api";
export const PRODUCT_API_HOST =
    process.env["PRODUCT_API_HOST"] || "http://localhost:3001/api";
