import {Segment} from '../geometry2D/Segment';
import {CanvasScene, IDraw} from './CanvasScene';
import {Particle} from './Particle';

export class LinkParticle extends Segment<Particle> implements IDraw {
	public color: string = 'black';
	maxlength: number = 50;
	get alpha() : number{
		return Math.round((1 - this.length / this.maxlength) * 10) / 10;
	}
	get startColor(): string{
		return `rgba(${this.start.red}, ${this.start.green}, ${this.start.blue}, ${ this.alpha })`;
	}
	get endColor(): string{
		return `rgba(${this.end.red}, ${this.end.green}, ${this.end.blue}, ${ this.alpha })`;
	}
	draw(scene: CanvasScene) {
		scene.ctx.save();
		const gradient = scene.ctx.createLinearGradient(this.start.x,this.start.y,this.end.x,this.end.y);
		gradient.addColorStop(0, this.startColor);
		gradient.addColorStop(1, this.endColor);
		scene.ctx.strokeStyle =  gradient;
		scene.ctx.lineWidth = 2;
		scene.ctx.beginPath();
		scene.ctx.moveTo(this.start.x, this.start.y);
		scene.ctx.lineTo(this.end.x, this.end.y);
		scene.ctx.stroke();
		scene.ctx.closePath();
		scene.ctx.restore();
	}
}
