import { Router, Request, Response } from "express";
import { CART_API_HOST, PRODUCT_API_HOST } from "../consts";
import { number, z } from "zod";

import cors from "cors";

const ProductSchema = {};

type Product = {
    id: string;
    name: string;
    amount: number;
    unitPrice: number;
    description: string;
    reservations: any[];
};

export function createDesktopAppRouter() {
    const router = Router();

    router.use(cors());

    //get cart data
    router.get(`/carts/:id`, async (req, res, next) => {
        const CartIdSchema = z.string().uuid();

        const cartId = req.params["id"];

        try {
            CartIdSchema.parse(cartId);
        } catch {
            res.status(400).json({
                status: "failed",
                message: `Invalid value for ID parameter. Got: ${cartId}`,
            });
            return;
        }

        try {
            const response = await fetch(
                `${CART_API_HOST}/carts/${cartId}`
            ).then((resp) => resp.json());

            const data = response;

            res.json({
                status: "success",
                data,
            });
        } catch {
            res.status(502).json({
                status: "failed",
                message: "Failed to get cart",
            });
            return;
        }
    });

    //get product list
    router.get("/products", async (req, res, next) => {
        try {
            const response = await fetch(`${PRODUCT_API_HOST}/products`).then(
                (resp) => resp.json()
            );

            let data: Product[] = response["data"];

            let filtered = data.map((item) => {
                const { reservations, ...rest } = item;

                return { ...rest, price: rest.unitPrice };
            });

            res.json({ data: filtered });
        } catch {
            res.status(502).json({
                status: "failed",
                message: "Failed to get product list",
            });
            return;
        }
    });

    router.get("/products/:id", async (req, res, next) => {
        const ProductIdSchema = z.string().uuid();

        const productId = req.params["id"];

        try {
            ProductIdSchema.parse(productId);
        } catch {
            res.status(400).json({
                status: "failed",
                message: `Invalid value for ID parameter. Got: ${productId}`,
            });
            return;
        }

        try {
            // http://localhost:3001/products/0dae6160-005f-4f80-bf95-19ab2563138e
            const response = await fetch(
                `${PRODUCT_API_HOST}/products/${productId}`
            ).then((resp) => resp.json());

            const data = response;

            delete data["reservations"];

            res.json({
                status: "success",
                data,
            });
        } catch {
            res.status(502).json({
                status: "failed",
                message: "Failed to get product list",
            });
            return;
        }
    });

    return router;
}
