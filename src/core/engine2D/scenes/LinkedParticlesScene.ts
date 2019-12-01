import {Link} from '../Link';
import {SceneRenderer} from '../SceneRenderer';
import {IScene} from './Scene';
import {Particle} from '../particles/Particle';
import {Point} from '../../geometry2D/Point';

export class LinkedParticlesScene implements IScene {
	constructor(private _sc: SceneRenderer, private _particlesNumber: number) {
		for (let i = 0; i < this._particlesNumber; i++) {
			this.addParticle();
		}
	}

	particles: Particle[] = [];
	maxLinkLength: number = 70;

	update(scene: SceneRenderer): void {
	}

	addParticle() {
		const p = new Particle(Math.random() * this._sc.width, Math.random() * this._sc.height);
		p.radius = Math.round(Math.random() * 2 + 1);
		p.velocity.moveTo(new Point(Math.random() * 4 - 2, Math.random() * 4 - 2));
		p.moveTypes = ['bounce'];
		p.rgbColor.random();
		this.particles.push(p);
		this._sc.draws.push(p);
		this._sc.updates.push(p);
	}

	draw(game: SceneRenderer): void {
		for (let i = 0; i < this._particlesNumber; i++) {
			for (let j = i + 1; j < this._particlesNumber; j++) {
				const pi = this.particles[i];
				const pj = this.particles[j];
				if (pi.distanceTo(pj) > this.maxLinkLength) {
					continue;
				}
				const lp = new Link(pi, pj);
				lp.maxlength = this.maxLinkLength;
				lp.draw(game);
			}
		}
	}
}
