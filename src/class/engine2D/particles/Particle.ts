import {PositionPoint} from '../PositionPoint';
import {CanvasScene, IDraw, IUpdate} from '../CanvasScene';
import {Point} from '../../geometry2D/Point';
import {MathUtils} from '../Math/Utils';
import {Vector} from '../../geometry2D/Vector';


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
	alpha: number = 1;
	distanceTeleport = 50;
	red: number = 0; // todo : refactor color to rgb object and hsl object
	green: number = 0;
	blue: number = 0;
	hue: number = 0;
	useHsl: boolean = true;
	light: number = 0;
	moveTypes: MoveTypes[] = [];
	radius: number = 1;
	walkStrength: number = 3; // refactor at object walk random generator
	walkFrequency: number = 0.95;
	returnAtStarted: boolean;
	saturation: number = 0;
	vibrationStrength: number = 5;
	protected _startedPosition: Point;

	constructor(x: number = 0, y: number = 0) {
		super(x, y);
		this._startedPosition = this.copy();
	}

	get color(): string {
		if (this.alpha >= 1) {
			if (this.useHsl) {
				return `hsl(${this.hue},${this.saturation}%,${this.light}%)`;
			}
			return `rgb(${this.red},${this.green},${this.blue})`;
		}
		if (this.useHsl) {
			return `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.alpha})`;
		}
		return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
	}

	setRgb(r: number, g: number, b: number) {
		this.useHsl = false;
		this.red = r;
		this.green = g;
		this.blue = b;
	}

	setHsl(h: number, s: number, l: number) {
		this.useHsl = true;
		this.hue = h;
		this.saturation = s;
		this.light = l;
	}

	bounce(scene: CanvasScene) {
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

	draw(scene: CanvasScene): void {
		scene.ctx.fillStyle = this.color;
		scene.ctx.beginPath();
		scene.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		scene.ctx.fill();
		scene.ctx.closePath();
	}

	drawGl(scene: CanvasScene): void {

	}

	hasMoveType(mt: MoveTypes): boolean {
		return this.moveTypes.indexOf(mt) > -1;
	}

	randomColor(): void {
		this.hue = Math.round(Math.random() * 360);
		this.saturation = Math.round(Math.random() * 100);
		this.light = Math.round(Math.random() * 100);
		this.red = Math.round(Math.random() * 255);
		this.green = Math.round(Math.random() * 255);
		this.blue = Math.round(Math.random() * 255);
	}

	teleport(scene: CanvasScene) {
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
			actual.angle += MathUtils.randomRange(Math.PI / 2);
			actual.length += MathUtils.randomRange(this.walkStrength);
			this.velocity = actual.destination;
		}
	}

	update(scene: CanvasScene): void {
		super.update(scene);
		this.bounce(scene);
		this.teleport(scene);
		this.vibration();
		this.randomWalk();
		if (this.returnAtStarted) {
			this.attractTo(this._startedPosition);
		}
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
