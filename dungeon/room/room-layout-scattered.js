/* SPDX-License-Identifier: MIT */

import { RoomLayout } from './room-layout.js'

class ScatteredRoomLayout extends RoomLayout {
  placeRooms(rng, dungeon) {
    const dungeonArea = dungeon.tileRows * dungeon.tileCols;
    const bigRoomArea = this.maxRoomSize * this.maxRoomSize;
    const maxBigSizeRooms = Math.floor(dungeonArea / bigRoomArea);
    for (let i = 0; i < maxBigSizeRooms; i++) {
      const tileRow = rng.int(dungeon.tileRows - this.minRoomSize + 1);
      const tileCol = rng.int(dungeon.tileCols - this.minRoomSize + 1);
      this.placeRandomSizedRoom(rng, dungeon, tileRow, tileCol);
    }
  }
}

export { ScatteredRoomLayout };
