/* SPDX-License-Identifier: MIT */

/**
 * The prefix to use for all CSS classes
 */
const CSS_PREFIX = 'dungeonjs-';

/**
 * Converts a Dungeon into HTML
 */
function dungeonToHTML(dungeon) {
  const container = document.createElement('table');
  container.classList.add(CSS_PREFIX + 'dungeon');
  let lastRow = -1;
  let rowContainer;
  dungeon.forEachCell(cell => {
    if (cell.cellRow !== lastRow) {
      lastRow = cell.cellRow;
      rowContainer = document.createElement('tr');
      container.appendChild(rowContainer);
    }
    const cellContainer = document.createElement('td');
    rowContainer.appendChild(cellContainer);
    cellContainer.classList.add(CSS_PREFIX + 'cell');
    if (cell.isBlocked) {
      cellContainer.classList.add(CSS_PREFIX + 'blocked');
    }
    if (cell.isTile) {
      cellContainer.classList.add(CSS_PREFIX + 'tile');
    }
    if (cell.isOpenSpace) {
      cellContainer.classList.add(CSS_PREFIX + 'openspace');
    }
    if (cell.isCorridor) {
      cellContainer.classList.add(CSS_PREFIX + 'corridor');
    }
    if (cell.isDeadEnd) {
      cellContainer.classList.add(CSS_PREFIX + 'deadEnd');
    }
    if (cell.isDoor) {
      cellContainer.classList.add(CSS_PREFIX + 'doorspace');
      cellContainer.classList.add(CSS_PREFIX + 'door-' + cell.doorType.key);
      cellContainer.title = cell.doorType.name;
    }
    if (cell.isStairs) {
      cellContainer.classList.add(CSS_PREFIX + 'stairs');
      cellContainer.classList.add(CSS_PREFIX + 'stairs-' + cell.stairDirection);
      cellContainer.title = 'Stairs ' + cell.stairDirection;
    }
  });
  return container;
}

export { dungeonToHTML };
