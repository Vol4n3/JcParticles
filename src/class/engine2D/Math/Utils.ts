export namespace MathUtils {
    export const randomRange = (n: number) => {
        return Math.random() * n - n / 2;
    }

}
