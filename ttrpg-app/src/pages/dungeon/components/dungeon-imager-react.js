/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import Dungeon from '@illandril/tabletop-rpg-tools/dungeon/dungeon/dungeon.js';

import '@illandril/tabletop-rpg-tools/dungeon/imaging/html/style.css';

/**
 * The prefix to use for all CSS classes
 */
const CSS_PREFIX = 'dungeonjs-';

export default function DungeonImagerReact({ dungeon }) {
  const rows = [];
  for (let row = 0; row < dungeon.cellRows; row++) {
    const cells = [];
    for (let col = 0; col < dungeon.cellCols; col++) {
      const cell = dungeon.cell(row, col);

      let title = null;
      let className = CSS_PREFIX + 'cell';
      className += ' ' + CSS_PREFIX + 'cell';
      if (cell.isBlocked) {
        className += ' ' + CSS_PREFIX + 'blocked';
      }
      if (cell.isTile) {
        className += ' ' + CSS_PREFIX + 'tile';
      }
      if (cell.isOpenSpace) {
        className += ' ' + CSS_PREFIX + 'openspace';
      }
      if (cell.isCorridor) {
        className += ' ' + CSS_PREFIX + 'corridor';
      }
      if (cell.isDeadEnd) {
        className += ' ' + CSS_PREFIX + 'deadEnd';
      }

      if (cell.isDoor) {
        className += ' ' + CSS_PREFIX + 'doorspace';
        className += ' ' + CSS_PREFIX + 'door-' + cell.doorType.key;
        title = cell.doorType.name;
      }
      if (cell.isStairs) {
        className += ' ' + CSS_PREFIX + 'stairs';
        className += ' ' + CSS_PREFIX + 'stairs-' + cell.stairDirection;
        title = 'Stairs ' + cell.stairDirection;
      }
      cells.push(<td key={`c${col}`} className={className} title={title} />);
    }
    rows.push(<tr key={`r${row}`}>{cells}</tr>);
  }
  return (
    <table className={CSS_PREFIX + 'dungeon'}>
      <tbody>{rows}</tbody>
    </table>
  );
}

DungeonImagerReact.propTypes = {
  dungeon: PropTypes.instanceOf(Dungeon).isRequired,
};
