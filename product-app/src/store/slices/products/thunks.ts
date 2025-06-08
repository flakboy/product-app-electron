import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../../types/products";
import {
    getCachedProductList,
    setCachedProductList,
} from "../../../utils/cache";
import { sleep } from "../../../utils/sleep";

export const fetchProductListThunk = createAsyncThunk(
    "products/fetchList",
    async (): Promise<Product[]> => {
        try {
            // const response = await fetch("...").then((res) => res.json());
            //TODO: remove the sleep call
            sleep(5000);
            const response = {
                data: [
                    {
                        name: "Example product",
                        description: "Lorem ipsum",
                        id: "512411",
                        price: 10000,
                    },
                    {
                        name: "Example product",
                        description: "Lorem ipsum",
                        id: "512412",
                        price: 10000,
                    },
                    {
                        name: "Example product",
                        description: "Lorem ipsum",
                        id: "512413",
                        price: 10000,
                    },
                ],
            };

            setCachedProductList(response.data);
            return response.data;
        } catch {
            return getCachedProductList();
        }
    }
);
