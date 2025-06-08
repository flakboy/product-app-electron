export type ProductId = string;

export type Product = {
    name: string;
    id: ProductId;
    description: string;
    price: number;
};

export type ProductDetails = Product & {
    amount: number;
};
