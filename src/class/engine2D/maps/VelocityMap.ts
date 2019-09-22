import {IMap} from './Map';
import {Particle} from '../particles/Particle';
import {CanvasScene} from '../CanvasScene';
import {Vector} from '../../geometry2D/Vector';
import {Point} from '../../geometry2D/Point';
import {PerlinNoise} from '../PerlinNoise';

export class VelocityMap implements IMap {
    particles: Particle[];
    poisson: Particle;
    velocityGrid: Vector[] = [];

    constructor(private _scene: CanvasScene) {
        const perlin = new PerlinNoise();
        for (let y = 0; y < this._scene.height; y += 20) {
            for (let x = 0; x < this._scene.width; x += 20) {
                const perlinValue = ((perlin.noise2D(x, y) + 1) / 2) * Math.PI * 2;
                console.log(perlinValue);
                const vector = new Vector(new Point(5, 0));
                vector.angle = perlinValue;
                this.velocityGrid.push(vector);
                this._scene.draws.push(vector.makeSegmentFrom(new Point(x, y)));
            }
        }
        console.log(this.velocityGrid.length);
        this.poisson = new Particle(20, 20);
        this.poisson.moveTypes.push('bounce');
        this.poisson.friction = new Point(0.95, 0.95);
        this.poisson.radius = 10;
        this.poisson.maxVelocity = 5;
        this._scene.draws.push(this.poisson);
        this._scene.updates.push(this.poisson);
    }

    draw(scene: CanvasScene): void {
    }

    getNearFlow(x: number, y: number): Vector {
        const roundedX = Math.round(x / 20);
        const roundedY = Math.round(y / 20);
        const index = roundedX + Math.round(this._scene.width / 20) * roundedY;
        return this.velocityGrid[index];
    }

    update(scene: CanvasScene): void {
        const goMove = this.getNearFlow(this.poisson.x, this.poisson.y);

        if (goMove) {
            this.poisson.velocity.add(goMove.destination);
        }
    }

}