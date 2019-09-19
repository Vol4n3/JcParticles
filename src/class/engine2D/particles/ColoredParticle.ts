import {CanvasScene, IDraw} from '../CanvasScene';
import {Particle} from './Particle';

export class ColoredParticle extends Particle implements IDraw {
	radius: number = 1;
	hue: number = 0;
	saturation: number = 0;
	light: number = 0;
	alpha: number = 1;

	get color(): string {
		return `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.alpha})`;
	}

	randomColor(): void {
		this.hue = Math.round(Math.random() * 360);
		this.saturation = Math.round(Math.random() * 100);
		this.light = Math.round(Math.random() * 100);
	}

	draw(scene: CanvasScene) {
		scene.ctx.save();
		scene.ctx.fillStyle = this.color;
		scene.ctx.beginPath();
		scene.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		scene.ctx.fill();
		scene.ctx.closePath();
		scene.ctx.restore();
	}
}
