/* SPDX-License-Identifier: MIT */

import { MaskEllipse, MaskRectangle, MaskPolygon } from './layout-mask-shapes.js';
import DungeonLayout from './dungeon-layout.js';

const DungeonLayouts = [
  new DungeonLayout('std', 'Standard (◼)', null),
  new DungeonLayout('diamond', 'Diamond (♦)', [
    new MaskPolygon([
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5],
    ]),
  ]),
  new DungeonLayout(
    'box',
    'Box (◻)',
    [new MaskRectangle(0, 0, 1, 1)],
    [new MaskRectangle(1 / 3, 1 / 3, 1 / 3, 1 / 3)]
  ),
  new DungeonLayout('plus', 'Cross (✚)', [
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
  new DungeonLayout('dagger', 'Dagger (✝)', [
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
  new DungeonLayout('round', 'Round (●)', [new MaskEllipse(0, 0, 1, 1)]),
  new DungeonLayout(
    'donut',
    'Donut (○)',
    [new MaskEllipse(0, 0, 1, 1)],
    [new MaskEllipse(0.3, 0.3, 0.4, 0.4)]
  ),
  new DungeonLayout('saltire', 'Saltire (☓)', [
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
  new DungeonLayout('hexH', 'Hexagon (Horizontal ⬣)', [
    new MaskPolygon([
      [1, 0.5],
      [0.75, 0],
      [0.25, 0],
      [0, 0.5],
      [0.25, 1],
      [0.75, 1],
    ]),
  ]),
  new DungeonLayout('hexV', 'Hexagon (Vertical ⬢)', [
    new MaskPolygon([
      [0.5, 1],
      [0, 0.75],
      [0, 0.25],
      [0.5, 0],
      [1, 0.25],
      [1, 0.75],
    ]),
  ]),
  new DungeonLayout('pentagon', 'Pentagon (⬟)', [
    new MaskPolygon([
      [0.5, 0.0],
      [0.0, 0.4],
      [0.2, 1.0],
      [0.8, 1.0],
      [1.0, 0.4],
    ]),
  ]),
  new DungeonLayout('star', 'Star (★)', [
    new MaskPolygon([
      [0.5, 0.0],
      [0.2, 1.0],
      [1.0, 0.4],
      [0.0, 0.4],
      [0.8, 1.0],
    ]),
  ]),
  new DungeonLayout('T', 'Letter T', [
    new MaskPolygon([
      [0, 0],
      [1, 0],
      [1, 1 / 3],
      [2 / 3, 1 / 3],
      [2 / 3, 1],
      [1 / 3, 1],
      [1 / 3, 1 / 3],
      [0, 1 / 3],
    ]),
  ]),
  new DungeonLayout('L', 'Letter L', [
    new MaskPolygon([
      [0, 0],
      [1 / 3, 0],
      [1 / 3, 2 / 3],
      [1, 2 / 3],
      [1, 1],
      [0, 1],
    ]),
  ]),
  new DungeonLayout('U', 'Letter U', [
    new MaskPolygon([
      [0, 0],
      [1 / 3, 0],
      [1 / 3, 2 / 3],
      [2 / 3, 2 / 3],
      [2 / 3, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ]),
  ]),
  new DungeonLayout('H', 'Letter H', [
    new MaskPolygon([
      [0, 0],
      [1 / 3, 0],
      [1 / 3, 1 / 3],
      [2 / 3, 1 / 3],
      [2 / 3, 0],
      [1, 0],
      [1, 1],
      [2 / 3, 1],
      [2 / 3, 2 / 3],
      [1 / 3, 2 / 3],
      [1 / 3, 1],
      [0, 1],
    ]),
  ]),
  new DungeonLayout('I', 'Letter I', [
    new MaskPolygon([
      [0, 0],
      [0, 1 / 3],
      [1 / 3, 1 / 3],
      [1 / 3, 2 / 3],
      [0, 2 / 3],
      [0, 1],
      [1, 1],
      [1, 2 / 3],
      [2 / 3, 2 / 3],
      [2 / 3, 1 / 3],
      [1, 1 / 3],
      [1, 0],
    ]),
  ]),
];

Object.freeze(DungeonLayouts);

export default DungeonLayouts;
