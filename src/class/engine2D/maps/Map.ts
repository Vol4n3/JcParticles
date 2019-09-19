import {Particle} from '../Particle';
import {IDraw} from '../CanvasScene';

export interface IMap extends IDraw {
	particles: Particle[];
}
