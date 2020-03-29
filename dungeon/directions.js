/* SPDX-License-Identifier: MIT */

class Direction {
  #name;
  #rowAdjustment;
  #colAdjustment;

  #next45;
  #opposite;
  #previous45;
  #others;
  #nonAdjacent;

  constructor(name, rowAdjustment, colAdjustment) {
    this.#name = name;
    this.#rowAdjustment = rowAdjustment;
    this.#colAdjustment = colAdjustment;
    Object.freeze(this);
  }
  get name() { return this.#name; }
  get rowAdjustment() { return this.#rowAdjustment; }
  get colAdjustment() { return this.#colAdjustment; }

  get next45() { return this.#next45; }
  get next90() { return this.next45.next45; }
  get opposite() { return this.#opposite; }
  get previous45() { return this.#previous45; }
  get previous90() { return this.previous45.previous45; }
  get nonAdjacentDirections() { return this.#nonAdjacent; }
  get allOtherDirections() { return this.#others; }

  _initialize(orderedDirections) {
    const position = orderedDirections.indexOf(this);
    const nextPosition = (position + 1) % orderedDirections.length;
    this.#next45 = orderedDirections[nextPosition];

    const previousPosition = (position + 7) % orderedDirections.length;
    this.#previous45 = orderedDirections[previousPosition];

    const oppositePosition = (position + 4) % orderedDirections.length;
    this.#opposite = orderedDirections[oppositePosition];

    this.#others = [];
    this.#nonAdjacent = [];

    orderedDirections.forEach(dir => {
      if (dir !== this) {
        this.#others.push(dir);
        if (dir !== this.next45 && dir !== this.previous45) {
          this.#nonAdjacent.push(dir);
        }
      }
    });
    Object.freeze(this.#others);
    Object.freeze(this.#nonAdjacent);
    Object.freeze(this);
  }
}

const Directions = {
  north: new Direction('north', -1, 0),
  northeast: new Direction('northeast', -1, 1),
  east: new Direction('east', 0, 1),
  southeast: new Direction('southeast', 1, 1),
  south: new Direction('south', 1, 0),
  southwest: new Direction('southwest', 1, -1),
  west: new Direction('west', 0, -1),
  northwest: new Direction('northwest', -1, -1),
};

const OrderedDirections = [
  Directions.north,
  Directions.northeast,
  Directions.east,
  Directions.southeast,
  Directions.south,
  Directions.southwest,
  Directions.west,
  Directions.northwest,
];
Object.freeze(OrderedDirections);
OrderedDirections.forEach(dir => dir._initialize(OrderedDirections));

Directions.forEach = Array.prototype.forEach.bind(OrderedDirections);
Object.freeze(Directions);

const CardinalDirections = [
  Directions.north,
  Directions.east,
  Directions.south,
  Directions.west,
];
Object.freeze(CardinalDirections);

export { Directions, CardinalDirections };
