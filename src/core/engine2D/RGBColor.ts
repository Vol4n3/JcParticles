export class RGBColor {

	constructor(public red: number = 0,
				public green: number = 0,
				public blue: number = 0,
				public alpha: number = 1) {

	}

	copy() {
		return new RGBColor(this.red, this.green, this.blue, this.alpha);
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

	random() {
		this.red = Math.round(Math.random() * 255);
		this.green = Math.round(Math.random() * 255);
		this.blue = Math.round(Math.random() * 255);
	}
}
