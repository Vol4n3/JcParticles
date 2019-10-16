export namespace MathUtils {
    export const randomRange = (n: number) => {
        return Math.random() * n * 2 - n;
    };
    export const round = (n: number, decimal: number = 1): number => {
        return Math.round(n * decimal) / decimal
    };
}
