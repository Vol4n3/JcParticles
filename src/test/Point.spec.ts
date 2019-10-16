import {Point} from '../core/geometry2D/Point';
import {Rectangle} from '../core/geometry2D/Rectangle';

let point: Point;
let point25: Point;
let pointFloat: Point;

beforeEach(() => {
	point = new Point();
	point25 = new Point(2, 2);
	pointFloat = new Point(1.5, 0.2);
});
describe('Point', () => {
	test('should instantiate new Point', () => {
		expect(point.x).toBe(0);
		expect(point.y).toBe(0);
		expect(point25.x).toBe(2);
		expect(point25.y).toBe(2);
		expect(pointFloat.x).toBe(1.5);
		expect(pointFloat.y).toBe(0.2);
	});
	test('should determine angle from Point', () => {
		expect(point.angleTo(point25)).toBe(Math.PI / 4);
	});
	test('should determine distance from Point', () => {
		expect(point.distanceTo(point25)).toBe(Math.sqrt(8));
		expect(point25.distanceTo(pointFloat)).toBe(1.8681541692269406);
	});
	test('should be inRectangle return bool operation', () => {
		const spyInRangeX = jest.spyOn(point, 'inRangeX');
		const spyInRangeY = jest.spyOn(point, 'inRangeY');
		const rect = new Rectangle(new Point(), 10, 10);
		spyInRangeX.mockReturnValue(false);
		spyInRangeY.mockReturnValue(true);
		expect(point.inRectangle(rect)).toBe(false);
		spyInRangeX.mockReturnValue(false);
		spyInRangeY.mockReturnValue(false);
		expect(point.inRectangle(rect)).toBe(false);
		spyInRangeX.mockReturnValue(true);
		spyInRangeY.mockReturnValue(true);
		expect(point.inRectangle(rect)).toBe(true);
	});
	test('should be make copy', () => {
		const copy = point.copy();
		expect(point).toBe(point);
		expect(point).not.toBe(copy);
		expect(point).toEqual(copy);
		copy.x = 2;
		expect(point).not.toEqual(copy);
	});
	test('should be make a polygon', () => {
		const triangle = point.makePolygonPoints(5, 3, 0);
		expect(triangle.length).toBe(5);
		expect(triangle[0].x).toBe(3);
		expect(triangle[0].y).toBe(0);
		expect(triangle[1].x).toBe(0.9270509831248424);
		expect(triangle[1].y).toBe(-2.8531695488854605);
		expect(triangle[2].x).toBe(-2.427050983124842);
		expect(triangle[2].y).toBe(-1.7633557568774196);
		expect(triangle[3].x).toBe(-2.4270509831248424);
		expect(triangle[3].y).toBe(1.7633557568774192);
		expect(triangle[4].x).toBe(0.9270509831248417);
		expect(triangle[4].y).toBe(2.853169548885461);
	});
});
