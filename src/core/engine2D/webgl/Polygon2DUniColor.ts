import {Matrix3} from '../../Math/Matrix3';
import {Shader} from '../../webgl/Shader';
import {RGBColor} from '../RGBColor';

export class Polygon2DUniColor {
	private _positionBuffer: WebGLBuffer;
	private _colorBuffer: WebGLBuffer;
	private _uMatrixLocation = this._shader.getUniformLocationBy('u_matrix');
	private _uColorLocation = this._shader.getUniformLocationBy('u_colors');

	constructor(private _gl: WebGLRenderingContext, private _shader: Shader, private readonly _vertices: number[]) {
		this._init();
	}

	static get vertex(): string {
		return `#version 300 es	
in vec2 a_position;
uniform vec4 u_colors;
uniform mat3 u_matrix;
out vec4 v_color;
void main() {
	gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
	v_color = u_colors;
}
`;
	}

	static get fragment(): string {
		return `#version 300 es
precision mediump float;
in vec4 v_color;
out vec4 outColor;
void main() {
  outColor = v_color;
}
`;
	}

	destroy() {
		this._shader.destroy();
		this._gl.deleteBuffer(this._positionBuffer);
		this._gl.deleteBuffer(this._colorBuffer);
	}

	drawGl(transform: Matrix3, color: RGBColor) {
		this._gl.useProgram(this._shader.program);
		this._gl.uniformMatrix3fv(this._uMatrixLocation, false, transform.data);
		this._gl.uniform4fv(this._uColorLocation, color.toVec4());
		this._gl.drawArrays(this._gl.TRIANGLE_FAN, 0, this._vertices.length / 2);
	}

	private _init(): void {
		// buffer
		// geometry position
		this._positionBuffer = this._gl.createBuffer();
		this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
		this._gl.bufferData(this._gl.ARRAY_BUFFER,
			new Float32Array(this._vertices), this._gl.STATIC_DRAW);
		const aPosition = this._shader.getAttributeLocationBy('a_position');
		this._gl.enableVertexAttribArray(aPosition);
		this._gl.vertexAttribPointer(aPosition, 2,
			this._gl.FLOAT, false, 0, 0);
	}
}
