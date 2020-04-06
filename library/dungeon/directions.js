/* SPDX-License-Identifier: MIT */

class Direction {
  _PRIVATE_name;
  _PRIVATE_rowAdjustment;
  _PRIVATE_colAdjustment;

  _PRIVATE_next45;
  _PRIVATE_opposite;
  _PRIVATE_previous45;
  _PRIVATE_others;
  _PRIVATE_nonAdjacent;

  constructor(name, rowAdjustment, colAdjustment) {
    this._PRIVATE_name = name;
    this._PRIVATE_rowAdjustment = rowAdjustment;
    this._PRIVATE_colAdjustment = colAdjustment;
  }
  get name() {
    return this._PRIVATE_name;
  }
  get rowAdjustment() {
    return this._PRIVATE_rowAdjustment;
  }
  get colAdjustment() {
    return this._PRIVATE_colAdjustment;
  }

  get next45() {
    return this._PRIVATE_next45;
  }
  get next90() {
    return this.next45.next45;
  }
  get opposite() {
    return this._PRIVATE_opposite;
  }
  get previous45() {
    return this._PRIVATE_previous45;
  }
  get previous90() {
    return this.previous45.previous45;
  }
  get nonAdjacentDirections() {
    return this._PRIVATE_nonAdjacent;
  }
  get allOtherDirections() {
    return this._PRIVATE_others;
  }

  _initialize(orderedDirections) {
    const position = orderedDirections.indexOf(this);
    const nextPosition = (position + 1) % orderedDirections.length;
    this._PRIVATE_next45 = orderedDirections[nextPosition];

    const previousPosition = (position + 7) % orderedDirections.length;
    this._PRIVATE_previous45 = orderedDirections[previousPosition];

    const oppositePosition = (position + 4) % orderedDirections.length;
    this._PRIVATE_opposite = orderedDirections[oppositePosition];

    this._PRIVATE_others = [];
    this._PRIVATE_nonAdjacent = [];

    orderedDirections.forEach((dir) => {
      if (dir !== this) {
        this._PRIVATE_others.push(dir);
        if (dir !== this.next45 && dir !== this.previous45) {
          this._PRIVATE_nonAdjacent.push(dir);
        }
      }
    });
    Object.freeze(this._PRIVATE_others);
    Object.freeze(this._PRIVATE_nonAdjacent);
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
OrderedDirections.forEach((dir) => dir._initialize(OrderedDirections));

Directions.forEach = Array.prototype.forEach.bind(OrderedDirections);
Object.freeze(Directions);

const CardinalDirections = [Directions.north, Directions.east, Directions.south, Directions.west];
Object.freeze(CardinalDirections);

export { Directions as default, CardinalDirections };
