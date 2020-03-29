/* SPDX-License-Identifier: MIT */

import { MaskEllipse, MaskRectangle, MaskPolygon } from './layout-mask-shapes.js'
import { Mask } from './layout-mask.js'
import { DungeonLayout } from './dungeon-layout.js'

const DungeonLayouts = [
  new DungeonLayout('None', null),
  new DungeonLayout('Diamond', [
    new MaskPolygon([
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5]
    ]),
  ]),
  new DungeonLayout('Box', [
    new MaskRectangle(0, 0, 1, 1),
  ], [
    new MaskRectangle(1 / 3, 1 / 3, 1 / 3, 1 / 3),
  ]),
  new DungeonLayout('Cross', [
    new MaskPolygon([
      [1 / 3, 0],
      [2 / 3, 0],
      [2 / 3, 1 / 3],
      [1, 1 / 3],
      [1, 2 / 3],
      [2 / 3, 2 / 3],
      [2 / 3, 1],
      [1 / 3, 1],
      [1 / 3, 2 / 3],
      [0, 2 / 3],
      [0, 1 / 3],
      [1 / 3, 1 / 3],
    ]),
  ]),
  new DungeonLayout('Dagger', [
    new MaskPolygon([
      [1 / 3, 0],
      [2 / 3, 0],
      [2 / 3, 0.25],
      [1, 0.25],
      [1, 0.5],
      [2 / 3, 0.5],
      [2 / 3, 1],
      [1 / 3, 1],
      [1 / 3, 0.5],
      [0, 0.5],
      [0, 0.25],
      [1 / 3, 0.25],
    ]),
  ]),
  new DungeonLayout('Round', [
    new MaskEllipse(0, 0, 1, 1),
  ]),
  new DungeonLayout('Donut', [
    new MaskEllipse(0, 0, 1, 1),
  ], [
    new MaskEllipse(0.3, 0.3, 0.4, 0.4),
  ]),
  new DungeonLayout('Saltire', [
    new MaskPolygon([
      [0.0, 0.0],
      [0.2, 0.0],
      [0.5, 0.3],
      [0.8, 0.0],
      [1.0, 0.0],
      [1.0, 0.2],
      [0.7, 0.5],
      [1.0, 0.8],
      [1.0, 1.0],
      [0.8, 1.0],
      [0.5, 0.7],
      [0.2, 1.0],
      [0.0, 1.0],
      [0.0, 0.8],
      [0.3, 0.5],
      [0.0, 0.2],
    ]),
  ]),
  new DungeonLayout('Hexagon', [
    new MaskPolygon([
      [1, 0.5],
      [0.75, 0],
      [0.25, 0],
      [0, 0.5],
      [0.25, 1],
      [0.75, 1]
    ]),
  ]),
  new DungeonLayout('Hexagon-V', [
    new MaskPolygon([
      [0.5, 1],
      [0, 0.75],
      [0, 0.25],
      [0.5, 0],
      [1, 0.25],
      [1, 0.75]
    ]),
  ]),
  new DungeonLayout('Pentagon', [
    new MaskPolygon([
      [0.50, 0.00],
      [0.00, 0.40],
      [0.20, 1.00],
      [0.80, 1.00],
      [1.00, 0.40],
    ]),
  ]),
  new DungeonLayout('Star', [
    new MaskPolygon([
      [0.50, 0.00],
      [0.20, 1.00],
      [1.00, 0.40],
      [0.00, 0.40],
      [0.80, 1.00],
    ]),
  ]),
  new DungeonLayout('T', [
    new MaskPolygon([
      [0, 0],
      [1, 0],
      [1, 1 / 3],
      [2 / 3, 1 / 3],
      [2 / 3, 1],
      [1 / 3, 1],
      [1 / 3, 1 / 3],
      [0, 1 / 3]
    ]),
  ]),
  new DungeonLayout('L', [
    new MaskPolygon([
      [0, 0],
      [1 / 3, 0],
      [1 / 3, 2 / 3],
      [1, 2 / 3],
      [1, 1],
      [0, 1]
    ]),
  ]),
];

Object.freeze(DungeonLayouts);

export { DungeonLayouts };
