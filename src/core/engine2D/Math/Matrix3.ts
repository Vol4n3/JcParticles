export interface ITransform {
	width: number,
	height: number,
	position: { x: number, y: number };
	rotation: { x: number, y: number, angle: number },
	scale: { x: number, y: number }
}
export class Matrix3 {
	constructor(public data: Float32Array = Matrix3.identity) {
	}

	static get identity() {
		return new Float32Array([
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		]);
	}

	static transform2D(transform: ITransform): Matrix3 {
		return new Matrix3()
			.project(transform.width, transform.height)
			.translate(transform.position.x, transform.position.y)
			.rotate(transform.rotation.angle)
			.scale(transform.scale.x, transform.scale.y)
			.translate(transform.rotation.x, transform.rotation.y);
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
			c, -s, 0,
			s, c, 0,
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

	static multiply(a: Float32Array, b: Float32Array): Float32Array {
		const a00 = a[0];
		const a01 = a[1];
		const a02 = a[2];
		const a10 = a[3];
		const a11 = a[4];
		const a12 = a[5];
		const a20 = a[6];
		const a21 = a[7];
		const a22 = a[8];
		const b00 = b[0];
		const b01 = b[1];
		const b02 = b[2];
		const b10 = b[3];
		const b11 = b[4];
		const b12 = b[5];
		const b20 = b[6];
		const b21 = b[7];
		const b22 = b[8];
		return new Float32Array([
			b00 * a00 + b01 * a10 + b02 * a20,
			b00 * a01 + b01 * a11 + b02 * a21,
			b00 * a02 + b01 * a12 + b02 * a22,
			b10 * a00 + b11 * a10 + b12 * a20,
			b10 * a01 + b11 * a11 + b12 * a21,
			b10 * a02 + b11 * a12 + b12 * a22,
			b20 * a00 + b21 * a10 + b22 * a20,
			b20 * a01 + b21 * a11 + b22 * a21,
			b20 * a02 + b21 * a12 + b22 * a22,
		]);
	}

	rotate(angle: number): this {
		this.data = Matrix3.multiply(this.data, Matrix3.rotation(angle));
		return this; // for chained call;
	}

	translate(tx: number, ty: number): this {
		this.data = Matrix3.multiply(this.data, Matrix3.translation(tx, ty));
		return this; // for chained call;
	}

	scale(sx: number, sy: number): this {
		this.data = Matrix3.multiply(this.data, Matrix3.scaling(sx, sy));
		return this; // for chained call;
	}

	project(width: number, height: number): this {
		this.data = Matrix3.multiply(this.data, Matrix3.projection(width, height));
		return this; // for chained call;
	}
}
