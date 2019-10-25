import {MathUtils} from '../core/Math/Utils';

describe('MathUtil', () => {
	test('randomRange', () => {
		const random = jest.spyOn(Math, 'random');
		random.mockReturnValue(0);
		expect(MathUtils.randomRange(10)).toBe(-10);
		random.mockReturnValue(1);
		expect(MathUtils.randomRange(10)).toBe(10);
		random.mockReturnValue(0.3);
		expect(MathUtils.randomRange(10)).toBe(-4);
	});
	test('round', () => {
		expect(MathUtils.round(10.44)).toBe(10);
		expect(MathUtils.round(10.44, 1)).toBe(10);
		expect(MathUtils.round(10.55, 1)).toBe(11);
		expect(MathUtils.round(10.44, 10)).toBe(10.4);
		expect(MathUtils.round(10.44, 100)).toBe(10.44);
		expect(MathUtils.round(10.44, 1000)).toBe(10.44);
	});
});
