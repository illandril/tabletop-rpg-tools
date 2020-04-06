/* SPDX-License-Identifier: MIT */

import Room from './room.js';

export default class RoomLayout {
  _PRIVATE_minRoomSize = 2;
  _PRIVATE_maxRoomSize = 5;

  get minRoomSize() {
    return this._PRIVATE_minRoomSize;
  }
  set minRoomSize(minRoomSize) {
    if (!Number.isInteger(minRoomSize) || minRoomSize < 2) {
      throw new Error('minRoomSize must an integer greater than 1');
    }
    this._PRIVATE_minRoomSize = minRoomSize;
  }

  get maxRoomSize() {
    return Math.max(this.minRoomSize, this._PRIVATE_maxRoomSize);
  }
  set maxRoomSize(maxRoomSize) {
    if (!Number.isInteger(maxRoomSize) || maxRoomSize < 2) {
      throw new Error('$1');
    }
    this._PRIVATE_maxRoomSize = maxRoomSize;
  }

  get roomSizeRange() {
    return this.maxRoomSize - this.minRoomSize;
  }

  placeRooms(rng, dungeon) {
    throw new Error('$1');
  }

  placeRandomSizedRoom(rng, dungeon, north, west) {
    const room = this.generateRandomSizedRoom(rng, dungeon, north, west);
    return room.place(dungeon);
  }

  generateRandomSizedRoom(rng, dungeon, north, west) {
    const width = this.randomRoomSize(rng, dungeon.tileCols, west);
    const east = west + width - 1;

    const height = this.randomRoomSize(rng, dungeon.tileRows, north);
    const south = north + height - 1;

    return new Room(north, east, south, west);
  }

  randomRoomSize(rng, dungeonSize, dungeonDistance) {
    const maxExtraSize = Math.max(0, dungeonSize - this.minRoomSize - dungeonDistance);
    const sizeRandomness = Math.min(maxExtraSize, this.roomSizeRange) + 1;
    return rng.int(sizeRandomness) + this.minRoomSize;
  }
}
