import {Point} from './Point';
import {Vector} from './Vector';
import {CanvasScene, IDraw} from '../engine2D/CanvasScene';

export class Segment<T extends Point> implements IDraw {
	constructor(public start: T, public end: T) {

	}

	get length(): number {
		return this.start.distanceTo(this.end);
	}

	get vector(): Vector {
		return new Vector(new Point(this.end.x - this.start.x, this.end.y - this.start.y))
	}

	draw(scene: CanvasScene): void {
		scene.ctx.beginPath();
		scene.ctx.moveTo(this.start.x, this.start.y);
		scene.ctx.lineTo(this.end.x, this.end.y);
		scene.ctx.stroke();
		scene.ctx.closePath();
	}

}
