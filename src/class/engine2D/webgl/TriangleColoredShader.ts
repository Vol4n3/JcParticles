import {CanvasScene} from '../CanvasScene';
import {Matrix3} from '../Math/Matrix3';

export interface IShaderTransform {
	position: { x: number, y: number };
	rotation: { x: number, y: number, angle: number },
	scale: { x: number, y: number }
}

export class TriangleColoredShader {
	program: WebGLProgram;

	constructor(private readonly _scene: CanvasScene, private readonly _vertices: number[]) {
		this.init();
	}

	get vertex(): string {
		return `#version 300 es
		
in vec2 a_position;
in vec4 a_color;

uniform mat3 u_matrix;

out vec4 v_color;
void main() {
	gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
	
	v_color = a_color;
}
`;
	}

	get fragment(): string {
		return `#version 300 es
		
precision mediump float;

in vec4 v_color;

out vec4 outColor;

void main() {
  outColor = v_color;
}
`;
	}

	getAttributeLocationBy(key: string): number {
		return this._scene.gl.getAttribLocation(this.program, key);
	}

	getUniformLocationBy(key: string): WebGLUniformLocation {
		return this._scene.gl.getUniformLocation(this.program, key);
	}

	createShader(type: GLenum, source: string): WebGLShader {
		const shader: WebGLShader = this._scene.gl.createShader(type);
		this._scene.gl.shaderSource(shader, source);
		this._scene.gl.compileShader(shader);
		const success = this._scene.gl.getShaderParameter(shader, this._scene.gl.COMPILE_STATUS);
		if (success) {
			return shader;
		}
		console.warn('createShader fail', this._scene.gl.getShaderInfoLog(shader));
		this._scene.gl.deleteShader(shader);
	}

	createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
		const program: WebGLProgram = this._scene.gl.createProgram();
		this._scene.gl.attachShader(program, vertexShader);
		this._scene.gl.attachShader(program, fragmentShader);
		this._scene.gl.linkProgram(program);
		const success = this._scene.gl.getProgramParameter(program, this._scene.gl.LINK_STATUS);
		if (success) {
			return program;
		}

		console.warn('createProgram fail', this._scene.gl.getProgramInfoLog(program));
		this._scene.gl.deleteProgram(program);
	}

	init(): void {
		const vertex = this.createShader(this._scene.gl.VERTEX_SHADER, this.vertex);
		const fragment = this.createShader(this._scene.gl.FRAGMENT_SHADER, this.fragment);
		this.program = this.createProgram(vertex, fragment);
		// buffer
		// geometry position
		const positionBuffer = this._scene.gl.createBuffer();
		this._scene.gl.bindBuffer(this._scene.gl.ARRAY_BUFFER, positionBuffer);
		this._scene.gl.bufferData(this._scene.gl.ARRAY_BUFFER,
			new Float32Array(this._vertices), this._scene.gl.STATIC_DRAW);
		const aPosition = this.getAttributeLocationBy('a_position');
		this._scene.gl.enableVertexAttribArray(aPosition);
		this._scene.gl.vertexAttribPointer(aPosition, 2,
			this._scene.gl.FLOAT, false, 0, 0);
		// color
		const colorBuffer = this._scene.gl.createBuffer();
		this._scene.gl.bindBuffer(this._scene.gl.ARRAY_BUFFER, colorBuffer);
		this._scene.gl.bufferData(
			this._scene.gl.ARRAY_BUFFER,
			this.setColors(),
			this._scene.gl.STATIC_DRAW);
		const aColor = this.getAttributeLocationBy('a_color');
		this._scene.gl.enableVertexAttribArray(aColor);
		this._scene.gl.vertexAttribPointer(aColor, 4,
			this._scene.gl.FLOAT, false, 0, 0);

		this.drawGl({
			position: {x: 0, y: 0},
			rotation: {angle: 0, x: 0, y: 0},
			scale: {x: 1, y: 1}
		});
	}

	setColors(): Float32Array {
		return new Float32Array(
			[
				1, 0, 0, 1,
				1, 0, 0, 1,
				0, 0, 1, 1,
				0, 0, 1, 1
			]);
	}

	drawGl(transform: IShaderTransform) {
		this._scene.gl.useProgram(this.program);
		const matrix = new Matrix3()
			.project(this._scene.width, this._scene.height)
			.translate(transform.position.x, transform.position.y)
			.rotate(transform.rotation.angle)
			.scale(transform.scale.x, transform.scale.y)
			.translate(transform.rotation.x, transform.rotation.y);

		this._scene.gl.uniformMatrix3fv(this.getUniformLocationBy('u_matrix'), false, matrix.data);
		this._scene.gl.drawArrays(this._scene.gl.TRIANGLE_STRIP, 0, this._vertices.length / 2);
	}
}
