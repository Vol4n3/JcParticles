import {Point} from './Point';
import {Vector} from './Vector';

export class Segment<T extends Point> {
	constructor(public start: T, public end: T) {

	}

	get length(): number {
		return this.start.distanceTo(this.end);
	}

	get vector(): Vector {
		return new Vector(new Point(this.end.x - this.start.x, this.end.y - this.start.y))
	}
}
