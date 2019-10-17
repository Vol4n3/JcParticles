import {IMap} from './Map';
import {Particle} from '../particles/Particle';
import {CanvasScene} from '../CanvasScene';
import {ImageToPointsFactory} from '../ImageToPointsFactory';
import {Point} from '../../geometry2D/Point';
import {Circle} from '../../geometry2D/Circle';
import {Vector} from '../../geometry2D/Vector';
import {Segment} from '../../geometry2D/Segment';
import {ColorPoint} from '../ColorPoint';

export class TransformMap implements IMap {
	particles: Particle[] = [];
	canvasToPoint = new ImageToPointsFactory();

	constructor(private _scene: CanvasScene) {
		this._scene.interaction.subscribesHover.push(($event: MouseEvent): void => {
			const circle = new Circle($event.x, $event.y);
			circle.radius = 30;
			this.particles.forEach((p) => {
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
			ep.moveTypes = ['vibration'];
			ep.setRgb(p.rgbColor.red, p.rgbColor.green, p.rgbColor.blue);
			ep.alpha = p.rgbColor.alpha;
			ep.radius = 3;
			ep.returnAtStarted = true;
			ep.friction = new Point(0.12, 0.12);
			ep.translate(Math.random() * this._scene.width, Math.random() * this._scene.height);
			this.particles.push(ep);
		});
	}

	loadImage(image: HTMLImageElement) {
		const points = this.canvasToPoint.fromImage(image);
		this.createParticles(points);
	}

	draw(scene: CanvasScene): void {
		this.particles.forEach(p => p.draw(scene));
	}

	drawGl(scene: CanvasScene): void {
	}

	update(scene: CanvasScene): void {
		this.particles.forEach(p => p.update(scene));
	}
}
