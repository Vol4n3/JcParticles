import {CanvasScene} from './class/engine2D/CanvasScene';
import {LinkedParticlesMap} from './class/engine2D/maps/LinkedParticlesMap';
import {IMap} from './class/engine2D/maps/Map';
import {ColoredWaveMap} from './class/engine2D/maps/ColoredWaveMap';
import {TextMap} from './class/engine2D/maps/TextMap';
import {TriangleColoredShader} from './class/engine2D/webgl/TriangleColoredShader';

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
				this.map = new TextMap(this.scene);
				break;
			case 'example04':
				const shader = new TriangleColoredShader(this.scene, [
					0, 0,
					100, 0,
					0, 100,
					100, 100
				]);
				this.scene.interaction.subscribesHover.push(($event) => {
					shader.drawGl({
						position: {x: $event.x, y: $event.y},
						rotation: {angle: 0, x: 0, y: 0},
						scale: {x: 1, y: 1}
					})
				})
		}
	}
}

(<any>window).JcParticle = JcParticle;
