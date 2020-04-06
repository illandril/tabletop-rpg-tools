/* SPDX-License-Identifier: MIT */

import React from 'react';

import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';

import RandomIcon from '@material-ui/icons/Casino';

import DungeonLayouts from '@illandril/tabletop-rpg-tools/dungeon/dungeon-layout/dungeon-layouts.js';
import RoomLayouts from '@illandril/tabletop-rpg-tools/dungeon/room/room-layouts.js';

import Page from '../../components/page.js';

import Dungeon from './components/dungeon.js';
import SliderInputRow from './components/slider-input-row.js';
import PercentInputRow from './components/percent-input-row.js';
import SelectRow from './components/select-row.js';
import TextRow from './components/text-row.js';

import './page.scss';

export default () => {
  const MAX_SEED = 4294967296;
  const [seed, setSeed] = React.useState(Math.floor(Math.random() * (MAX_SEED + 1)));

  const [dungeonLayout, setDungeonLayout] = React.useState(DungeonLayouts[0].id);
  const [roomLayout, setRoomLayout] = React.useState(RoomLayouts[0].id);

  const MIN_SIZE = 5;
  const MAX_SIZE = 50;
  const [rows, setRows] = React.useState(20);
  const [cols, setCols] = React.useState(20);

  const MIN_ROOM_SIZE = 2;
  function MAX_ROOM_SIZE() {
    return Math.max(MIN_ROOM_SIZE, Math.min(cols, rows));
  }
  const [minRoomSize, setMinRoomSize] = React.useState(2);
  const [maxRoomSize, setMaxRoomSize] = React.useState(5);
  function actualMaxRoomSize() {
    return clamp(maxRoomSize, minRoomSize, MAX_ROOM_SIZE());
  }

  const [corridorStraightness, setCorridorStraightness] = React.useState(50);
  const [deadendRemovalChance, setDeadendRemovalChance] = React.useState(50);

  const MIN_STAIR_COUNT = 0;
  const MAX_STAIR_COUNT = 20;
  const [stairCount, setStairCount] = React.useState(2);

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function percentage(value) {
    if (value <= 0) {
      return 0;
    } else if (value >= 100) {
      return 1;
    } else {
      return value / 100;
    }
  }

  function randomSeed() {
    setSeed(Math.floor(Math.random() * (MAX_SEED + 1)));
  }

  const CONTROL_WIDTH = 2;

  const dungeonSettings = {
    seed: seed,
    dungeonLayout: dungeonLayout,
    roomLayout: roomLayout,
    rows: clamp(rows, MIN_SIZE, MAX_SIZE),
    cols: clamp(cols, MIN_SIZE, MAX_SIZE),
    minRoomSize: clamp(minRoomSize, MIN_ROOM_SIZE, MAX_ROOM_SIZE()),
    maxRoomSize: actualMaxRoomSize(),
    corridorStraightness: percentage(corridorStraightness),
    deadendRemovalChance: percentage(deadendRemovalChance),
    stairCount: clamp(stairCount, MIN_STAIR_COUNT, MAX_STAIR_COUNT),
  };
  console.log('Redraw page');

  return (
    <Page className="dungeon-page">
      <Paper elevation={3} className="dungeon-form">
        <TextRow
          id="seed"
          label="Seed"
          type="number"
          value={seed}
          setValue={setSeed}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="randomize seed" onClick={randomSeed}>
                  <RandomIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <SelectRow
          id="dungeon-layout"
          label="Dungeon Layout"
          options={DungeonLayouts}
          value={dungeonLayout}
          setValue={setDungeonLayout}
        />
        <SliderInputRow
          id="width"
          label="Width"
          value={cols}
          setValue={setCols}
          min={MIN_SIZE}
          max={MAX_SIZE}
          step={1}
        />
        <SliderInputRow
          id="height"
          label="Height"
          value={rows}
          setValue={setRows}
          min={MIN_SIZE}
          max={MAX_SIZE}
          step={1}
        />
        <SelectRow
          id="room-layout"
          label="Room Layout"
          options={RoomLayouts}
          value={roomLayout}
          setValue={setRoomLayout}
        />
        <SliderInputRow
          id="min-room-size"
          label="Minimum Room Size"
          value={minRoomSize}
          setValue={setMinRoomSize}
          min={MIN_ROOM_SIZE}
          max={MAX_ROOM_SIZE()}
          step={1}
        />
        <SliderInputRow
          id="max-room-size"
          label="Maximum Room Size"
          value={actualMaxRoomSize()}
          setValue={setMaxRoomSize}
          min={MIN_ROOM_SIZE}
          max={MAX_ROOM_SIZE()}
          step={1}
        />
        <PercentInputRow
          id="corridor-straightness"
          label="Corridor Straightness"
          value={corridorStraightness}
          setValue={setCorridorStraightness}
        />
        <PercentInputRow
          id="deadend-removal"
          label="Deadend Removal"
          value={deadendRemovalChance}
          setValue={setDeadendRemovalChance}
        />
        <SliderInputRow
          id="stair-count"
          label="Stair Count"
          value={stairCount}
          setValue={setStairCount}
          min={MIN_STAIR_COUNT}
          max={MAX_STAIR_COUNT}
          step={1}
        />
      </Paper>
      <Dungeon dungeonSettings={dungeonSettings} />
    </Page>
  );
};
