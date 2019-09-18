import {CanvasScene} from './class/engine2D/CanvasScene';
import {ParticlesMap} from './class/engine2D/ParticlesMap';

interface IOptions {

}
class JcParticle {
	private _scene: CanvasScene;

	constructor(containerId: string, options?: IOptions) {
		this._scene = new CanvasScene(containerId);
		const map = new ParticlesMap(this._scene);
		this._scene.draws.push(...map.particles);
		this._scene.updates.push(...map.particles);
		this._scene.draws.push(map);
	}

	destroy() {
		this._scene.destroy();
	}
}

(<any>window).JcParticle = JcParticle;
