import { Router, json as expressJson } from "express";
import { CART_API_HOST, PRODUCT_API_HOST } from "../consts";
import { z } from "zod";

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

const AddProductRequestValidator = z.object({
    id: z.string(),
    amount: z.number(),
    price: z.number(),
});

const DeleteProductRequestValidator = z.object({
    productId: z.string(),
});

export function createDesktopAppRouter() {
    const router = Router();

    router.use(cors());
    router.use(expressJson());

    //get cart by user
    router.get(`/carts/user/:id`, async (req, res, next) => {
        const UserIdSchema = z.string();

        const userId = req.params["id"];

        try {
            UserIdSchema.parse(userId);
        } catch {
            res.status(400).json({
                status: "failed",
                message: `Invalid value for ID parameter. Got: ${userId}`,
            });
            return;
        }

        try {
            const response = await fetch(
                `${CART_API_HOST}/carts/user/${userId}`
            );

            if (response.status === 404) {
                res.status(404).json({
                    status: "failed",
                    reason: `Couldn't find cart for ${userId}`,
                });
            }

            const data = await response.json();
            res.json({
                status: "success",
                data: { cartId: data.cartId },
            });
        } catch {
            res.status(502).json({
                status: "failed",
                message: "Failed to get cart",
            });
            return;
        }
    });

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
            const response = await fetch(`${CART_API_HOST}/carts/${cartId}`);

            if (response.status === 404) {
                res.status(404).json({
                    status: "failed",
                    reason: `Couldn't find cart ${cartId}`,
                });
            }

            const data = await response.json();

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

    //create a new cart for user
    router.post(`/carts`, async (req, res) => {
        const CartUserSchema = z.object({
            userId: z.string(),
        });

        const newCartBody = req.body;

        try {
            CartUserSchema.parse(newCartBody);
        } catch {
            res.status(400).json({
                status: "failed",
                message: `Invalid value for ID parameter. Got: ${JSON.stringify(
                    newCartBody
                )}`,
            });
            return;
        }

        try {
            const response = await fetch(`${CART_API_HOST}/carts/`, {
                method: "POST",
                body: JSON.stringify(newCartBody),
                headers: new Headers({ "content-type": "application/json" }),
            });

            if (response.status === 404) {
                res.status(404).json({
                    status: "failed",
                    reason: `Couldn't find cart ${newCartBody}`,
                });
            }

            const data = await response.json();

            if (!response.status.toString().startsWith("20")) {
                res.status(response.status).json({
                    status: "failed",
                    message: data.reason || data.message,
                });
                return;
            }

            console.log(data);
            res.json({
                status: "success",
                data: { cartId: data.cartId },
            });
        } catch {
            res.status(502).json({
                status: "failed",
                message: "Failed to create cart",
            });
            return;
        }
    });

    //add product to cart
    router.post("/carts/:id/products", async (req, res, next) => {
        try {
            console.log(req.body);
            AddProductRequestValidator.parse(req.body);
        } catch {
            res.status(400).json({
                status: "failed",
                message: `Invalid request body.`,
            });
            return;
        }

        try {
            const cartId = req.params["id"];
            const { price, amount, id } = req.body;

            const response = await fetch(
                `${CART_API_HOST}/carts/${cartId}/products`,
                {
                    method: "POST",
                    headers: new Headers({
                        "content-type": "application/json",
                    }),
                    body: JSON.stringify({
                        price,
                        amount,
                        productId: id,
                    }),
                }
            );

            const status = response.status;
            const data = await response.json();
            if (!status.toString().startsWith("20")) {
                res.status(status).json({
                    status: "failed",
                    message: data.reason || data.message,
                });

                return;
            }

            console.log(data);

            res.json({
                status: "sucess",
            });
        } catch {
            res.status(502).json({
                status: "failed",
                message: "Failed to update the cart",
            });
        }
    });

    //remove product from cart
    router.delete("/carts/:id/products", async (req, res, next) => {
        try {
            DeleteProductRequestValidator.parse(req.body);
        } catch {
            res.status(400).json({
                status: "failed",
                message: `Invalid request body.`,
            });
            return;
        }

        try {
            const cartId = req.params["id"];
            const { productId } = req.body;

            const response = await fetch(
                `${CART_API_HOST}/carts/${cartId}/products`,
                {
                    method: "DELETE",
                    headers: new Headers({
                        "content-type": "application/json",
                    }),
                    body: JSON.stringify({
                        productId,
                    }),
                }
            );

            const status = response.status;
            const data = await response.json();
            if (!status.toString().startsWith("20")) {
                res.status(status).json({
                    status: "failed",
                    message: data.reason || data.message,
                });

                return;
            }

            res.json({
                status: "sucess",
            });
        } catch {
            res.status(502).json({
                status: "failed",
                message: "Failed to update the cart",
            });
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
            );

            if (response.status === 404) {
                res.status(404).json({
                    status: "failed",
                    reason: `Couldn't find cart ${productId}`,
                });
            }

            const data = await response.json();

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
