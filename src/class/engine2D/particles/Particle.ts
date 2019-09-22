import {Position} from '../Position';
import {CanvasScene, IDraw, IUpdate} from '../CanvasScene';
import {Point} from '../../geometry2D/Point';
import {MathUtils} from '../Math/Utils';


export type MoveTypes =
    'bounce'
    | 'teleport'
    | 'bounceX'
    | 'bounceY'
    | 'teleportX'
    | 'teleportY'
    | 'pinned'
    | 'vibration'

export class Particle extends Position implements IUpdate, IDraw {
    alpha: number = 1;
    distanceTeleport = 50;
    hue: number = 0;
    light: number = 0;
    moveTypes: MoveTypes[] = [];
    radius: number = 1;
    returnAtStarted: boolean;
    saturation: number = 0;
    vibrationStrength: number = 10;
    protected _startedPosition: Point;

    get color(): string {
        if (this.alpha === 1) {
            return `hsl(${this.hue},${this.saturation}%,${this.light}%)`;
        } else {
            return `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.alpha})`;
        }
    }

    constructor(x: number = 0, y: number = 0) {
        super(x, y);
        this._startedPosition = this.copy();
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
        scene.ctx.save();
        scene.ctx.fillStyle = this.color;
        scene.ctx.beginPath();
        scene.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        scene.ctx.fill();
        scene.ctx.closePath();
        scene.ctx.restore();
    }

    hasMoveType(mt: MoveTypes): boolean {
        return this.moveTypes.indexOf(mt) > -1;
    }

    randomColor(): void {
        this.hue = Math.round(Math.random() * 360);
        this.saturation = Math.round(Math.random() * 100);
        this.light = Math.round(Math.random() * 100);
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

    update(scene: CanvasScene): void {
        super.update(scene);
        this.bounce(scene);
        this.teleport(scene);
        this.vibration();
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
