import {IScene} from './Scene';
import {SceneRenderer} from '../SceneRenderer';
import {Path} from '../../geometry2D/Path';
import {Point} from '../../geometry2D/Point';

export class TestScene implements IScene {
    path: Path;

    constructor(scene: SceneRenderer) {
        const points = [
            new Point(400, 400),
            new Point(600, 700),
            new Point(700, 900),
            new Point(500, 500),
        ];

        this.path = new Path(points)
    }

    draw(scene: SceneRenderer): void {
        this.path.draw(scene);
    }

    update(scene: SceneRenderer): void {
        this.path.points[2].rotateAround(this.path.points[1],0.01);
    }
}
