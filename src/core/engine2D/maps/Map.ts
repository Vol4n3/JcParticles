import {Particle} from '../particles/Particle';
import {IDraw, IUpdate} from '../CanvasScene';

export interface IMap extends IDraw, IUpdate {
	particles: Particle[];
}
