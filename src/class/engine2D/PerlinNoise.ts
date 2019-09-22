export class PerlinNoise {
    permutationTable: Uint8Array = new Uint8Array(512);
    permutationTableMod12: Uint8Array = new Uint8Array(512);

    constructor() {
        this.buildPermutationTable();
    }

    buildPermutationTable() {
        const p: Uint8Array = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
            this.permutationTable[i] = i;
        }
        for (let i = 0; i < 255; i++) {
            const r = i + ~~(Math.random() * (256 - i));
            const aux = this.permutationTable[i];
            this.permutationTable[i] = this.permutationTable[r];
            this.permutationTable[r] = aux;
        }
        for (let i = 0; i < 512; i++) {
            this.permutationTable[i] = p[i & 255];
            this.permutationTableMod12[i] = this.permutationTable[i] % 12;
        }
    }

    noise2D(xin, yin) {
        const grad3 = new Float32Array([
            1, 1, 0,
            -1, 1, 0,
            1, -1, 0,

            -1, -1, 0,
            1, 0, 1,
            -1, 0, 1,

            1, 0, -1,
            -1, 0, -1,
            0, 1, 1,

            0, -1, 1,
            0, 1, -1,
            0, -1, -1
        ]);
        const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
        const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
        const F3 = 1.0 / 3.0;
        const G3 = 1.0 / 6.0;
        const F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
        const G4 = (5.0 - Math.sqrt(5.0)) / 20.0;
        let n0 = 0, n1 = 0, n2 = 0;
        const s = (xin + yin) * F2;
        const i = Math.floor(xin + s);
        const j = Math.floor(yin + s);
        const t = (i + j) * G2;
        const X0 = i - t;
        const Y0 = j - t;
        const x0 = xin - X0;
        const y0 = yin - Y0;
        let i1, j1;
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } else {
            i1 = 0;
            j1 = 1;
        }
        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2;
        const y2 = y0 - 1.0 + 2.0 * G2;
        const ii = i & 255;
        const jj = j & 255;
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            const gi0 = this.permutationTableMod12[ii + this.permutationTableMod12[jj]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            const gi1 = this.permutationTableMod12[ii + i1 + this.permutationTableMod12[jj + j1]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            const gi2 = this.permutationTableMod12[ii + 1 + this.permutationTableMod12[jj + 1]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
        }
        return 70.0 * (n0 + n1 + n2);
    }

}