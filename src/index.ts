import {CanvasScene} from './class/engine2D/CanvasScene';
import {LinkedParticlesMap} from './class/engine2D/maps/LinkedParticlesMap';
import {IMap} from './class/engine2D/maps/Map';
import {ColoredWaveMap} from './class/engine2D/maps/ColoredWaveMap';
import {TextMap} from './class/engine2D/maps/TextMap';
import {VelocityMap} from './class/engine2D/maps/VelocityMap';

interface IOptions {
    demoType?: 'example01' | 'example02' | 'example03' | 'example04';
}

class JcParticle {
    map: IMap;
    scene: CanvasScene;

    constructor(containerId: string, private _options: IOptions = {}) {
        this.scene = new CanvasScene(containerId);
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
                this.map = new VelocityMap(this.scene);
                this.scene.updates.push(this.map);
                break;
        }
    }
}

(<any>window).JcParticle = JcParticle;
