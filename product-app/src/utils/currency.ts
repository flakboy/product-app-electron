export function formatCurrency(price: number): string {
    return (price / 100).toFixed(2);
}

export function currencyToInteger(formatted: string) {
    return parseInt(formatted.replace(".", ""));
}
