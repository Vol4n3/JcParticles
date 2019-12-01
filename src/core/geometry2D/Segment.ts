import {Point} from './Point';
import {Vector} from './Vector';
import {IDraw, SceneRenderer} from '../engine2D/SceneRenderer';

export class Segment<T extends Point> implements IDraw {
    get endAngle(): number {
        return this.end.angleTo(this.start);
    }

    set endAngle(angle) {
        const length = this.length;
        this.start.x = Math.cos(angle) * length;
        this.start.y = Math.sin(angle) * length;
    }

    set endLength(length: number) {
        const target = this.start.copy();
        target.moveDirection(this.startAngle, length);
        this.end.moveTo(target);
    }

    get endVector(): Vector {
        return new Vector(new Point(this.end.x - this.start.x, this.end.y - this.start.y))
    }

    get length(): number {
        return this.start.distanceTo(this.end);
    }

    get startAngle(): number {
        return this.start.angleTo(this.end);
    }

    set startAngle(angle) {
        const length = this.length;
        this.end.x = Math.cos(angle) * length;
        this.end.y = Math.sin(angle) * length;
    }

    get startVector(): Vector {
        return new Vector(new Point(this.start.x - this.end.x, this.start.y - this.end.y))
    }

    constructor(public start: T, public end: T) {

    }

    set startLength(length: number) {
        const target = this.end.copy();
        target.moveDirection(this.endAngle, length);
        this.start.moveTo(target);
    }

    addEndAngle(angle: number) {
        this.end.rotateAround(this.start, angle);
    }

    addStartAngle(angle: number) {
        this.start.rotateAround(this.end, angle);
    }

    draw(scene: SceneRenderer): void {
        scene.ctx.beginPath();
        scene.ctx.moveTo(this.start.x, this.start.y);
        scene.ctx.lineTo(this.end.x, this.end.y);
        scene.ctx.stroke();
        scene.ctx.closePath();
    }

}
