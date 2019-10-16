import {Point} from '../core/geometry2D/Point';
import {Rectangle} from '../core/geometry2D/Rectangle';

describe('Rectangle', () => {
	test('should intersect', () => {
		const rect1 = new Rectangle(new Point(), 10, 10);
		const rect2 = new Rectangle(new Point(10, 10), 10, 10);
		expect(rect1.intersect(rect2)).toBe(true);
	});
});
