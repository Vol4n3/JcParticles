import {IDraw, SceneRenderer} from '../engine2D/SceneRenderer';
import {Point} from './Point';
import {Segment} from './Segment';

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
                    p.draw(scene);
                })
            }
        }
    }

    getStartNormalPoint(p1: Point, p2: Point, width: number, negative?: boolean) {
        const seg = new Segment(p1.copy(), p2.copy());
        seg.moveDirection( seg.startAngle + (negative? -1 : 1) * Math.PI / 2, width);
        return seg.start;
    }

    getEndNormalPoint(p1: Point, p2: Point, width: number, negative?: boolean) {
        const seg = new Segment(p1.copy(), p2.copy());
        seg.moveDirection( seg.endAngle + (negative? -1 : 1) * Math.PI / 2, width);
        return seg.end;
    }

    getStrokeIntersectPoint(p1: Point, p2: Point, p3: Point, width: number, negative?: boolean) {
        const seg1 = new Segment(p1.copy(), p2.copy());
        seg1.moveDirection( seg1.startAngle + (negative? -1 : 1) * Math.PI / 2, width);
        const seg2 = new Segment(p2.copy(), p3.copy());
        seg2.moveDirection( seg2.startAngle + (negative? -1 : 1) * Math.PI / 2, width);
        const intersect = seg1.intersect(seg2, true);
        if (intersect) {
            const segTest = new Segment(p2, intersect);
            if (segTest.length < seg1.length && segTest.length < seg2.length) {
                return intersect
            }
        }
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
                        points.push(this.getStartNormalPoint( current,previous, width, true));
                        //points.push(this.getStartNormalPoint( previous,current, width,true))
                    }
                } else {
                    const iPos = this.getStrokeIntersectPoint(previous, current, next, width);
                    if(iPos) points.push(iPos);
                    const iNeg = this.getStrokeIntersectPoint(previous, current, next, width,true);
                    //if(iNeg) points.push(iNeg);
                }
            } else {
                if (this.closed) {
                    previous = this.points[len - 2];
                    const iPos = this.getStrokeIntersectPoint(previous, current, next, width);
                    if(iPos) points.push(iPos);
                    const iNeg = this.getStrokeIntersectPoint(previous, current, next, width,true);
                    //if(iNeg) points.push(iNeg);
                } else {
                    if (next) {
                        points.push(this.getStartNormalPoint( current,next, width));
                        //points.push(this.getStartNormalPoint( next,current, width,true));
                    }
                }
            }
        }
        return points;
    }
}
