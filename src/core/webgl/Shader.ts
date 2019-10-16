export class Shader {
	public program: WebGLProgram;
	private readonly _vertexShader: WebGLShader;
	private readonly _fragmentShader: WebGLShader;

	constructor(private _gl: WebGLRenderingContext, vertex: string, fragment: string) {
		this._vertexShader = this.createShader(this._gl.VERTEX_SHADER, vertex);
		this._fragmentShader = this.createShader(this._gl.FRAGMENT_SHADER, fragment);
		this.program = this.createProgram(this._vertexShader, this._fragmentShader);
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

	getAttributeLocationBy(key: string): number {
		return this._gl.getAttribLocation(this.program, key);
	}

	getUniformLocationBy(key: string): WebGLUniformLocation {
		return this._gl.getUniformLocation(this.program, key);
	}

	destroy() {
		this._gl.deleteProgram(this.program);
		this._gl.deleteShader(this._fragmentShader);
		this._gl.deleteShader(this._vertexShader);
	}
}
