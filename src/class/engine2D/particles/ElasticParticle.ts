import {ColoredParticle} from './ColoredParticle';
import {CanvasScene} from '../CanvasScene';
import {Point} from '../../geometry2D/Point';

export class ElasticParticle extends ColoredParticle {
	bounceOnBox = true;
	friction = new Point(0.1, 0.1);

	update(scene: CanvasScene): void {
		super.update(scene);
		if (this.returnToStart) {
			this.velocity.add(new Point((this._startedPosition.x - this.x), (this._startedPosition.y - this.y)))
		}
	}

	returnToStart: boolean = true;
	private _startedPosition: Point;

	constructor(x: number = 0, y: number = 0) {
		super(x, y);
		this._startedPosition = this.copy();
	}
}
