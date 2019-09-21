import {CanvasScene} from './class/engine2D/CanvasScene';
import {LinkedParticlesMap} from './class/engine2D/maps/LinkedParticlesMap';
import {IMap} from './class/engine2D/maps/Map';
import {ColoredWaveMap} from './class/engine2D/maps/ColoredWaveMap';
import {TextToParticle} from './class/engine2D/textToParticle';
import {Circle} from './class/geometry2D/Circle';
import {Vector} from './class/geometry2D/Vector';
import {Segment} from './class/geometry2D/Segment';
import {Point} from './class/geometry2D/Point';
import {Particle} from './class/engine2D/particles/Particle';

interface IOptions {
	demoType?: 'example01' | 'example02' | 'example03';
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
                this.map = new LinkedParticlesMap(this.scene, 120);
				this.scene.draws.push(...this.map.particles);
				this.scene.updates.push(...this.map.particles);
				this.scene.draws.push(this.map);
				break;
			case 'example02':
				this.map = new ColoredWaveMap(this.scene);
				this.scene.draws.push(...this.map.particles);
				this.scene.updates.push(...this.map.particles);
				break;
			case 'example03':
				// todo : Refacto this
				const TTP = new TextToParticle();
				const points = TTP.getPoints("Hello world");
                const particles: Particle[] = [];
				points.forEach((p) => {
                    const ep: Particle = new Particle(p.x * 6, p.y * 6);
					ep.radius = Math.round(Math.random() * 3 + 1);
					ep.randomColor();
                    ep.returnAtStarted = true;
                    ep.friction = new Point(0.15, 0.15);
					ep.translate(Math.random() * this.scene.width, Math.random() * this.scene.height);
					particles.push(ep);
				});
				this.scene.draws.push(...particles);
				this.scene.updates.push(...particles);
				this.scene.interaction.subscribesHover.push(($event: MouseEvent): void => {
					const circle = new Circle($event.x, $event.y);
					circle.radius = 30;
					particles.forEach((p) => {
							if (p.inCircle(circle, true)) {
								const vector: Vector = new Segment(circle, p).vector;
								vector.length = circle.radius * 3;
								p.velocity.add(vector.destination);
                                p.returnAtStarted = false;
							} else {
                                p.returnAtStarted = true;
							}
						}
					)
				})
		}
	}

	destroy() {
		this.scene.destroy();
	}
}

(<any>window).JcParticle = JcParticle;
