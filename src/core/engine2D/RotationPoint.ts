import {Point} from '../geometry2D/Point';
import {IUpdate, SceneRenderer} from './SceneRenderer';

export class RotationPoint extends Point implements IUpdate {
	friction = 1;
	velocity = 0;
	angle = 0;


	update(scene: SceneRenderer): void {
		this.velocity *= this.friction;
		this.angle += this.velocity;
	}
}
