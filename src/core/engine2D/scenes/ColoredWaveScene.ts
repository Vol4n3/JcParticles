import {Particle} from '../particles/Particle';
import {SceneRenderer} from '../SceneRenderer';
import {WaveParticle} from '../particles/WaveParticle';
import {IScene} from './Scene';

export class ColoredWaveScene implements IScene {
	constructor(private _sc: SceneRenderer) {
		const particleNumber = 30;
		const maxHeight = 40;
		for (let i = 1; i < particleNumber; i++) {
			const x = (i / particleNumber) * _sc.width;
			const y = _sc.height / 2;
			const p = new WaveParticle(x, y, maxHeight, i * 0.35);
			this.particles.push(p);
			_sc.draws.push(...this.particles);
		}

	}

	particles: Particle[] = [];

	update(scene: SceneRenderer): void {
	}

	draw(scene: SceneRenderer): void {

	}

}
