import {SceneRenderer} from '../SceneRenderer';
import {Particle} from './Particle';

export class WaveParticle extends Particle {
	public speed = 0.06;
	private _centerY: number;

	get ellipseHeight() {
		return this._centerY + this._maxHeight - this.y;
	}

	get ellipseRotation() {
		return (1 - this.ellipseHeight / this._maxHeight) * Math.PI / 12;
	}

	constructor(x, y, private _maxHeight, private _increment) {
		super(x, y);
		this._centerY = y;
		this.y = this._centerY + Math.cos(this._increment) * this._maxHeight;
		this.rgbColor.random();
	}

	draw(scene: SceneRenderer) {
		scene.ctx.fillStyle = this.color;
		scene.ctx.beginPath();
		scene.ctx.ellipse(this.x, this._centerY, 4, this.ellipseHeight, this.ellipseRotation, 0, Math.PI * 2);
		scene.ctx.fill();
		scene.ctx.closePath();
	}

	update(scene: SceneRenderer): void {
		super.update(scene);
		if (this._increment > Math.PI * 2) {
			this._increment -= Math.PI * 2;
		}
		this.y = this._centerY + Math.cos(this._increment) * this._maxHeight;
		this._increment += this.speed;
	}
}
