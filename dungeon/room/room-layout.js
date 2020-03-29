/* SPDX-License-Identifier: MIT */

import { Room } from './room.js'

class RoomLayout {
  #minRoomSize = 2;
  #maxRoomSize = 5;

  get minRoomSize() { return this.#minRoomSize; }
  set minRoomSize(minRoomSize) {
    if (!Number.isInteger(minRoomSize) || minRoomSize < 2) {
      throw 'minRoomSize must an integer greater than 1';
    }
    this.#minRoomSize = minRoomSize;
  }

  get maxRoomSize() { return Math.max(this.minRoomSize, this.#maxRoomSize); }
  set maxRoomSize(maxRoomSize) {
    if (!Number.isInteger(maxRoomSize) || maxRoomSize < 2) {
      throw 'maxRoomSize must an integer greater than 1';
    }
    this.#maxRoomSize = maxRoomSize;
  }

  get roomSizeRange() { return this.maxRoomSize - this.minRoomSize; }

  placeRooms(rng, dungeon) {
    throw 'placeRooms was not implemented';
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

export { RoomLayout };
