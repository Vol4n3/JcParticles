/**
 * t is current time
 * b is start value
 * c is change in value
 * d is duration
 */
export namespace Easing {

	const linearTween = (t: number, b: number, c: number, d: number): number => {
		return c * t / d + b;
	};

	const easeInQuad = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		return c * t * t + b;
	};

	const easeOutQuad = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		return -c * t * (t - 2) + b;
	};

	const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t + b;
		}
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};

	const easeInCubic = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		return c * t * t * t + b;
	};

	const easeOutCubic = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		t--;
		return c * (t * t * t + 1) + b;
	};

	const easeInOutCubic = (t: number, b: number, c: number, d: number): number => {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t * t + b;
		}
		t -= 2;
		return c / 2 * (t * t * t + 2) + b;
	};

	const easeInQuart = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		return c * t * t * t * t + b;
	};

	const easeOutQuart = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		t--;
		return -c * (t * t * t * t - 1) + b;
	};

	const easeInOutQuart = (t: number, b: number, c: number, d: number): number => {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t * t * t + b;
		}
		t -= 2;
		return -c / 2 * (t * t * t * t - 2) + b;
	};

	const easeInQuint = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		return c * t * t * t * t * t + b;
	};

	const easeOutQuint = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		t--;
		return c * (t * t * t * t * t + 1) + b;
	};

	const easeInOutQuint = (t: number, b: number, c: number, d: number): number => {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t * t * t * t + b;
		}
		t -= 2;
		return c / 2 * (t * t * t * t * t + 2) + b;
	};

	const easeInSine = (t: number, b: number, c: number, d: number): number => {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	};

	const easeOutSine = (t: number, b: number, c: number, d: number): number => {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	};

	const easeInOutSine = (t: number, b: number, c: number, d: number): number => {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	};

	const easeInExpo = (t: number, b: number, c: number, d: number): number => {
		return c * Math.pow(2, 10 * (t / d - 1)) + b;
	};

	const easeOutExpo = (t: number, b: number, c: number, d: number): number => {
		return c * (-Math.pow(2, -10 * t / d) + 1) + b;
	};

	const easeInOutExpo = (t: number, b: number, c: number, d: number): number => {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		}
		t--;
		return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
	};

	const easeInCirc = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		return -c * (Math.sqrt(1 - t * t) - 1) + b;
	};

	const easeOutCirc = (t: number, b: number, c: number, d: number): number => {
		t /= d;
		t--;
		return c * Math.sqrt(1 - t * t) + b;
	};

	const easeInOutCirc = (t: number, b: number, c: number, d: number): number => {
		t /= d / 2;
		if (t < 1) {
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		}
		t -= 2;
		return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
	};

	const easeInElastic = (t: number, b: number, c: number, d: number): number => {
		let s = 1.70158;
		let p = 0;
		let a = c;
		if (t === 0) {
			return b;
		}
		if ((t /= d) === 1) {
			return b + c;
		}
		if (!p) {
			p = d * .3;
		}
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	};

	const easeOutElastic = (t: number, b: number, c: number, d: number): number => {
		let s = 1.70158;
		let p = 0;
		let a = c;
		if (t === 0) {
			return b;
		}
		if ((t /= d) === 1) {
			return b + c;
		}
		if (!p) {
			p = d * .3;
		}
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	};

	const easeInOutElastic = (t: number, b: number, c: number, d: number): number => {
		let s = 1.70158;
		let p = 0;
		let a = c;
		if (t === 0) {
			return b;
		}
		if ((t /= d / 2) === 2) {
			return b + c;
		}
		if (!p) {
			p = d * (.3 * 1.5);
		}
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	};

	const easeInBack = (t: number, b: number, c: number, d: number, s?: number): number => {
		if (!s) {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	};

	const easeOutBack = (t: number, b: number, c: number, d: number, s?: number): number => {
		if (!s) {
			s = 1.70158;
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	};

	const easeInOutBack = (t: number, b: number, c: number, d: number, s?: number): number => {
		if (!s) {
			s = 1.70158;
		}
		if ((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	};

	const easeInBounce = (t: number, b: number, c: number, d: number): number => {
		return c - easeOutBounce(d - t, 0, c, d) + b;
	};

	const easeOutBounce = (t: number, b: number, c: number, d: number): number => {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	};

	const easeInOutBounce = (t: number, b: number, c: number, d: number): number => {
		if (t < d / 2) {
			return easeInBounce(t * 2, 0, c, d) * .5 + b;
		}
		return easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	};

}
