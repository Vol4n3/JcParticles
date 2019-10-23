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
});
