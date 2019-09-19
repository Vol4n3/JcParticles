import {Position} from './Position';
import {Point} from '../geometry2D/Point';
import {Rotation} from './Rotation';
import {CanvasScene, IUpdate} from './CanvasScene';

export class Camera implements IUpdate {
	position: Position = new Position();
	scale: Point = new Point(1, 1);
	rotation: Rotation = new Rotation();

	update(scene: CanvasScene) {
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
