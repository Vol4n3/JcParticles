import {ColoredParticle} from '../particles/ColoredParticle';
import {Link} from '../Link';
import {CanvasScene, IDraw} from '../CanvasScene';
import {IMap} from './Map';

export class LinkedParticlesMap implements IMap, IDraw {
	update(scene: CanvasScene): void {
	}
	particles: ColoredParticle[] = [];
	maxLinkLength: number = 100;

	constructor(private _scene: CanvasScene, private _particlesNumber: number) {
		for (let i = 0; i < this._particlesNumber; i++) {
			this.addParticle();
		}
	}

	addParticle() {
		const p = new ColoredParticle(Math.random() * this._scene.width, Math.random() * this._scene.height);
		p.radius = Math.round(Math.random() * 2 + 1);
		p.velocity.translate(Math.random() * 4 - 2, Math.random() * 4 - 2);
		p.randomColor();
		this.particles.push(p);
	}

	draw(game: CanvasScene): void {
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
