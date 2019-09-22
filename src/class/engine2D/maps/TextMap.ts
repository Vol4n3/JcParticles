import {IMap} from './Map';
import {Particle} from '../particles/Particle';
import {CanvasScene} from '../CanvasScene';
import {TextToParticle} from '../textToParticle';
import {Point} from '../../geometry2D/Point';
import {Circle} from '../../geometry2D/Circle';
import {Vector} from '../../geometry2D/Vector';
import {Segment} from '../../geometry2D/Segment';

export class TextMap implements IMap {
    particles: Particle[];

    constructor(scene: CanvasScene) {
        const TTP = new TextToParticle();
        const points = TTP.getPoints("Hello world");
        const particles: Particle[] = [];
        points.forEach((p) => {
            const ep: Particle = new Particle(p.x * 6, p.y * 6);
            ep.moveTypes = ['vibration'];
            ep.radius = Math.round(Math.random() * 3 + 1);
            ep.randomColor();
            ep.returnAtStarted = true;
            ep.friction = new Point(0.12, 0.12);
            ep.translate(Math.random() * scene.width, Math.random() * scene.height);
            particles.push(ep);
            scene.draws.push(ep);
            scene.updates.push(ep);
        });
        scene.interaction.subscribesHover.push(($event: MouseEvent): void => {
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

    draw(scene: CanvasScene): void {
    }

    update(scene: CanvasScene): void {
    }
}