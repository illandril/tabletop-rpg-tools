/* SPDX-License-Identifier: MIT */

import PackedRoomLayout from './room-layout-packed.js';
import ScatteredRoomLayout from './room-layout-scattered.js';

/**
 * A mapping between a RoomLayout implementation and its user-friendly name
 */
class LayoutType {
  _PRIVATE_id;
  _PRIVATE_name;
  _PRIVATE_type;
  constructor(id, name, type) {
    this._PRIVATE_id = id;
    this._PRIVATE_name = name;
    this._PRIVATE_type = type;
    Object.freeze(this);
  }

  get id() {
    return this._PRIVATE_id;
  }

  get name() {
    return this._PRIVATE_name;
  }

  /**
   * Create a new RoomLayout instance for this type
   */
  create() {
    return new this._PRIVATE_type();
  }
}

/**
 * A list of all supported RoomLayout implementations
 */
const RoomLayouts = [
  new LayoutType('scattered', 'Scattered', ScatteredRoomLayout),
  new LayoutType('packed', 'Packed', PackedRoomLayout),
];
Object.freeze(RoomLayouts);

export default RoomLayouts;
