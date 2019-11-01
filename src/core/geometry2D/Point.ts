import {Rectangle} from './Rectangle';
import {Circle} from './Circle';
import {MathUtils} from '../Math/Utils';

export class Point {
	constructor(public x: number = 0, public y: number = 0) {

	}

	moveDirection(angle: number, distance: number) {
		this.add(new Point(
			Math.cos(angle) * distance,
			Math.sin(angle) * distance
		))
	}
	angleTo(p: Point): number {
		return Math.atan2(p.y - this.y, p.x - this.x);
	}

	get isZero(): boolean {
		return this.x === 0 && this.y === 0;
	}

	angleFrom(p: Point): number {
		return Math.atan2(this.y - p.y, this.x - p.x);
	}
	distanceTo(p: Point): number {
		const dx = p.x - this.x,
			dy = p.y - this.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	inRectangle(rectangle: Rectangle): boolean {
		return this.inRangeX(rectangle.origin.x, rectangle.origin.x + rectangle.width) &&
			this.inRangeY(rectangle.origin.y, rectangle.origin.y + rectangle.height);
	}

	copy(): Point {
		return new Point(this.x, this.y);
	}

	makePolygonPoints(face: number, radius: number, startAngle = 0, asVertices?: boolean): number[] | Point[] {
		const points = [];
		if (face < 3) {
			face = 3
		}
		let centerAng = 2 * Math.PI / face;
		for (let i = 0; i < face; i++) {
			const ang = startAngle + (i * centerAng);
			const vx: number = this.x + radius * Math.cos(ang);
			const vy: number = this.y - radius * Math.sin(ang);
			if (asVertices) {
				points.push(vx, vy);
			} else {
				points.push(new Point(vx, vy));
			}
		}
		return points
	}

	roundedCopy(n = 1): Point {
		return new Point(MathUtils.round(this.x, n), MathUtils.round(this.y, n));
	}

	inTriangle(p1: Point, p2: Point, p3: Point, strict: boolean): boolean {
		let b1, b2, b3;
		if (strict) {
			b1 = this.signTo(p1, p2) < 0;
			b2 = this.signTo(p2, p3) < 0;
			b3 = this.signTo(p3, p1) < 0;
		} else {
			b1 = this.signTo(p1, p2) <= 0;
			b2 = this.signTo(p2, p3) <= 0;
			b3 = this.signTo(p3, p1) <= 0;
		}
		return ((b1 === b2) && (b2 === b3));
	}

	signTo(p1: Point, p2: Point): number {
		return (this.x - p2.x) * (p1.y - p2.y) - (p1.x - p2.x) * (this.y - p2.y);
	}

	random(n: number) {
		this.x = MathUtils.randomRange(n);
		this.y = MathUtils.randomRange(n);
	}
	rotateAround(origin: Point, angle: number) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const dx = this.x - origin.x;
		const dy = this.y - origin.y;
		this.translate(
			dx * cos + dy * sin + origin.x,
			-dx * sin + dy * cos + origin.y
		);
	}

	translate(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	inCircle(circle: Circle, strict?: boolean) {
		if (strict) {
			return (this.distanceTo(circle) - circle.radius) < 0;
		}
		return (this.distanceTo(circle) - circle.radius) <= 0;
	}

	moveTo(point: Point) {
		this.translate(point.x, point.y);
	}

	add(point: Point) {
		this.x += point.x;
		this.y += point.y;
	}

	copyAdd(point: Point): Point {
		const p = this.copy();
		p.add(point);
		return p;
	}

	multiply(point: Point) {
		this.x *= point.x;
		this.y *= point.y;
	}

	inRangeX(min: number, max: number) {
		return this.x >= Math.min(min, max) && this.x <= Math.max(min, max);
	}

	inRangeY(min: number, max: number) {
		return this.y >= Math.min(min, max) && this.y <= Math.max(min, max);
	}

	subtract(point: Point) {
		this.x -= point.x;
		this.y -= point.y;
	}

	divide(point: Point) {
		this.x /= point.x;
		this.y /= point.y;
	}
}
