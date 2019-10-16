export class RGBColor {

	constructor(public red: number = 0,
				public green: number = 0,
				public blue: number = 0,
				public alpha: number = 1) {

	}

	toVec4(): Float32Array {
		return new Float32Array([this.red / 255, this.green / 255, this.blue / 255, this.alpha]);
	}

	toRGBACss(): string {
		return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
	}

	toRGBCss(): string {
		return `rgb(${this.red},${this.green},${this.blue})`;
	}
}
