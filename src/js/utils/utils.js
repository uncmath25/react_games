export function buildConstArr(size, c) {
    return [...Array(size).keys()].map(_ => c);
}
