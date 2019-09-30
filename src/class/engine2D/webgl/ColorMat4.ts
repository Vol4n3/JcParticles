import {Color} from '../Color';

export class ColorMat4 {
	data: Float32Array = new Float32Array([
		0, 0, 0, 1,
		0, 0, 0, 1,
		0, 0, 0, 1,
		0, 0, 0, 1,
	]);

	setColor(color: Color, index: number) {
		const c: number[] = color.toVec4();
		this.data[index] = c[0];
		this.data[1 + index] = c[1];
		this.data[2 + index] = c[2];
		this.data[3 + index] = c[3];
	}
}
