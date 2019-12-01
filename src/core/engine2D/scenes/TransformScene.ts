import {IScene} from './Scene';
import {Particle} from '../particles/Particle';
import {SceneRenderer} from '../SceneRenderer';
import {ImageToPointsFactory} from '../ImageToPointsFactory';
import {Point} from '../../geometry2D/Point';
import {Circle} from '../../geometry2D/Circle';
import {Vector} from '../../geometry2D/Vector';
import {Segment} from '../../geometry2D/Segment';
import {ColorPoint} from '../ColorPoint';
import {Shader} from '../../webgl/Shader';
import {SimpleGeometryColor} from '../webgl/SimpleGeometryColor';

export class TransformScene implements IScene {
	particles: Particle[] = [];
	canvasToPoint = new ImageToPointsFactory();
    geometry: SimpleGeometryColor;
	constructor(private _sc: SceneRenderer) {
        const shader = new Shader(_sc.gl, SimpleGeometryColor.vertex, SimpleGeometryColor.fragment);
        const center = new Point();
        this.geometry = new SimpleGeometryColor(_sc.gl, shader, center.makePolygonPoints(6, 1, 0, true) as number[]);
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

    createParticles(colorPoints: ColorPoint[], scaleX: number = 1, scaleY: number = 1) {
		this.particles = [];
		colorPoints.forEach((p) => {
			const ep: Particle = new Particle(p.x * scaleX, p.y * scaleY);
			ep.moveTypes = ['vibration', 'pinned'];
			ep.rgbColor = p.rgbColor.copy();
			ep.radius = 3;
			ep.friction = new Point(0.12, 0.12);
			ep.moveTo(new Point(Math.random() * this._sc.width, Math.random() * this._sc.height));
			this.particles.push(ep);
		});
	}

	draw(scene: SceneRenderer): void {
        this.particles.forEach(p => {
            if (scene.useGL) {
                if (!p.transformMat3) {
                    return;
                }
                return this.geometry.drawGl(p.transformMat3, p.rgbColor, p.depth);
            }
            return p.draw(scene);
        });
    }

    loadImage(image: HTMLImageElement) {
        const points = this.canvasToPoint.fromImage(image);
        const ratio = (image.width > this._sc.width) ? this._sc.width / image.width : 1;
        this.createParticles(points, ratio, ratio);
    }

	update(scene: SceneRenderer): void {
		this.particles.forEach(p => p.update(scene));
	}
}
