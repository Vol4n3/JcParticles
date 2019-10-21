import {PositionPoint} from './PositionPoint';
import {Point} from '../geometry2D/Point';
import {RotationPoint} from './RotationPoint';
import {IUpdate, SceneRenderer} from './SceneRenderer';

export class Camera implements IUpdate {
	position: PositionPoint = new PositionPoint();
	scale: Point = new Point(1, 1);
	rotation: RotationPoint = new RotationPoint();

	update(scene: SceneRenderer) {
		this.position.update(scene);
		this.rotation.update(scene);
	}
	offsetX(n: number): number {
		return n * this.scale.x + this.position.x;
	}
	offsetY(n: number): number {
		return n * this.scale.y + this.position.y;
	}
	reverseX(n: number){
		return (n + this.position.x) / this.scale.x;
	}
	reverseY(n: number){
		return (n + this.position.y) / this.scale.y;
	}
}
