export class RGBColor {

	constructor(public red: number = 0,
				public green: number = 0,
				public blue: number = 0,
				public alpha: number = 1) {

	}

	/**
	 * todo: not work properly
	 */
	static fromHSLA(hue: number, saturate: number, light: number): RGBColor {
		saturate /= 100;
		light /= 100;

		let c = (1 - Math.abs(2 * light - 1)) * saturate,
			x = c * (1 - Math.abs((hue / 60) % 2 - 1)),
			m = light - c / 2,
			red = 0,
			green = 0,
			blue = 0;
		if (0 <= hue && hue < 60) {
			red = c;
			green = x;
			blue = 0;
		} else if (60 <= hue && hue < 120) {
			red = x;
			green = c;
			blue = 0;
		} else if (120 <= hue && hue < 180) {
			red = 0;
			green = c;
			blue = x;
		} else if (180 <= hue && hue < 240) {
			red = 0;
			green = x;
			blue = c;
		} else if (240 <= hue && hue < 300) {
			red = x;
			green = 0;
			blue = c;
		} else if (300 <= hue && hue < 360) {
			red = c;
			green = 0;
			blue = x;
		}
		red = Math.round((red + m));
		green = Math.round((green + m));
		blue = Math.round((blue + m));
		return new RGBColor(red, green, blue);
	}
}
