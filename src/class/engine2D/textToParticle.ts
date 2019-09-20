export class TextToParticle {
	canvas: HTMLCanvasElement;
	width = 400;
	height = 18;
	ctx: CanvasRenderingContext2D;

	constructor() {
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");
	}

	getPoints(text: string, font: string = "18px 'Arial', sans-serif"): { x: number, y: number }[] {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.font = font;
		this.ctx.fillStyle = "#000000";
		this.ctx.fillText(text, 0, 18);

		const imageData = this.ctx.getImageData(0, 0, this.width, this.height);
		const res: { x: number, y: number }[] = [];
		for (let x = 0; x < imageData.width; x++) {
			for (let y = 0; y < imageData.height; y++) {
				const color = imageData.data[((y * (imageData.width * 4)) + (x * 4)) - 1];
				if (color > 100) {
					res.push({
						x, y
					})
				}
			}
		}
		return res;
	}
}
