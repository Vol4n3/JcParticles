export namespace MathUtils {
    export const randomRange = (max: number, min?: number) => {
        if (typeof min !== 'undefined') {
            if (min > max) {
                max = min;
            }
            return Math.round(Math.random() * (max - min) + min);
        }
        return Math.random() * max * 2 - max;
    };
    export const round = (n: number, decimal: number = 1): number => {
        return Math.round(n * decimal) / decimal;
    };
    export const average = (numbers: number[]) => {
        return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }
}
