import {Point} from './Point';
import {Vector} from './Vector';
import {IDraw, SceneRenderer} from '../engine2D/SceneRenderer';

export class Segment<T extends Point> implements IDraw {
    get endAngle(): number {
        return this.end.angleTo(this.start);
    }
    intersectLineTo<T extends Point>(segment: Segment<T>): Point {
        const A1 = this.end.y - this.start.y,
            B1 = this.start.x - this.end.x,
            C1 = A1 * this.start.x + B1 * this.start.y,
            A2 = segment.end.y - segment.start.y,
            B2 = segment.start.x - segment.end.x,
            C2 = A2 * segment.start.x + B2 * segment.start.y,
            denominator = A1 * B2 - A2 * B1;
        if (denominator !== 0) {
            const x = (B2 * C1 - B1 * C2) / denominator;
            const y = (A1 * C2 - A2 * C1) / denominator;
            return new Point(x, y);
        }
    }

    intersect<T extends Point>(segment: Segment<T>,asLine?: boolean): Point {
        const ip = this.intersectLineTo(segment);
        if (ip) {
            if(asLine){
                return ip;
            }
            const rx0 = (ip.x - this.start.x) / (this.end.x - this.start.x),
                ry0 = (ip.y - this.start.y) / (this.end.y - this.start.y),
                rx1 = (ip.x - segment.start.x) / (segment.end.x - segment.start.x),
                ry1 = (ip.y - segment.start.y) / (segment.end.y - segment.start.y);
            if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
                ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                return ip;
            }
        }
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
    translate(point: Point){
        this.start.moveTo(point);
        this.end.moveTo(point);
    }
    moveDirection(angle: number, distance: number){
        this.start.moveDirection(angle,distance);
        this.end.moveDirection(angle,distance);
    }
    draw(scene: SceneRenderer): void {
        scene.ctx.beginPath();
        scene.ctx.moveTo(this.start.x, this.start.y);
        scene.ctx.lineTo(this.end.x, this.end.y);
        scene.ctx.stroke();
        scene.ctx.closePath();
    }

}
