import {IDraw, SceneRenderer} from '../engine2D/SceneRenderer';
import {Point} from './Point';
import {Segment} from './Segment';
import {Vector} from './Vector';

export class Path implements IDraw {
    constructor(public points: Point[], public closed?: boolean) {

    }

    draw(scene: SceneRenderer): void {
        if (scene.useGL) {

        } else {
            if (this.points.length) {
                scene.ctx.beginPath();
                this.points.forEach((p, index) => {
                    if (index > 0) {
                        scene.ctx.lineTo(p.x, p.y);
                    } else {
                        scene.ctx.moveTo(p.x, p.y);
                    }
                });
                scene.ctx.stroke();
                scene.ctx.closePath();
                const contour = this.getWidthStroke(20);
                contour.forEach((p, index) => {
                    if (index % 4 === 0) {
                        scene.ctx.beginPath();
                        scene.ctx.moveTo(p.x, p.y);
                    } else {
                        scene.ctx.lineTo(p.x, p.y);
                    }
                    if (index % 4 === 3) {
                        scene.ctx.fill();
                        scene.ctx.closePath();
                    }
                })
            }
        }
    }

    getEndNormalsPoints(p1: Point, p2: Point, width: number) {
        const points: Point[] = [];
        const seg = new Segment(p1.copy(), p2.copy());
        seg.startLength = width;
        seg.addStartAngle(-Math.PI / 2);
        points.push(seg.start.copy());
        seg.addStartAngle(Math.PI);
        points.push(seg.start.copy());
        return points;
    }

    getMiddleNormalsPoints(p1: Point, p2: Point, p3: Point, width: number) {
        const points: Point[] = [];
        const seg1 = new Segment(p1.copy(), p2.copy());
        const seg2 = new Segment(p2.copy(), p3.copy());
        const angleAverage = (seg1.endAngle + seg2.startAngle) / 2;
        const vec = new Vector();
        vec.length = width;
        vec.angle = angleAverage;
        const segment = vec.makeSegmentFrom(p2);
        points.push(segment.end.copy());
        segment.addEndAngle(Math.PI);
        points.push(segment.end.copy());
        return points;
    }

    getStartNormalsPoints(p1: Point, p2: Point, width: number) {
        const points: Point[] = [];
        const seg = new Segment(p1.copy(), p2.copy());
        seg.endLength = width;
        seg.addEndAngle(Math.PI / 2);
        points.push(seg.end.copy());
        seg.addEndAngle(Math.PI);
        points.push(seg.end.copy());
        return points;
    }

    getWidthStroke(width: number): Point[] {
        const len = this.points.length;
        const points: Point[] = [];
        for (let i = 0; i < len; i++) {
            const current = this.points[i];
            let previous = this.points[i - 1];
            const next = this.points[i + 1];
            if (i > 0) {
                if (i === (len - 1)) {
                    if (this.closed) {
                        break;
                    } else {
                        points.push(...this.getEndNormalsPoints(previous, current, width))
                    }
                } else {
                    points.push(...this.getMiddleNormalsPoints(previous, current, next, width));
                }
            } else {
                if (this.closed) {
                    previous = this.points[len - 1];
                    points.push(...this.getMiddleNormalsPoints(previous, current, next, width));
                } else {
                    if (next) {
                        points.push(...this.getStartNormalsPoints(current, next, width))
                    }
                }
            }
        }
        return points;
    }
}