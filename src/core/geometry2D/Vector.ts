import {Point} from './Point';
import {Segment} from './Segment';

export class Vector {
	protected readonly _origin: Point = new Point();

	get angle(): number {
		return this._origin.angleTo(this.destination);
	}

	set angle(angle: number) {
		this.destination.rotateAround(this._origin, angle);
	}

	get length(): number {
		return this._origin.distanceTo(this.destination);
	}

	set length(length: number) {
		const a = this.angle;
		this.destination.moveDirection(a, length)
	}

	copy() {
		return new Vector(this.destination);
	}

	makeSegmentFrom(origin: Point): Segment<Point> {
		return new Segment<Point>(origin.copy(), origin.copyAdd(this.destination));
	}

	constructor(public destination: Point = new Point()) {
	}
}
