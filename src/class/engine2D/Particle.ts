import {CanvasScene, IUpdate} from './CanvasScene';
import {Position} from './Position';

export class Particle extends Position implements IUpdate {
	radius: number = 1;
	red: number = Math.round(Math.random()*255);
	green: number = Math.round(Math.random()*255);
	blue: number = Math.round(Math.random()*255);

	get color(): string {
		return `rgb(${this.red},${this.green} ,${this.blue})`;
	}

	update(scene: CanvasScene) {
		this.move();
		this.bounce('x', 'sup', scene.width);
		this.bounce('x', 'inf', 0);
		this.bounce('y', 'sup', scene.height);
		this.bounce('y', 'inf', 0);
	}

	bounce(key: string, condition: 'inf' | 'sup', val: number) {
		switch (condition) {
			case 'inf':
				if (this[key] < val) {
					this[key] = val;
					this.velocity[key] *= -1;
				}
				break;
			case 'sup':
				if (this[key] > val) {
					this[key] = val;
					this.velocity[key] *= -1;
				}
				break;
		}
	}

	draw(scene: CanvasScene) {
		scene.ctx.save();
		scene.ctx.fillStyle = this.color;
		scene.ctx.beginPath();
		scene.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		scene.ctx.fill();
		scene.ctx.closePath();
		scene.ctx.restore();
	}
}
