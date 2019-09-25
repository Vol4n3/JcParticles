import {Segment} from '../geometry2D/Segment';
import {CanvasScene, IDraw} from './CanvasScene';
import {Particle} from './particles/Particle';

export class Link extends Segment<Particle> implements IDraw {
	drawGl(scene: CanvasScene): void {
	}
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
	}
}
