import {Camera} from './Camera';
import {Interaction} from './Interaction';

export interface IDraw {
	draw(scene: SceneRenderer): void;
}

export interface IUpdate {
	update(scene: SceneRenderer): void;
}

export class SceneRenderer {
	canvas: HTMLCanvasElement = document.createElement('canvas');
	container: HTMLElement;
	ctx: CanvasRenderingContext2D;
	useGL: boolean;
	gl: WebGLRenderingContext;
	camera: Camera = new Camera();
	draws: IDraw[] = [];
	updates: IUpdate[] = [];
	interaction: Interaction;
	width: number;
	height: number;
	private _resizeRef = this.resize.bind(this);
	private _animateRef = this.animate.bind(this);
	private _loopRef = this.loop.bind(this);
	private readonly _animationFrame: number;
	private readonly _interval: number;

	constructor(containerId: string, webgl?: boolean) {
		this.container = document.getElementById(containerId);
		window.addEventListener('resize', this._resizeRef);
		this.resize();
		if (webgl) {
			this.gl = this.canvas.getContext('webgl2');
			this.useGL = true;
		} else {
			this.ctx = this.canvas.getContext('2d');
			this.useGL = false;
		}
		if (this.gl) {
			this.gl.viewport(0, 0, this.width, this.height);
			this.gl.enable(this.gl.DEPTH_TEST);
			this.gl.clearColor(0, 0, 0, 0);
		} else {
			this.ctx = this.canvas.getContext('2d');
			this.useGL = false;
		}
		this.canvas.style.display = 'block';
		this.container.appendChild(this.canvas);
		this._animationFrame = requestAnimationFrame(this._animateRef);
		this._interval = setInterval(this._loopRef, 1000 / 45);
		this.interaction = new Interaction(this);
	}


	loop() {
		this.updates.forEach((item) => {
			item.update(this);
		})
	}

	animate(): void {
		if (this.useGL) {
			this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		} else {
			this.ctx.clearRect(0, 0, this.width, this.height);
		}
		this.draws.forEach((item) => {
			item.draw(this);
		});
		requestAnimationFrame(this._animateRef);
	}

	resize() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		if (this.useGL) {
			this.gl.viewport(0, 0, this.width, this.height);
		}
	}

	destroy() {
		window.removeEventListener('resize', this._resizeRef);
		window.cancelAnimationFrame(this._animationFrame);
		window.clearInterval(this._interval);
		this.interaction.destroy();
	}
}
