import {Segment} from '../geometry2D/Segment';
import {CanvasScene, IDraw} from './CanvasScene';
import {Particle} from './particles/Particle';

export class Link extends Segment<Particle> implements IDraw {
	width: number = 2;
	maxlength: number = 100;

	get alpha(): number {
		return Math.round((1 - this.length / this.maxlength) * 10) / 10;
	}

	draw(scene: CanvasScene) {
		if (this.alpha < 0.1) {
			return;
		}
		scene.ctx.save();
		const gradient = scene.ctx.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y);
		gradient.addColorStop(0, this.start.color);
		gradient.addColorStop(1, this.end.color);
		scene.ctx.strokeStyle = gradient;
		scene.ctx.globalAlpha = this.alpha;
		scene.ctx.lineWidth = this.width;
		scene.ctx.beginPath();
		scene.ctx.moveTo(this.start.x, this.start.y);
		scene.ctx.lineTo(this.end.x, this.end.y);
		scene.ctx.stroke();
		scene.ctx.closePath();
		scene.ctx.restore();
	}

	drawGl(scene: CanvasScene): void {
	}
}
