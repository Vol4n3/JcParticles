import {IScene} from './Scene';
import {Particle} from '../particles/Particle';
import {SceneRenderer} from '../SceneRenderer';
import {Shader} from '../../webgl/Shader';
import {SimpleGeometryColor} from '../webgl/SimpleGeometryColor';
import {Point} from '../../geometry2D/Point';

export class BoidsScene implements IScene {
	particles: Particle[] = [];
	boidGL: SimpleGeometryColor;

	constructor(private _sc: SceneRenderer) {
		const shader = new Shader(_sc.gl, SimpleGeometryColor.vertex, SimpleGeometryColor.fragment);
		this.boidGL = new SimpleGeometryColor(_sc.gl, shader, [
			0.5, 0,
			1, 1,
			-1, 0,
			1, -1
		]);
		const p = new Particle(100, 100);
		p.moveTypes = ['bounce'];
		p.velocity.x = 1;
		p.velocity.rotateAround(new Point(), Math.PI / 4);
		const vAngle = p.velocity.angleFrom(new Point());
		p.velocity.moveDirection(vAngle, 2);
		// p.velocity.moveDirection(Math.PI/ 2,1);
		p.radius = 10;
		this.particles.push(p);
	}

	draw(scene: SceneRenderer): void {
		this.particles.forEach((p) => {
			if (scene.useGL) {
				if (!p.transformMat3) {
					return;
				}
				this.boidGL.drawGl(p.transformMat3, p.rgbColor, p.depth);
			} else {
				p.draw(scene);
			}
		});
	}

	update(scene: SceneRenderer): void {
		this.particles.forEach((p) => {
			if (!p.velocity.isZero) {
				p.rotation.angle = p.velocity.angleTo(new Point());
			}
			p.update(scene);
		})
	}

}
