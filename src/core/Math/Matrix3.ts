import {Matrix} from './Matrix';

export interface ITransform2D {
	width: number,
	height: number,
	position: { x: number, y: number };
	rotation: { x: number, y: number, angle: number },
	scale: { x: number, y: number }
}

export class Matrix3 extends Matrix {

	constructor(public data: Float32Array = Matrix3.identity) {
		super();
	}

	static get identity() {
		return new Float32Array([
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		]);
	}

	static transform2D(transform: ITransform2D): Matrix3 {
		const mat = new Matrix3().project(transform.width, transform.height);
		if (transform.position.x !== 0 && transform.position.y !== 0) {
			mat.translate(transform.position.x, transform.position.y)
		}
		if (transform.rotation.angle !== 0) {
			mat.rotate(transform.rotation.angle)
		}
		if (transform.rotation.x !== 0 && transform.rotation.y !== 0) {
			mat.translate(transform.rotation.x, transform.rotation.y)
		}
		if (transform.scale.x !== 1 && transform.rotation.y !== 1) {
			mat.scale(transform.scale.x, transform.scale.y);
		}
		return mat

	}

	static translation(tx: number, ty: number): Float32Array {
		return new Float32Array([
			1, 0, 0,
			0, 1, 0,
			tx, ty, 1,
		]);
	}

	static rotation(angle: number): Float32Array {
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		return new Float32Array([
			c, s, 0,
			-s, c, 0,
			0, 0, 1,
		]);
	}

	static scaling(sx: number, sy: number): Float32Array {
		return new Float32Array([
			sx, 0, 0,
			0, sy, 0,
			0, 0, 1,
		]);
	}

	static projection(width: number, height: number) {
		return new Float32Array([
			2 / width, 0, 0,
			0, -2 / height, 0,
			-1, 1, 1,
		])
	}

	multiply(m: Float32Array): this {
		const a0 = m[0] * this.data[0] + m[1] * this.data[3] + m[2] * this.data[6];
		const a1 = m[0] * this.data[1] + m[1] * this.data[4] + m[2] * this.data[7];
		const a2 = m[0] * this.data[2] + m[1] * this.data[5] + m[2] * this.data[8];
		const a3 = m[3] * this.data[0] + m[4] * this.data[3] + m[5] * this.data[6];
		const a4 = m[3] * this.data[1] + m[4] * this.data[4] + m[5] * this.data[7];
		const a5 = m[3] * this.data[2] + m[4] * this.data[5] + m[5] * this.data[8];
		const a6 = m[6] * this.data[0] + m[7] * this.data[3] + m[8] * this.data[6];
		const a7 = m[6] * this.data[1] + m[7] * this.data[4] + m[8] * this.data[7];
		const a8 = m[6] * this.data[2] + m[7] * this.data[5] + m[8] * this.data[8];
		this.data[0] = a0;
		this.data[1] = a1;
		this.data[2] = a2;
		this.data[3] = a3;
		this.data[4] = a4;
		this.data[5] = a5;
		this.data[6] = a6;
		this.data[7] = a7;
		this.data[8] = a8;
		return this; // for chained
	}

	rotate(angle: number): this {
		this.multiply(Matrix3.rotation(angle));
		return this; // for chained call;
	}

	translate(tx: number, ty: number): this {
		this.multiply(Matrix3.translation(tx, ty));
		return this; // for chained call;
	}

	scale(sx: number, sy: number): this {
		this.multiply(Matrix3.scaling(sx, sy));
		return this; // for chained call;
	}

	project(width: number, height: number): this {
		this.multiply(Matrix3.projection(width, height));
		return this; // for chained call;
	}
}
