import {PositionPoint} from '../PositionPoint';
import {IDraw, IUpdate, SceneRenderer} from '../SceneRenderer';
import {Point} from '../../geometry2D/Point';
import {MathUtils} from '../../Math/Utils';
import {Vector} from '../../geometry2D/Vector';
import {RGBColor} from '../RGBColor';
import {Matrix3} from '../../Math/Matrix3';
import {RotationPoint} from '../RotationPoint';


export type MoveTypes =
	'bounce'
	| 'teleport'
	| 'bounceX'
	| 'bounceY'
	| 'teleportX'
	| 'teleportY'
	| 'pinned'
	| 'vibration'
	| 'randomWalk'

export class Particle extends PositionPoint implements IUpdate, IDraw {
	distanceTeleport = 50;
	rgbColor = new RGBColor();
	moveTypes: MoveTypes[] = [];
	radius: number = 1;
	depth: number = 0;
	rotation: RotationPoint = new RotationPoint();
	walkStrength: number = 3; // refactor at object walk random generator
	walkFrequency: number = 0.95;
	vibrationStrength: number = 5;
	transformMat3: Matrix3 = new Matrix3();
	protected _startedPosition: Point;

	constructor(x: number = 0, y: number = 0) {
		super(x, y);
		this._startedPosition = this.copy();
	}

	get color(): string {
		if (this.rgbColor.alpha >= 1) {
			return this.rgbColor.toRGBCss();
		}
		return this.rgbColor.toRGBACss();
	}

	updateMat3(widthProjection: number, heightProjection: number): void {
		this.transformMat3 = Matrix3.transform2D({
			width: widthProjection,
			height: heightProjection,
			position: {x: this.x, y: this.y},
			rotation: {angle: this.rotation.angle, x: this.rotation.x, y: this.rotation.y},
			scale: {x: this.radius, y: this.radius}
		});
	}

	bounce(scene: SceneRenderer) {
		if (this.hasMoveType('bounce') || this.hasMoveType('bounceX')) {
			this.bounceBox('x', scene.width - this.radius);
			this.bounceBox('x', this.radius, true);
		}
		if (this.hasMoveType('bounce') || this.hasMoveType('bounceY')) {
			this.bounceBox('y', scene.height - this.radius);
			this.bounceBox('y', this.radius, true);
		}
	}

	bounceBox(key: string, val: number, isMinTest?: boolean): void {
		const isExitBox: boolean = (isMinTest) ? this[key] < val : this[key] > val;
		if (!isExitBox) {
			return;
		}
		this[key] = val;
		this.velocity[key] *= -1;
	}

	draw(scene: SceneRenderer): void {
		scene.ctx.fillStyle = this.color;
		scene.ctx.beginPath();
		scene.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		scene.ctx.fill();
		scene.ctx.closePath();
	}

	hasMoveType(mt: MoveTypes): boolean {
		return this.moveTypes.indexOf(mt) > -1;
	}

	teleport(scene: SceneRenderer) {
		if (this.hasMoveType('teleport') || this.hasMoveType('teleportX')) {
			this.teleportBox('x', scene.width + this.distanceTeleport, -this.distanceTeleport);
			this.teleportBox('x', -this.distanceTeleport, scene.width + this.distanceTeleport, true);
		}
		if (this.hasMoveType('teleport') || this.hasMoveType('teleportY')) {
			this.teleportBox('y', scene.height + this.distanceTeleport, -this.distanceTeleport);
			this.teleportBox('y', -this.distanceTeleport, scene.height + this.distanceTeleport, true);
		}
	}

	teleportBox(key: string, val: number, goTo: number, isMinTest?: boolean): void {
		const isExitBox: boolean = (isMinTest) ? this[key] < val : this[key] > val;
		if (!isExitBox) {
			return;
		}
		this[key] = goTo;
	}

	attractTo(p: Point) {
		this.velocity.add(new Point(p.x - this.x, p.y - this.y))
	}

	randomPropulsion(strength) {
		this.velocity.add(new Point(
			MathUtils.randomRange(strength),
			MathUtils.randomRange(strength)
		))
	}

	randomWalk() {
		if (!this.hasMoveType('randomWalk')) {
			return;
		}
		if (Math.random() > this.walkFrequency) {
			const actual = new Vector(this.velocity);
			actual.angle += MathUtils.randomRange(Math.PI * 2);
			actual.length = Math.random() * this.walkStrength;
			this.velocity = actual.destination;
		}
	}

	update(scene: SceneRenderer): void {
		super.update(scene);
		this.bounce(scene);
		this.teleport(scene);
		this.vibration();
		this.randomWalk();
		if (this.hasMoveType('pinned')) {
			this.attractTo(this._startedPosition);
		}
		this.updateMat3(scene.width, scene.height);
	}

	vibration() {
		if (!this.hasMoveType('vibration')) {
			return;
		}
		if (Math.random() > 0.5) {
			this.randomPropulsion(this.vibrationStrength);
		} else {
			this.attractTo(this._startedPosition);
		}
	}
}
