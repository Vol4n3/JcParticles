import {Point} from './Point';

export class Rectangle {
	constructor(public origin: Point = new Point(),
				public width: number = 0,
				public height: number = 0) {
	}
	intersect(rect: Rectangle): boolean {
		return ((this.origin.x + this.width) >= rect.origin.x) &&
			this.origin.x <= (rect.origin.x + rect.width) &&
			(this.origin.y + this.height) >= rect.origin.y &&
			this.origin.y <= rect.origin.y + rect.height;
	}
}
