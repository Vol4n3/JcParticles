export namespace MathUtils {
    export const randomRange = (n: number) => {
        return Math.random() * n * 2 - n;
    }
}
