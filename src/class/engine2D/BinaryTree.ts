import {Point} from '../geometry2D/Point';
import {Triangle} from '../geometry2D/Triangle';

/**
 * WIP
 */
export class BinaryTree<T extends Point> {
	public points: Point[] = [];

	constructor(public boundary: Triangle, public capacity: number = 4, public parent?: BinaryTree<T>) {
	}
}
