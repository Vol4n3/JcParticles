import {IScene} from './Scene';
import {Shader} from '../../webgl/Shader';
import {SimpleGeometryColor} from '../webgl/SimpleGeometryColor';
import {Point} from '../../geometry2D/Point';
import {Particle} from '../particles/Particle';
import {SceneRenderer} from '../SceneRenderer';
import {RGBColor} from '../RGBColor';

export class GLScene implements IScene {
	particles: Particle[] = [];
	polygonShape: SimpleGeometryColor;

	constructor(private _sc: SceneRenderer) {
		const shader = new Shader(this._sc.gl, SimpleGeometryColor.vertex, SimpleGeometryColor.fragment);
		const center = new Point();
		this.polygonShape = new SimpleGeometryColor(this._sc.gl, shader, center.makePolygonPoints(6, 1, 0, true) as number[]);
		const samplesColor = [RGBColor.random(), RGBColor.random(), RGBColor.random()];
		for (let i = 0; i < 150; i++) {
			const p = new Particle(Math.random() * this._sc.width, Math.random() * this._sc.height);
			p.moveTypes.push('randomWalk', 'bounce');
			p.maxVelocity = 10;
			p.rgbColor.random(samplesColor);
			p.radius = Math.random() * 10;
			this.particles.push(p);
		}
	}

	draw(scene: SceneRenderer): void {
		this.particles.forEach((p) => {
			if (scene.useGL) {
				this.polygonShape.drawGl(p.transformMat3, p.rgbColor, p.depth);
			} else {
				p.draw(scene);
			}
		});
	}

	update(scene: SceneRenderer): void {
		this.particles.forEach((p) => {
			p.update(scene);
		})
	}
}
