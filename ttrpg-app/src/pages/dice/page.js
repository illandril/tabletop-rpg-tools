/* SPDX-License-Identifier: MIT */

import React from 'react';

import clsx from 'clsx';

import { CSSTransitionGroup } from 'react-transition-group';

import IconButton from '@material-ui/core/IconButton';

import DiceBag from '@illandril/tabletop-rpg-tools/dice/dice-bag';

import Page from '../../components/page.js';

import D2 from './images/d2.svg';
import D4 from './images/d4.svg';
import D6 from './images/d6.svg';
import D8 from './images/d8.svg';
import D10 from './images/d10.svg';
import D12 from './images/d12.svg';
import D20 from './images/d20.svg';
import D100 from './images/d100.svg';

import './page.scss';

const DICE = [
  { alt: 'd2', roll: 'd2', icon: D2, coin: true },
  { alt: 'd4', roll: 'd4', icon: D4 },
  { alt: 'd6', roll: 'd6', icon: D6 },
  { alt: 'd8', roll: 'd8', icon: D8 },
  { alt: 'd10', roll: 'd10', icon: D10 },
  { alt: 'd12', roll: 'd12', icon: D12 },
  { alt: 'd20', roll: 'd20', icon: D20 },
  { alt: 'd100', roll: 'd100', icon: D100 },
];
const MAX_HISTORY = 10;

const diceBag = new DiceBag();

export default () => {
  const [rollData, setRollData] = React.useState(null);
  const [history, setHistory] = React.useState([]);

  function roll(rollItem) {
    return function() {
      const newRollData = {
        key: rollData ? rollData.key+1 : 0,
        roll: diceBag.roll(rollItem.roll),
        item: rollItem,
      };
      if ( rollData ) {
        const newHistory = [rollData, ...history];
        while ( newHistory.length > MAX_HISTORY ) {
          newHistory.pop();
        }
        setHistory(newHistory)
      }
      setRollData(newRollData);
    };
  }

  const rollDisplay = rollData && (
    <div key={rollData.key} className="dice-roll">
      <span className={clsx('dice-roll-dice', rollData.item.coin && 'dice-roll-coin')}>
        <img alt={rollData.item.alt} src={rollData.item.icon}/>
      </span>
      <span className="dice-roll-equals"> = </span>
      <span className="dice-roll-result">{rollData.roll.total}</span>
    </div>
  );

  const diceIcons = DICE.map((item, i) => (
    <IconButton key={item.roll} aria-label={'Roll ' + item.alt} onClick={roll(item)}>
      <img src={item.icon}/>
    </IconButton>
  ));

  return (
    <Page>
      <div className="dice-bag">
        {diceIcons}
      </div>
      <CSSTransitionGroup
        transitionName="animate"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={1}
      >
        {rollDisplay}
      </CSSTransitionGroup>
      <div className="dice-history">
      {history.map((rollData) => (
        <div key={rollData.key} className="dice-roll">
          <span className={clsx('dice-roll-dice', rollData.item.coin && 'dice-roll-coin')}>
            <img alt={rollData.item.alt} src={rollData.item.icon}/>
          </span>
          <span className="dice-roll-equals"> = </span>
          <span className="dice-roll-result">{rollData.roll.total}</span>
        </div>
      ))}
      </div>
    </Page>
  );
};
