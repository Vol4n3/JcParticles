import {IScene} from './Scene';
import {Particle} from '../particles/Particle';
import {SceneRenderer} from '../SceneRenderer';
import {Shader} from '../../webgl/Shader';
import {SimpleGeometryColor} from '../webgl/SimpleGeometryColor';
import {Point} from '../../geometry2D/Point';
import {Segment} from '../../geometry2D/Segment';

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
		for (let i = 0; i < 1000; i++) {
			const p = new Particle(Math.random() * _sc.width, Math.random() * _sc.height);
			p.moveTypes = ['randomWalk', 'bounce'];
			p.velocity.x = 2;
			p.maxVelocity = 10;
			p.radius = 10;
			this.particles.push(p);
		}
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
		for (let i = 0; i < this.particles.length; i++) {
			const p = this.particles[i];
			for (let j = i + 1; j < this.particles.length; j++) {
				const otherP = this.particles[j];
				if (p.distanceTo(otherP) < p.radius + otherP.radius) {
					const seg = new Segment(p.copy(), otherP.copy());
					const vecStart = seg.startVector;
					const vecEnd = seg.endVector;
					const back = (p.radius + otherP.radius) / 10;
					vecStart.length = back;
					vecEnd.length = back;
					p.velocity.add(vecStart.destination);
					otherP.velocity.add(vecEnd.destination);
				}
			}
			if (!p.velocity.isZero) {
				p.rotation.angle = p.velocity.angleTo(new Point());
			}
			p.update(scene);
		}
	}

}
