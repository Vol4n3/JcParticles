import {Position} from './Position';
import {CanvasScene, IDraw, IUpdate} from './CanvasScene';

export class Particle extends Position implements IUpdate, IDraw {
	bounceOnBox: boolean = false;
	distanceDisappear = 50;

	update(scene: CanvasScene): void {
		this.move();
		if (this.bounceOnBox) {
			this.bounceBox('x', scene.width);
			this.bounceBox('x', 0, true);
			this.bounceBox('y', scene.height);
			this.bounceBox('y', 0, true);
		} else {
			this.teleportBox('x', scene.width + this.distanceDisappear, -this.distanceDisappear);
			this.teleportBox('x', -this.distanceDisappear, scene.width + this.distanceDisappear, true);
			this.teleportBox('y', scene.height + this.distanceDisappear, -this.distanceDisappear);
			this.teleportBox('y', -this.distanceDisappear, scene.height + this.distanceDisappear, true);
		}
	}

	teleportBox(key: string, val: number, goTo: number, isMinTest?: boolean): void {
		const isExitBox: boolean = (isMinTest) ? this[key] < val : this[key] > val;
		if (!isExitBox) {
			return;
		}
		this[key] = goTo;
	}

	bounceBox(key: string, val: number, isMinTest?: boolean): void {
		const isExitBox: boolean = (isMinTest) ? this[key] < val : this[key] > val;
		if (!isExitBox) {
			return;
		}
		this[key] = val;
		this.velocity[key] *= -1;
	}

	draw(scene: CanvasScene): void {
		scene.ctx.save();
		scene.ctx.beginPath();
		scene.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
		scene.ctx.fill();
		scene.ctx.closePath();
		scene.ctx.restore();
	}

}
