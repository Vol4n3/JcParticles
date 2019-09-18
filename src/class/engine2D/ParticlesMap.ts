import {Particle} from './Particle';
import {LinkParticle} from './LinkParticle';
import {CanvasScene, IDraw} from './CanvasScene';

export class ParticlesMap implements IDraw{
	particlesNumber = 70;
	particles: Particle[] = [];
	maxLinkLength: number = 100;
	constructor(private _scene) {
		for (let i = 0; i < this.particlesNumber; i++) {
			const p = new Particle(Math.random() * this._scene.width, Math.random() * this._scene.height);
			p.radius = Math.round(Math.random() * 2 + 1);
			p.velocity.translate(Math.random() * 4 - 2, Math.random() * 4 - 2);
			this.particles.push(p);
		}

	}
	draw(game: CanvasScene): void {
		for (let i = 0; i < this.particlesNumber; i++) {
			for (let j = i + 1; j < this.particlesNumber; j++) {
				const pi = this.particles[i];
				const pj = this.particles[j];
				if(pi.distanceTo(pj) > this.maxLinkLength){
					continue;
				}
				const lp = new LinkParticle(pi, pj);
				lp.maxlength = this.maxLinkLength;
				lp.draw(game);
			}
		}
	}
}
