import {Point} from './Point';
import {Vector} from './Vector';
import {IDraw, SceneRenderer} from '../engine2D/SceneRenderer';

export class Segment<T extends Point> implements IDraw {
	constructor(public start: T, public end: T) {

	}

	get startAngle(): number {
		return this.start.angleTo(this.end);
	}

	get endAngle(): number {
		return this.end.angleTo(this.start);
	}

	get length(): number {
		return this.start.distanceTo(this.end);
	}

	/**
	 * @depecrated
	 * @param length
	 */
	set startLength(length: number) {
		this.start.moveDirection(this.endAngle, length);
	}

	/**
	 * @depecrated
	 * @param length
	 */
	set endLength(length: number) {
		this.end.moveDirection(this.startAngle, length);
	}

	get vector(): Vector {
		return new Vector(new Point(this.end.x - this.start.x, this.end.y - this.start.y))
	}

	draw(scene: SceneRenderer): void {
		scene.ctx.beginPath();
		scene.ctx.moveTo(this.start.x, this.start.y);
		scene.ctx.lineTo(this.end.x, this.end.y);
		scene.ctx.stroke();
		scene.ctx.closePath();
	}

}
