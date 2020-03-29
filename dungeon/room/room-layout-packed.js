/* SPDX-License-Identifier: MIT */

import { RoomLayout } from './room-layout.js'

class PackedRoomLayout extends RoomLayout {
  placeRooms(rng, dungeon) {
    const lastRow = dungeon.tileRows - this.minRoomSize + 1;
    const lastCol = dungeon.tileCols - this.minRoomSize + 1;
    for (let tileRow = 0; tileRow < lastRow; tileRow++) {
      for (let tileCol = 0; tileCol < lastCol; tileCol++) {
        if (dungeon.tile(tileRow, tileCol).isRoom) {
          continue;
        }
        if ((tileRow === 0 || tileCol === 0) && rng.chance(0.5)) {
          continue;
        }
        this.placeRandomSizedRoom(rng, dungeon, tileRow, tileCol);
      }
    }
  }
}

export { PackedRoomLayout };
