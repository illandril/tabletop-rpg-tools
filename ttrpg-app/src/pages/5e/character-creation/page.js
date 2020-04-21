/* SPDX-License-Identifier: MIT */

import React from 'react';

import DiceBag from '@illandril/tabletop-rpg-tools/dice/dice-bag';

import Page from '../../../components/page.js';

import Rolls from '../../../components/dice/rolls.js';

const diceBag = new DiceBag();

export default function CharacterCreationPage() {
  const [diceList, setDiceList] = React.useState(
    'Click one of the buttons to generate attribute values.'
  );

  const roll = (dice) => {
    setDiceList([
      diceBag.roll(dice),
      diceBag.roll(dice),
      diceBag.roll(dice),
      diceBag.roll(dice),
      diceBag.roll(dice),
      diceBag.roll(dice),
    ]);
  };
  const roll3d6 = () => {
    roll('3d6');
  };
  const roll4d6 = () => {
    roll('4d6kh3');
  };
  const standardArray = () => {
    setDiceList(<div>Standard Array: 15, 14, 13, 12, 10, 8</div>);
  };
  const pointBuy = () => {
    setDiceList(
      <div>
        <div>Total Points: 27</div>
        <div>15 = 9 Points</div>
        <div>14 = 7 Points</div>
        <div>13 = 5 Points</div>
        <div>12 = 4 Points</div>
        <div>11 = 3 Points</div>
        <div>10 = 2 Points</div>
        <div>9 = 1 Point</div>
        <div>8 = 0 Points</div>
      </div>
    );
  };

  return (
    <Page title="5e Character Creation" maxWidth="md">
      <button onClick={roll3d6}>3d6</button>
      <button onClick={roll4d6}>4d6, drop lowest</button>
      <button onClick={standardArray}>Standard Array</button>
      <button onClick={pointBuy}>Point Buy</button>
      <div>
        {(diceList && Array.isArray(diceList) && <Rolls rollResults={diceList} />) || diceList}
      </div>
    </Page>
  );
}
