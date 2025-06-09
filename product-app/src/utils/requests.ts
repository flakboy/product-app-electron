import { GATEWAY_URL } from "../consts/api";

export function isHttpStatusOk(res: Response) {
    return res.status.toString().startsWith("20");
}

export function getProductDetails(productId: string) {
    return fetch(`${GATEWAY_URL}/products/${productId}`);
}
