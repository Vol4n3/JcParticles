import {Point} from './Point';

export class Vector {
	constructor(public destination: Point = new Point(), public origin: Point = new Point()) {

	}
	get length(): number {
		return this.origin.distanceTo(this.destination);
	}

	get angle(): number {
		return this.origin.angleTo(this.destination);
	}

	set angle(angle: number) {
		this.destination.rotateAround(this.origin, angle);
	}

	set length(length: number) {
		const a = this.angle;
		this.destination.translate(
			Math.cos(a) * length,
			Math.sin(a) * length
		)
	}
}
