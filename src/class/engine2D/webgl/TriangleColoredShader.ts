import {Matrix3} from '../Math/Matrix3';

export interface IShaderTransform {
	width: number,
	height: number,
	position: { x: number, y: number };
	rotation: { x: number, y: number, angle: number },
	scale: { x: number, y: number }
}

// WIP: This is not optimized
export class TriangleColoredShader {
	private _program: WebGLProgram;
	private _vertexShader: WebGLShader;
	private _fragmentShader: WebGLShader;
	private _positionBuffer: WebGLBuffer;
	private _colorBuffer: WebGLBuffer;
	private _gl: WebGLRenderingContext;

	constructor(private readonly _vertices: number[], private readonly _attachedColor: number[] = []) {
	}

	get vertex(): string {
		return `#version 300 es
		
in vec2 a_position;

in float a_color_index;

uniform mat4 u_colors;

uniform mat3 u_matrix;

out vec4 v_color;
void main() {
	gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
	int index = int(a_color_index);
	v_color = u_colors[index];
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
		return this._gl.getAttribLocation(this._program, key);
	}

	getUniformLocationBy(key: string): WebGLUniformLocation {
		return this._gl.getUniformLocation(this._program, key);
	}

	createShader(type: GLenum, source: string): WebGLShader {
		const shader: WebGLShader = this._gl.createShader(type);
		this._gl.shaderSource(shader, source);
		this._gl.compileShader(shader);
		const success = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
		if (success) {
			return shader;
		}
		console.warn('createShader fail', this._gl.getShaderInfoLog(shader));
		this._gl.deleteShader(shader);
	}

	createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
		const program: WebGLProgram = this._gl.createProgram();
		this._gl.attachShader(program, vertexShader);
		this._gl.attachShader(program, fragmentShader);
		this._gl.linkProgram(program);
		const success = this._gl.getProgramParameter(program, this._gl.LINK_STATUS);
		if (success) {
			return program;
		}

		console.warn('createProgram fail', this._gl.getProgramInfoLog(program));
		this._gl.deleteProgram(program);
	}

	destroy() {
		this._gl.deleteProgram(this._program);
		this._gl.deleteShader(this._fragmentShader);
		this._gl.deleteShader(this._vertexShader);
		this._gl.deleteBuffer(this._positionBuffer);
		this._gl.deleteBuffer(this._colorBuffer);
	}

	drawGl(gl: WebGLRenderingContext, transform: IShaderTransform) {
		if (!this._gl) {
			this._init(gl);
		}
		this._gl.useProgram(this._program);
		const matrix = new Matrix3()
			.project(transform.width, transform.height)
			.translate(transform.position.x, transform.position.y)
			.rotate(transform.rotation.angle)
			.scale(transform.scale.x, transform.scale.y)
			.translate(transform.rotation.x, transform.rotation.y);
		this._gl.uniformMatrix3fv(this.getUniformLocationBy('u_matrix'), false, matrix.data);
		this._gl.uniformMatrix4fv(this.getUniformLocationBy('u_colors'), false, new Float32Array([1, 1, 0, 1]));
		this._gl.drawArrays(this._gl.TRIANGLE_FAN, 0, this._vertices.length / 2);
	}

	private _init(gl: WebGLRenderingContext): void {
		this._gl = gl;
		this._vertexShader = this.createShader(this._gl.VERTEX_SHADER, this.vertex);
		this._fragmentShader = this.createShader(this._gl.FRAGMENT_SHADER, this.fragment);
		this._program = this.createProgram(this._vertexShader, this._fragmentShader);
		// buffer
		// geometry position
		this._positionBuffer = this._gl.createBuffer();
		this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
		this._gl.bufferData(this._gl.ARRAY_BUFFER,
			new Float32Array(this._vertices), this._gl.STATIC_DRAW);
		const aPosition = this.getAttributeLocationBy('a_position');
		this._gl.enableVertexAttribArray(aPosition);
		this._gl.vertexAttribPointer(aPosition, 2,
			this._gl.FLOAT, false, 0, 0);
		// color
		this._colorBuffer = this._gl.createBuffer();
		this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._colorBuffer);
		const colorsIndex = [];
		for (let i: number = 0; i < this._vertices.length / 2; i++) {
			const attachedColorIndex = this._attachedColor[i];
			colorsIndex.push(attachedColorIndex || 0);
		}
		this._gl.bufferData(
			this._gl.ARRAY_BUFFER,
			new Float32Array(colorsIndex),
			this._gl.STATIC_DRAW);
		const aColor = this.getAttributeLocationBy('a_color_index');
		this._gl.enableVertexAttribArray(aColor);
		this._gl.vertexAttribPointer(aColor, 1,
			this._gl.FLOAT, false, 0, 0);
	}
}
