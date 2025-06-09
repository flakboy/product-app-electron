export function isHttpStatusOk(res: Response) {
    return res.status.toString().startsWith("20");
}
