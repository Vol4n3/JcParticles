import {Matrix} from './Matrix';

export interface ITransform3D {
	width: number,
	height: number,
	depth: number,
	position: { x: number, y: number, z: number };
	rotation: { x: number, y: number, z: number, angleX: number, angleY: number, angleZ: number },
	scale: { x: number, y: number, z: number }
}

export class Matrix4 extends Matrix {
	constructor(public data: Float32Array = Matrix4.identity) {
		super();
	}

	static get identity(): Float32Array {
		return new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);
	}

	static transform3D(transform: ITransform3D): Matrix4 {
		return new Matrix4()
			.project(transform.width, transform.height, transform.depth)
			.translate(transform.position.x, transform.position.y, transform.position.z)
			.xRotate(transform.rotation.angleX)
			.yRotate(transform.rotation.angleY)
			.zRotate(transform.rotation.angleZ)
			.translate(transform.rotation.x, transform.rotation.y, transform.rotation.z)
			.scale(transform.scale.x, transform.scale.y, transform.scale.z);
	}

	static translation(tx: number, ty: number, tz: number): Float32Array {
		return new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			tx, ty, tz, 1,
		]);
	}

	static xRotation(angle: number): Float32Array {
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		return new Float32Array([
			1, 0, 0, 0,
			0, c, s, 0,
			0, -s, c, 0,
			0, 0, 0, 1,
		]);
	}

	static yRotation(angle: number): Float32Array {
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		return new Float32Array([
			c, 0, -s, 0,
			0, 1, 0, 0,
			s, 0, c, 0,
			0, 0, 0, 1,
		]);
	}

	static zRotation(angle: number): Float32Array {
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		return new Float32Array([
			c, s, 0, 0,
			-s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]);
	}

	static scaling(sx: number, sy: number, sz: number): Float32Array {
		return new Float32Array([
			sx, 0, 0, 0,
			0, sy, 0, 0,
			0, 0, sz, 0,
			0, 0, 0, 1,
		]);
	}

	static projection(width: number, height: number, depth: number) {
		return new Float32Array([
			2 / width, 0, 0, 0,
			0, -2 / height, 0, 0,
			0, 0, 2 / depth, 0,
			-1, 1, 0, 1
		])
	}

	multiply(m: Float32Array) {
		const a0 = m[0] * this.data[0] + m[1] * this.data[4] + m[2] * this.data[8] + m[3] * this.data[12];
		const a1 = m[0] * this.data[1] + m[1] * this.data[5] + m[2] * this.data[9] + m[3] * this.data[13];
		const a2 = m[0] * this.data[2] + m[1] * this.data[6] + m[2] * this.data[10] + m[3] * this.data[14];
		const a3 = m[0] * this.data[3] + m[1] * this.data[7] + m[2] * this.data[11] + m[3] * this.data[15];
		const a4 = m[4] * this.data[0] + m[5] * this.data[4] + m[6] * this.data[8] + m[7] * this.data[12];
		const a5 = m[4] * this.data[1] + m[5] * this.data[5] + m[6] * this.data[9] + m[7] * this.data[13];
		const a6 = m[4] * this.data[2] + m[5] * this.data[6] + m[6] * this.data[10] + m[7] * this.data[14];
		const a7 = m[4] * this.data[3] + m[5] * this.data[7] + m[6] * this.data[11] + m[7] * this.data[15];
		const a8 = m[8] * this.data[0] + m[9] * this.data[4] + m[10] * this.data[8] + m[11] * this.data[12];
		const a9 = m[8] * this.data[1] + m[9] * this.data[5] + m[10] * this.data[9] + m[11] * this.data[13];
		const a10 = m[8] * this.data[2] + m[9] * this.data[6] + m[10] * this.data[10] + m[11] * this.data[14];
		const a11 = m[8] * this.data[3] + m[9] * this.data[7] + m[10] * this.data[11] + m[11] * this.data[15];
		const a12 = m[12] * this.data[0] + m[13] * this.data[4] + m[14] * this.data[8] + m[15] * this.data[12];
		const a13 = m[12] * this.data[1] + m[13] * this.data[5] + m[14] * this.data[9] + m[15] * this.data[13];
		const a14 = m[12] * this.data[2] + m[13] * this.data[6] + m[14] * this.data[10] + m[15] * this.data[14];
		const a15 = m[12] * this.data[3] + m[13] * this.data[7] + m[14] * this.data[11] + m[15] * this.data[15];
		this.data[0] = a0;
		this.data[1] = a1;
		this.data[2] = a2;
		this.data[3] = a3;
		this.data[4] = a4;
		this.data[5] = a5;
		this.data[6] = a6;
		this.data[7] = a7;
		this.data[8] = a8;
		this.data[9] = a9;
		this.data[10] = a10;
		this.data[11] = a11;
		this.data[12] = a12;
		this.data[13] = a13;
		this.data[14] = a14;
		this.data[15] = a15;
		return this; // for chained
	}

	xRotate(angle: number): this {
		this.multiply(Matrix4.xRotation(angle));
		return this; // for chained call;
	}

	yRotate(angle: number): this {
		this.multiply(Matrix4.yRotation(angle));
		return this; // for chained call;
	}

	zRotate(angle: number): this {
		this.multiply(Matrix4.zRotation(angle));
		return this; // for chained call;
	}

	translate(tx: number, ty: number, tz: number): this {
		this.multiply(Matrix4.translation(tx, ty, tz));
		return this; // for chained call;
	}

	scale(sx: number, sy: number, sz: number): this {
		this.multiply(Matrix4.scaling(sx, sy, sz));
		return this; // for chained call;
	}

	project(width: number, height: number, depth: number): this {
		this.multiply(Matrix4.projection(width, height, depth));
		return this; // for chained call;
	}
}
