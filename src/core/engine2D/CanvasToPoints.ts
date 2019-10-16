import {ColorPoint} from './ColorPoint';
import {RGBColor} from './RGBColor';

export class CanvasToPoints {
	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;

	constructor() {
		this._canvas = document.createElement("canvas");
		this._ctx = this._canvas.getContext("2d");
		this._ctx.imageSmoothingEnabled = false;
	}

	fromImage(image: HTMLImageElement = new Image()): ColorPoint[] {
		if (!image.complete) {
			console.warn('image must be complete for ' + image.currentSrc);
		}
		this.setSize(image.width, image.height);
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		this._ctx.drawImage(image, 0, 0);
		return this.getPixel();
	}

	setSize(width: number, height: number) {
		this._canvas.width = width;
		this._canvas.height = height;
	}

	getPixel(mask: RGBColor = new RGBColor(240, 240, 240, 1), resolution: number = 1): ColorPoint[] {
		const imageData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
		const res: ColorPoint[] = [];
		for (let x = 0; x < imageData.width; x += resolution) {
			for (let y = 0; y < imageData.height; y += resolution) {
				const index = 4 * (x + y * imageData.width);
				const red = imageData.data[index];
				const green = imageData.data[index + 1];
				const blue = imageData.data[index + 2];
				const alpha = imageData.data[index + 3] / 255;
				if (alpha > 0.5 && (red <= mask.red || green <= mask.green || blue <= mask.blue)) {
					res.push(new ColorPoint(x, y, new RGBColor(red, green, blue, alpha)))
				}
			}
		}
		return res;
	}

	FromText(text: string, fontSize: number = 18, fontFamily: string = "'Arial', sans-serif", fontColor: string = "rgba(0,0,0,1)"): ColorPoint[] {
		this.setSize(fontSize * text.length, fontSize);
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		this._ctx.fillStyle = "rgba(255,255,255,0.1)";
		this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
		this._ctx.font = `${fontSize}px ${fontFamily}`;
		this._ctx.fillStyle = fontColor;
		this._ctx.fillText(text, 0, 18);
		return this.getPixel();
	}
}
