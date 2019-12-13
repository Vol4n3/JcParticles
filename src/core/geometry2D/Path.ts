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
                scene.ctx.strokeStyle = 'red';
                this.points.forEach((p, index) => {
                    if (index > 0) {
                        scene.ctx.lineTo(p.x, p.y);
                    } else {
                        scene.ctx.moveTo(p.x, p.y);
                    }
                });
                scene.ctx.stroke();
                scene.ctx.closePath();

                const contour = this.getWidthStroke(20,false);
                scene.ctx.beginPath();
                scene.ctx.strokeStyle = 'green';
                contour.forEach((p, index) => {
                    if (index > 0) {
                        scene.ctx.lineTo(p.x, p.y);
                    } else {
                        scene.ctx.moveTo(p.x, p.y);
                    }
                });
                scene.ctx.stroke();
                scene.ctx.closePath();

                const contourOther = this.getWidthStroke(20,true);
                scene.ctx.beginPath();
                scene.ctx.strokeStyle = 'blue';
                contourOther.forEach((p, index) => {
                    if (index > 0) {
                        scene.ctx.lineTo(p.x, p.y);
                    } else {
                        scene.ctx.moveTo(p.x, p.y);
                    }
                });
                scene.ctx.stroke();
                scene.ctx.closePath();
            }
        }
    }

    getStartNormalPoint(p1: Point, p2: Point, width: number, negative?: boolean) {
        const seg = new Segment(p1.copy(), p2.copy());
        seg.moveDirection(seg.startAngle + (negative ? -1 : 1) * Math.PI / 2, width);
        return seg.start;
    }

    getEndNormalPoint(p1: Point, p2: Point, width: number, negative?: boolean) {
        const seg = new Segment(p1.copy(), p2.copy());
        seg.moveDirection(seg.endAngle + (negative ? -1 : 1) * Math.PI / 2, width);
        return seg.end;
    }

    getStrokeIntersectPoint(p1: Point, p2: Point, p3: Point, width: number, negative?: boolean): Point[] {
        const seg1 = new Segment(p1.copy(), p2.copy());
        seg1.moveDirection(seg1.startAngle + (negative ? -1 : 1) * Math.PI / 2, width);
        const seg2 = new Segment(p2.copy(), p3.copy());
        seg2.moveDirection(seg2.startAngle + (negative ? -1 : 1) * Math.PI / 2, width);
        const intersectSeg = seg1.intersect(seg2);
        if (intersectSeg) {
            const segTest = new Segment(p2, intersectSeg);
            if (segTest.length < seg1.length && segTest.length < seg2.length) {
                return [intersectSeg]
            }
        } else {
            const intersect = seg1.intersectLineTo(seg2);
            if (intersect) {
                const segTest = new Segment(p2, intersect);
                if (segTest.length > width) {
                    return [seg1.end, seg2.start]
                }else{
                    return [intersect]
                }
            }
        }
    }
    getContour(width: number) : Point[] {
        const contourPoint: Point[] = [];
        contourPoint.push(...this.getWidthStroke(20,true));
        contourPoint.push(...this.getWidthStroke(width,false));
        return contourPoint;
    }
    getWidthStroke(width: number, otherSide?): Point[] {
        const len = this.points.length;
        const points: Point[] = [];
        for (let i = 0; i < len; i++) {
            const current = this.points[i];
            let previous = this.points[i - 1];
            let next = this.points[i + 1];
            if (i > 0) {
                if (i === (len - 1)) {
                    if (this.closed) {
                        next = this.points[1];
                        const iPos = this.getStrokeIntersectPoint(previous, current, next, width, otherSide);
                        if (iPos) {
                            points.push(...iPos);
                        }
                    } else {
                        points.push(this.getEndNormalPoint(previous, current, width, !otherSide));
                    }
                } else {
                    const iPos = this.getStrokeIntersectPoint(previous, current, next, width, otherSide);
                    if (iPos) points.push(...iPos);
                }
            } else {
                if (this.closed) {
                    previous = this.points[len - 2];
                    const iPos = this.getStrokeIntersectPoint(previous, current, next, width, otherSide);
                    if (iPos) points.push(...iPos);
                } else {
                    if (next) {
                        points.push(this.getStartNormalPoint(current, next, width, otherSide));
                    }
                }
            }
        }
        return points;
    }
}
