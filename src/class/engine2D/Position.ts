import {Point} from '../geometry2D/Point';


export class Position extends Point {
	friction: Point = new Point(1, 1);
	velocity: Point = new Point(0, 0);

	protected _time: number;
	protected _easing: (t: number, b: number, c: number, d: number) => number;
	protected _targetPoint: Point;
	protected _originPoint: Point;
	protected _isTargeting: boolean;
	protected _timeCount = 0;
	protected _callback: () => void;

	move() {
		if (!this._isTargeting) {
			this.velocity.multiply(this.friction);
			this.add(this.velocity);
		} else {
			this._traveling();
		}
	}

	setTarget(targetPoint: Point,
			  ticks: number,
			  easing: (t: number, b: number, c: number, d: number) => number,
			  callback?: () => void) {
		this._targetPoint = targetPoint.copy();
		this._easing = easing;
		this._originPoint = this.copy();
		this._time = ticks;
		this._isTargeting = true;
		this._timeCount = 0;
		this._callback = callback;
	}

	protected _traveling() {
		if (this._timeCount <= this._time) {
			this.x = this._easing(this._timeCount, this._originPoint.x, this._targetPoint.x - this._originPoint.x, this._time);
			this.y = this._easing(this._timeCount, this._originPoint.y, this._targetPoint.y - this._originPoint.y, this._time);
			this._timeCount++;
		} else {
			this._isTargeting = false;
			if (this._callback) {
				this._callback();
			}
		}
	}
}
