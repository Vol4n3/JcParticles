import {Particle} from '../particles/Particle';
import {IDraw, IUpdate} from '../SceneRenderer';

export interface IScene extends IDraw, IUpdate {
	particles?: Particle[];
}
