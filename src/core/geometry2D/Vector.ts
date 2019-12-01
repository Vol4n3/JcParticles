import {Point} from './Point';
import {Segment} from './Segment';

export class Vector {
	protected readonly _origin: Point = new Point();

	get angle(): number {
		return this._origin.angleTo(this.destination);
	}

	set angle(angle) {
		const length = this.length;
		this.destination.x = Math.cos(angle) * length;
		this.destination.y = Math.sin(angle) * length;
	}

	addAngle(angle: number) {
		this.destination.rotateAround(this._origin, angle);
	}

	get length(): number {
		return this._origin.distanceTo(this.destination);
	}

	set length(length: number) {
		const a = this.angle;
		const target = new Point();
		target.moveDirection(a, length);
        this.destination.moveTo(target);
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
