import {Particle} from '../particles/Particle';
import {SceneRenderer} from '../SceneRenderer';
import {WaveParticle} from '../particles/WaveParticle';
import {IScene} from './Scene';

export class ColoredWaveScene implements IScene {
	constructor(private _scene: SceneRenderer) {
		const particleNumber = 30;
		const maxHeight = 40;
		for (let i = 1; i < particleNumber; i++) {
			const x = (i / particleNumber) * this._scene.width;
			const y = this._scene.height / 2;
			const p = new WaveParticle(x, y, maxHeight, i * 0.35);
			this.particles.push(p);
            this._scene.draws.push(...this.particles);
		}

	}

	particles: Particle[] = [];

	update(scene: SceneRenderer): void {
	}

	draw(scene: SceneRenderer): void {

	}

}
