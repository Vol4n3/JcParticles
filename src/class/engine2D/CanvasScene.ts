import {Camera} from './Camera';
import {Interaction} from './Interaction';

export interface IDraw {
	draw(scene: CanvasScene): void;
}
export interface IUpdate {
	update(scene: CanvasScene): void;
}
export class CanvasScene {
	canvas: HTMLCanvasElement = document.createElement('canvas');
	container: HTMLElement;
	ctx: CanvasRenderingContext2D;
	camera: Camera = new Camera();
	draws: IDraw[] = [];
	updates: IUpdate[] = [];
	interaction: Interaction;
	private _resizeRef = this.resize.bind(this);
	private _animateRef = this.animate.bind(this);
	private _loopRef = this.loop.bind(this);
	private readonly _animationFrame: number;
	private readonly _interval: number;

	loop() {
		this.updates.forEach((item)=>{
			item.update(this);
		})
	}

	constructor(containerId: string) {
		this.container = document.getElementById(containerId);
		this.ctx = this.canvas.getContext('2d');
		this.canvas.style.display = 'block';
		this.container.appendChild(this.canvas);
		window.addEventListener('resize', this._resizeRef);
		this.resize();
		this._animationFrame = requestAnimationFrame(this._animateRef);
		this._interval = setInterval(this._loopRef, 1000/60);
		this.interaction = new Interaction(this);
	}

	get height(): number {
		return this.container.clientHeight;
	}

	get width(): number {
		return this.container.clientWidth;
	}

	animate(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.draws.forEach((item)=>{
			item.draw(this);
		});
		requestAnimationFrame(this._animateRef);
	}

	resize() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	destroy() {
		window.removeEventListener('resize', this._resizeRef);
		window.cancelAnimationFrame(this._animationFrame);
		window.clearInterval(this._interval);
		this.interaction.destroy();
	}
}
