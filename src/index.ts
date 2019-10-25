import {SceneRenderer} from './core/engine2D/SceneRenderer';
import {LinkedParticlesScene} from './core/engine2D/scenes/LinkedParticlesScene';
import {IScene} from './core/engine2D/scenes/Scene';
import {ColoredWaveScene} from './core/engine2D/scenes/ColoredWaveScene';
import {TransformScene} from './core/engine2D/scenes/TransformScene';
import {GLScene} from './core/engine2D/scenes/GLScene';
import {BoidsScene} from './core/engine2D/scenes/BoidsScene';

interface IOptions {
	demoType?: 'example01' | 'example02' | 'example03' | 'example04' | 'example05';
}

class JcParticle {
	map: IScene;
	scene: SceneRenderer;

	constructor(containerId: string, private _options: IOptions = {}) {
		switch (_options.demoType) {
			case 'example01':
			case 'example02':
			case 'example03':
				this.scene = new SceneRenderer(containerId);
				break;
			case 'example04':
			case 'example05':
				this.scene = new SceneRenderer(containerId, true);
		}
		if (_options.demoType) {
			this.initExample();
		}

	}

	destroy() {
		this.scene.destroy();
	}

	initExample() {
		switch (this._options.demoType) {
			case 'example01':
				this.map = new LinkedParticlesScene(this.scene, 120);
				this.scene.draws.push(this.map);
				break;
			case 'example02':
				this.map = new ColoredWaveScene(this.scene);
				this.scene.updates.push(...this.map.particles);
				break;
			case 'example03':
				const textMap = new TransformScene(this.scene);
				textMap.loadText();
				document.getElementById('importText').addEventListener('input', ($event: InputEvent) => {
					const target: HTMLInputElement = $event.target as HTMLInputElement;
					textMap.loadText(target.value);
				});
				document.getElementById('importImg').addEventListener('input', ($event: InputEvent) => {
					const target: HTMLInputElement = $event.target as HTMLInputElement;
					const reader = new FileReader();
					const file = target.files[0];
					const img = document.createElement('img');
					reader.addEventListener('load', () => {
						img.src = reader.result as string;
					});
					img.addEventListener('load', () => {
						textMap.loadImage(img);
					});
					if (file) {
						reader.readAsDataURL(file);
					}
				});
				this.scene.draws.push(textMap);
				this.scene.updates.push(textMap);
				break;
			case 'example04':
				this.map = new GLScene(this.scene);
				this.scene.draws.push(this.map);
				this.scene.updates.push(this.map);
				break;
			case 'example05':
				this.map = new BoidsScene(this.scene);
				this.scene.draws.push(this.map);
				this.scene.updates.push(this.map);
				break;
		}
	}
}

(<any>window).JcParticle = JcParticle;
