export type ProductId = string;

export type Product = {
    name: string;
    id: ProductId;
    description: string;
    unitPrice: number;
};

export type FormattedProduct = Omit<Product, "unitPrice"> & {
    unitPrice: string;
};

export type ProductDetails = Product & {
    amount: number;
};

export type FormattedProductDetails = Omit<ProductDetails, "unitPrice"> & {
    unitPrice: string;
};
