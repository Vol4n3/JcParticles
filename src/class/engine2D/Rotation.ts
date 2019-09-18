import {Point} from '../geometry2D/Point';

export class Rotation extends Point {
	friction = 1;
	velocity = 0;
	angle = 0;

	move() {
		this.velocity *= this.friction;
		this.angle += this.velocity;
	}
}
