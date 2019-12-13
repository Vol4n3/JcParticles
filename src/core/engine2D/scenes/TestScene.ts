import {IScene} from './Scene';
import {SceneRenderer} from '../SceneRenderer';
import {Path} from '../../geometry2D/Path';
import {Point} from '../../geometry2D/Point';
import {SimpleGeometryColor} from '../webgl/SimpleGeometryColor';
import {Shader} from '../../webgl/Shader';
import {Matrix3} from '../../Math/Matrix3';
import {RGBColor} from '../RGBColor';

export class TestScene implements IScene {
    geometry: SimpleGeometryColor;
    matrix: Matrix3;
    constructor(scene: SceneRenderer) {
        const points = [
            new Point(0, 0),
            new Point(30, 15),
        ];
        const path: Path = new Path(points);
        const shape = path.getContour(100);
        const vertices = [];
        shape.forEach((p) => vertices.push(p.x / scene.width, p.y / scene.height));
        const shader = new Shader(scene.gl, SimpleGeometryColor.vertex, SimpleGeometryColor.fragment);
        this.geometry = new SimpleGeometryColor(scene.gl, shader, vertices);
        this.matrix = Matrix3.transform2D({
            width: scene.width,
            height: scene.height,
            position: {x: 300, y: 300},
            rotation: {angle: 0, x: 0, y: 0},
            scale: {x: 200, y: 200}
        });
    }

    draw(scene: SceneRenderer): void {
        this.geometry.drawGl(this.matrix, new RGBColor(), 0);
    }

    update(scene: SceneRenderer): void {
    }
}
