import {Point} from './Point';

export class Segment<T extends Point> {
	constructor(public start: T, public end: T) {

	}
	get length(): number {
		return this.start.distanceTo(this.end);
	}
}
