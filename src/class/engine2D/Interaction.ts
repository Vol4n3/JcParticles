import {CanvasScene} from './CanvasScene';

export class Interaction {
	subscribesClick: (($event: MouseEvent) => void)[] = [];
	subscribesHover: (($event: MouseEvent) => void)[] = [];
	private _refOnClick = this._OnClick.bind(this);
	private _refOnHover = this._OnHover.bind(this);

	constructor(private _scene: CanvasScene) {
		this._scene.canvas.addEventListener('click', this._refOnClick);
		this._scene.canvas.addEventListener('mousemove', this._refOnHover);
	}

	destroy() {
		this._scene.canvas.removeEventListener('click', this._refOnClick);
		this._scene.canvas.removeEventListener('mousemove', this._refOnHover);
	}

	private _OnClick($event: MouseEvent) {
		this.subscribesClick.forEach((sub) => {
			sub($event);
		});
	}

	private _OnHover($event: MouseEvent) {
		this.subscribesHover.forEach((sub) => {
			sub($event);
		});
	}
}
