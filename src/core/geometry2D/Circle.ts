import {Point} from './Point';
import {Rectangle} from './Rectangle';

export class Circle extends Point {
	constructor(x, y, public radius = 1) {
		super(x, y);
	}

	inRectangle(rectangle: Rectangle): boolean {
		const distX = Math.abs(this.x - rectangle.origin.x - rectangle.width / 2);
		const distY = Math.abs(this.y - rectangle.origin.y - rectangle.height / 2);

		if (distX > (rectangle.width / 2 + this.radius)) {
			return false;
		}
		if (distY > (rectangle.height / 2 + this.radius)) {
			return false;
		}

		if (distX <= (rectangle.width / 2)) {
			return true;
		}
		if (distY <= (rectangle.height / 2)) {
			return true;
		}

		const dx = distX - rectangle.width / 2;
		const dy = distY - rectangle.height / 2;
		return (dx * dx + dy * dy <= (this.radius * this.radius));
	}
}
