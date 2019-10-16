import {CanvasScene} from './core/engine2D/CanvasScene';
import {LinkedParticlesMap} from './core/engine2D/maps/LinkedParticlesMap';
import {IMap} from './core/engine2D/maps/Map';
import {ColoredWaveMap} from './core/engine2D/maps/ColoredWaveMap';
import {TransformMap} from './core/engine2D/maps/TransformMap';

interface IOptions {
	demoType?: 'example01' | 'example02' | 'example03' | 'example04';
}

class JcParticle {
	map: IMap;
	scene: CanvasScene;

	constructor(containerId: string, private _options: IOptions = {}) {
		switch (_options.demoType) {
			case 'example01':
			case 'example02':
			case 'example03':
				this.scene = new CanvasScene(containerId);
				break;
			case 'example04':
				this.scene = new CanvasScene(containerId, true);
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
				this.map = new LinkedParticlesMap(this.scene, 120);
				this.scene.draws.push(this.map);
				break;
			case 'example02':
				this.map = new ColoredWaveMap(this.scene);
				this.scene.updates.push(...this.map.particles);
				break;
			case 'example03':
				const textMap = new TransformMap(this.scene);
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
				this.map = new TransformMap(this.scene);
				break;
		}
	}
}

(<any>window).JcParticle = JcParticle;
