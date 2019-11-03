import {IScene} from './Scene';
import {Particle} from '../particles/Particle';
import {SceneRenderer} from '../SceneRenderer';
import {ImageToPointsFactory} from '../ImageToPointsFactory';
import {Point} from '../../geometry2D/Point';
import {Circle} from '../../geometry2D/Circle';
import {Vector} from '../../geometry2D/Vector';
import {Segment} from '../../geometry2D/Segment';
import {ColorPoint} from '../ColorPoint';

export class TransformScene implements IScene {
	particles: Particle[] = [];
	canvasToPoint = new ImageToPointsFactory();

	constructor(private _sc: SceneRenderer) {
		this._sc.interaction.subscribesHover.push(($event: MouseEvent): void => {
			const circle = new Circle($event.x, $event.y);
			circle.radius = 30;
			this.particles.forEach((p) => {
					if (p.inCircle(circle, true)) {
                        const vector: Vector = new Segment(circle, p).endVector;
						vector.length = circle.radius * 3;
						p.velocity.add(vector.destination);
						p.moveTypes = ['vibration', 'pinned'];
					} else {
						p.moveTypes = ['vibration'];
					}
				}
			)
		})
	}

	loadText(text: string = "Hello world !") {
		if (!text || !text.length) {
			return;
		}
		const points = this.canvasToPoint.FromText(text);
		this.createParticles(points);
	}

	createParticles(colorPoints: ColorPoint[]) {
		this.particles = [];
		colorPoints.forEach((p) => {
			const ep: Particle = new Particle(p.x, p.y);
			ep.moveTypes = ['vibration', 'pinned'];
			ep.rgbColor = p.rgbColor.copy();
			ep.radius = 3;
			ep.friction = new Point(0.12, 0.12);
			ep.translate(Math.random() * this._sc.width, Math.random() * this._sc.height);
			this.particles.push(ep);
		});
	}

	loadImage(image: HTMLImageElement) {
		const points = this.canvasToPoint.fromImage(image);
		this.createParticles(points);
	}

	draw(scene: SceneRenderer): void {
		this.particles.forEach(p => p.draw(scene));
	}

	update(scene: SceneRenderer): void {
		this.particles.forEach(p => p.update(scene));
	}
}
