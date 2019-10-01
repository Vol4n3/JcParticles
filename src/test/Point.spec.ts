import {Point} from '../class/geometry2D/Point';
import {Rectangle} from '../class/geometry2D/Rectangle';

describe('Point', () => {
	test('should instantiate new Point', () => {
		const point = new Point();
		expect(point.x).toBe(0);
		expect(point.y).toBe(0);
		const point25 = new Point(2, 5);
		expect(point25.x).toBe(2);
		expect(point25.y).toBe(5);
		const pointFloat = new Point(1.5, 0.2);
		expect(pointFloat.x).toBe(1.5);
		expect(pointFloat.y).toBe(0.2);
	});
	test('should determine angle from Point', () => {
		const point = new Point();
		const point2 = new Point(0, 2);
		const point3 = new Point(2, 0);
		expect(point.angleTo(point2)).toBe(Math.PI / 2);
		expect(point.angleTo(point3)).toBe(0);

	});
	test('should determine distance from Point', () => {
		const point = new Point();
		const point2 = new Point(0, 2);
		const point3 = new Point(2, 0);
		const point4 = new Point(2, 2);
		expect(point.distanceTo(point2)).toBe(2);
		expect(point.distanceTo(point3)).toBe(2);
		expect(point.distanceTo(point4)).toBe(Math.sqrt(8));
	});
	test('should be in rectangle', () => {
		const point = new Point(1, 1);
		const point2 = new Point(11, 11);
		const rect = new Rectangle(new Point(), 10, 10);
		const rect2 = new Rectangle(new Point(5, 10), 10, 10);
		expect(point.inRectangle(rect)).toBe(true);
		expect(point.inRectangle(rect2)).toBe(false);
		expect(point2.inRectangle(rect)).toBe(false);
		expect(point2.inRectangle(rect2)).toBe(true);

	});
	test('should be make copy', () => {
		const point = new Point(1, 1);
		const copy = point.copy();
		expect(point).toBe(point);
		expect(point).not.toBe(copy);
		expect(point).toEqual(copy);
		copy.x = 2;
		expect(point).not.toEqual(copy);
	});
	test('should be make a polygon', () => {
		const center = new Point(0, 0);
		const triangle = center.makePolygonPoints(3, 3);

		expect(triangle.length).toBe(3);
	});
});
