export class Matrix {
	public data: Float32Array = new Float32Array([]);
	private _stack: Float32Array[] = [];

	save(): void {
		this._stack.push(new Float32Array(this.data));
	}

	restore(): void {
		const lastStack: Float32Array = this._stack[this._stack.length - 1];
		if (lastStack) {
			this.data = lastStack;
			this._stack.pop()
		}
	}
}
