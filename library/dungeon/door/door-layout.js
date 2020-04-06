/* SPDX-License-Identifier: MIT */

import Directions from '../directions.js';
import DoorTypesTable from './door-types-table-standard.js';

export default class DoorLayout {
  constructor() {
    Object.freeze(this);
  }

  placeDoors(rng, dungeon) {
    dungeon.rooms.forEach((room) => {
      const doorOptions = getDoorCellOptions(rng, dungeon, room);
      if (doorOptions.length === 0) {
        return;
      }
      // Between 1/10 and 1/4 of the walls should have doors
      const halfWallArea = room.widthInTiles + room.heightInTiles;
      const minDoors = Math.max(1, Math.round(halfWallArea / 5));
      const maxDoors = Math.max(2, Math.round(halfWallArea / 2));
      const nOpens = rng.normalInt(minDoors, maxDoors + 1);
      for (let i = 0; i < nOpens; i++) {
        const door = doorOptions[i];
        if (!door || door.cell.isDoor) {
          continue;
        }
        door.cell.doorType = DoorTypesTable.roll(rng);
        room.doors.push(door);
      }
    });
  }

  fixDoors(dungeon) {
    dungeon.rooms.forEach((room) => {
      const badDoors = [];
      room.doors.forEach((door) => {
        // If any door isn't part of a corridor yet, it's a door to nothing
        if (!door.cell.isOpenSpace) {
          badDoors.push(door);
          door.cell.doorType = null;
        }
      });
      badDoors.forEach((badDoor) => {
        room.doors.splice(room.doors.indexOf(badDoor), 1);
      });
    });
  }
}

function getDoorCellOptions(rng, dungeon, room) {
  const doorCellOptionList = [];
  for (let c = room.westTileCol; c <= room.eastTileCol; c++) {
    addValidDoorCell(doorCellOptionList, dungeon.tile(room.northTileRow, c), Directions.north);
    addValidDoorCell(doorCellOptionList, dungeon.tile(room.southTileRow, c), Directions.south);
  }
  for (let r = room.northTileRow; r <= room.southTileRow; r++) {
    addValidDoorCell(doorCellOptionList, dungeon.tile(r, room.westTileCol), Directions.west);
    addValidDoorCell(doorCellOptionList, dungeon.tile(r, room.eastTileCol), Directions.east);
  }
  rng.shuffleInPlace(doorCellOptionList);
  return doorCellOptionList;
}

function addValidDoorCell(doorCellOptionList, roomCell, direction) {
  const doorCell = getValidDoorCell(roomCell, direction);
  if (doorCell) {
    doorCellOptionList.push({ roomCell: roomCell, cell: doorCell, direction: direction });
  }
}

function getValidDoorCell(roomCell, direction) {
  const doorCell = roomCell.edge(direction);
  if (!doorCell || doorCell.isBlocked || doorCell.isDoor) {
    return null;
  }
  const exitCell = doorCell.edge(direction);
  if (!exitCell || exitCell.isBlocked || exitCell.room === roomCell.room) {
    return null;
  }
  return doorCell;
}
