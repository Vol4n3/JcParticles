import {Segment} from '../geometry2D/Segment';
import {CanvasScene, IDraw} from './CanvasScene';
import {ColoredParticle} from './particles/ColoredParticle';

export class Link extends Segment<ColoredParticle> implements IDraw {
	width: number = 2;
	maxlength: number = 50;
	get alpha() : number{
		return Math.round((1 - this.length / this.maxlength) * 10) / 10;
	}
	get startColor(): string{
		return `hsla(${this.start.hue}, ${this.start.saturation}%, ${this.start.light}%, ${this.alpha})`;
	}
	get endColor(): string{
		return `hsla(${this.end.hue}, ${this.end.saturation}%, ${this.end.light}%, ${this.alpha})`;
	}
	draw(scene: CanvasScene) {
		scene.ctx.save();
		const gradient = scene.ctx.createLinearGradient(this.start.x,this.start.y,this.end.x,this.end.y);
		gradient.addColorStop(0, this.startColor);
		gradient.addColorStop(1, this.endColor);
		scene.ctx.strokeStyle =  gradient;
		scene.ctx.lineWidth = this.width;
		scene.ctx.beginPath();
		scene.ctx.moveTo(this.start.x, this.start.y);
		scene.ctx.lineTo(this.end.x, this.end.y);
		scene.ctx.stroke();
		scene.ctx.closePath();
		scene.ctx.restore();
	}
}
