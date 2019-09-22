import {Particle} from '../particles/Particle';
import {CanvasScene} from '../CanvasScene';
import {WaveParticle} from '../particles/WaveParticle';
import {IMap} from './Map';

export class ColoredWaveMap implements IMap {
	particles: Particle[] = [];

	constructor(private _scene: CanvasScene) {
		const particleNumber = 50;
		const maxHeight = 45;
		for (let i = 1; i < particleNumber; i++) {
			const x = (i / particleNumber) * this._scene.width;
			const y = this._scene.height / 2;
			const p = new WaveParticle(x, y, maxHeight, i * 0.35);
			this.particles.push(p);
            this._scene.draws.push(...this.particles);
		}

	}

	update(scene: CanvasScene): void {
	}

	draw(scene: CanvasScene): void {

	}

}
