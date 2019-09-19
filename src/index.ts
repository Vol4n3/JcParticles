import {CanvasScene} from './class/engine2D/CanvasScene';
import {LinkedParticlesMap} from './class/engine2D/maps/LinkedParticlesMap';
import {IMap} from './class/engine2D/maps/Map';

interface IOptions {
	demoType?: 'example01';
}

class JcParticle {
	scene: CanvasScene;
	map: IMap;

	constructor(containerId: string, private _options: IOptions = {}) {
		this.scene = new CanvasScene(containerId);
		if (_options.demoType) {
			this.initExample();
		}

	}

	initExample() {
		switch (this._options.demoType) {
			case 'example01':
				this.map = new LinkedParticlesMap(this.scene, 70);
				this.scene.draws.push(...this.map.particles);
				this.scene.updates.push(...this.map.particles);
				this.scene.draws.push(this.map);
				break;
		}
	}

	destroy() {
		this.scene.destroy();
	}
}

(<any>window).JcParticle = JcParticle;
