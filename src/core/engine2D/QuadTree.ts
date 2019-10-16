import {Point} from '../geometry2D/Point';
import {Rectangle} from '../geometry2D/Rectangle';
import {Circle} from '../geometry2D/Circle';

//      .----.----.
//      | NW | NE |
//      '----'----'
//      | SW | SE |
//      '----'----'
export class QuadTree<T extends Point> {
	public points: T[] = [];
	divided: boolean;
	private northwest: QuadTree<T>;
	private northeast: QuadTree<T>;
	private southwest: QuadTree<T>;
	private southeast: QuadTree<T>;

	constructor(public boundary: Rectangle, public capacity: number = 4, public parent?: QuadTree<T>) {

	}

	subdivide() {
		const x = this.boundary.origin.x,
			y = this.boundary.origin.y,
			w = this.boundary.width / 2,
			h = this.boundary.height / 2;

		const ne = new Rectangle(new Point(x + w, y - h), w, h);
		this.northeast = new QuadTree<T>(ne, this.capacity, this);
		const nw = new Rectangle(new Point(x - w, y - h), w, h);
		this.northwest = new QuadTree<T>(nw, this.capacity, this);
		const se = new Rectangle(new Point(x + w, y + h), w, h);
		this.southeast = new QuadTree<T>(se, this.capacity, this);
		const sw = new Rectangle(new Point(x - w, y + h), w, h);
		this.southwest = new QuadTree<T>(sw, this.capacity, this);
		this.divided = true;
	}

	insert(p: T): boolean {
		if (!p.inRectangle(this.boundary)) {
			return false;
		}
		if (this.points.length < this.capacity) {
			this.points.push(p);
			return true;
		}
		if (!this.divided) {
			this.subdivide();
		}
		return this.northeast.insert(p) ||
			this.northwest.insert(p) ||
			this.southeast.insert(p) ||
			this.southwest.insert(p);

	}

	queryCircle(range: Circle, found: T[] = []): T[] {
		if (!range.inRectangle(this.boundary)) {
			return found;
		} else {
			this.points.forEach((p) => {
				if (p.inCircle(range)) {
					found.push(p);
				}
			});
			if (this.divided) {
				this.northwest.queryCircle(range, found);
				this.northeast.queryCircle(range, found);
				this.southwest.queryCircle(range, found);
				this.southeast.queryCircle(range, found);
			}
			return found;
		}
	}

	queryRect(range: Rectangle, found: T[] = []): T[] {
		if (!range.intersect(this.boundary)) {
			return found;
		} else {
			this.points.forEach((p) => {
				p.inRectangle(range);
			});
			if (this.divided) {
				this.northwest.queryRect(range, found);
				this.northeast.queryRect(range, found);
				this.southwest.queryRect(range, found);
				this.southeast.queryRect(range, found);
			}
			return found;
		}
	}
}
