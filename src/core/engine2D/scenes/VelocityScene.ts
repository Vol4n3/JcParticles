import {IScene} from './Scene';
import {Particle} from '../particles/Particle';
import {SceneRenderer} from '../SceneRenderer';
import {Vector} from '../../geometry2D/Vector';

export class VelocityScene implements IScene {
	particles: Particle[] = [];
	velocityGrid: Vector[] = [];

	constructor(private _scene: SceneRenderer) {
		for (let p = 0; p < 20; p++) {
			const fish = new Particle(Math.random() * this._scene.width, Math.random() * this._scene.height);
			fish.moveTypes.push('teleport', 'randomWalk');
			fish.maxVelocity = 3;
			fish.radius = 5;
			this._scene.draws.push(fish);
			this._scene.updates.push(fish);
			this.particles.push(fish);
		}
	}

	draw(scene: SceneRenderer): void {
	}

	getNearFlow(x: number, y: number): Vector {
		const roundedX = Math.round(x / 20);
		const roundedY = Math.round(y / 20);
		const index = roundedX + Math.round(this._scene.width / 20) * roundedY;
		return this.velocityGrid[index];
	}

	update(scene: SceneRenderer): void {
		for (let p = 1; p < this.particles.length; p++) {
			const distance = this.particles[p].distanceTo(this.particles[0]);
			if (distance > 3 && distance < 100) {
				if (Math.random() > 0.8) {
					this.particles[p].velocity.add(this.particles[0].velocity);
				}
			}
		}
	}
}
