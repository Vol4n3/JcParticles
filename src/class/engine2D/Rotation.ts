import {Point} from '../geometry2D/Point';
import {CanvasScene, IUpdate} from './CanvasScene';

export class Rotation extends Point implements IUpdate {
	friction = 1;
	velocity = 0;
	angle = 0;


	update(scene: CanvasScene): void {
		this.velocity *= this.friction;
		this.angle += this.velocity;
	}
}
