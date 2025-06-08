import { ProductDetails, ProductId } from "../types/products";

export class ProductModel {
    constructor() {}

    async fetchProduct(_id: ProductId): Promise<ProductDetails> {
        // throw new Error("Not implemented!");

        return {
            name: "Lenovo Thinkpad 212321",
            id: "12312311",
            price: 100000,
            description: "Lorem ipsum dolor sit amet",
            amount: 100,
        };
    }
}
