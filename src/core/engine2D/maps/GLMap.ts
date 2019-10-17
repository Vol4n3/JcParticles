import {IMap} from './Map';
import {Shader} from '../../webgl/Shader';
import {Polygon2DUniColor} from '../webgl/Polygon2DUniColor';
import {Point} from '../../geometry2D/Point';
import {Particle} from '../particles/Particle';
import {CanvasScene} from '../CanvasScene';

export class GLMap implements IMap {
	particles: Particle[] = [];
	polygonShape: Polygon2DUniColor;

	constructor(private _scene: CanvasScene) {
		const shader = new Shader(this._scene.gl, Polygon2DUniColor.vertex, Polygon2DUniColor.fragment);
		const center = new Point();
		this.polygonShape = new Polygon2DUniColor(this._scene.gl, shader, center.makePolygonPoints(6, 1, 0, true) as number[]);
		for (let i = 0; i < 1500; i++) {
			const p = new Particle(Math.random() * this._scene.width, Math.random() * this._scene.height);
			p.moveTypes.push('vibration', 'bounce');
			p.vibrationStrength = 1;
			p.returnAtStarted = true;
			p.maxVelocity = 10;
			p.rgbColor.random();
			p.radius = Math.random() * 10;
			this.particles.push(p);
		}
	}

	draw(scene: CanvasScene): void {
		this.particles.forEach((p) => {
			if (scene.useGL) {
				this.polygonShape.drawGl(p.getTransformMatrix3(scene.width, scene.height), p.rgbColor);
			} else {
				p.draw(scene);
			}
		});
	}

	update(scene: CanvasScene): void {
		this.particles.forEach((p) => {
			p.update(scene);
		})
	}
}
