import {ColoredParticle} from './ColoredParticle';
import {CanvasScene} from '../CanvasScene';
import {Point} from '../../geometry2D/Point';

export class ElasticParticle extends ColoredParticle {
	bounceOnBox = true;
	friction = new Point(0.15, 0.15);

	update(scene: CanvasScene): void {
		super.update(scene);
		if (this.returnToStart) {
			this.velocity.add(new Point((this._startedPosition.x - this.x) / 5, (this._startedPosition.y - this.y) / 5))
		}
	}

	returnToStart: boolean = true;
	private _startedPosition: Point;

	constructor(x: number = 0, y: number = 0) {
		super(x, y);
		this._startedPosition = this.copy();
	}
}
