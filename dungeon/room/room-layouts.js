/* SPDX-License-Identifier: MIT */

import { PackedRoomLayout } from './room-layout-packed.js';
import { ScatteredRoomLayout } from './room-layout-scattered.js';

/**
 * A mapping between a RoomLayout implementation and its user-friendly name
 */
class LayoutType {
  #name;
  #type;
  constructor(name, type) {
    this.#name = name;
    this.#type = type;
    Object.freeze(this);
  }

  get name() { return this.#name; }

  /**
   * Create a new RoomLayout instance for this type
   */
  create() { return new this.#type(); }
}

/**
 * A list of all supported RoomLayout implementations
 */
const RoomLayouts = [
  new LayoutType('Scattered', ScatteredRoomLayout),
  new LayoutType('Packed', PackedRoomLayout),
];
Object.freeze(RoomLayouts);

export { RoomLayouts };
