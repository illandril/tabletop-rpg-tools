/* SPDX-License-Identifier: MIT */

import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import HelpOnIcon from '@material-ui/icons/Help';
import HelpOffIcon from '@material-ui/icons/HelpOutline';

import DiceBag from '@illandril/tabletop-rpg-tools/dice/dice-bag';

import Page from '../../components/page.js';

import RollWithValue from '../../components/dice/roll-with-value.js';

import D2 from './images/d2.svg';
import D4 from './images/d4.svg';
import D6 from './images/d6.svg';
import D8 from './images/d8.svg';
import D10 from './images/d10.svg';
import D12 from './images/d12.svg';
import D20 from './images/d20.svg';
import D20A from './images/d20A.svg';
import D20D from './images/d20D.svg';
import D100 from './images/d100.svg';
import DF from './images/dF.svg';

const useStyles = makeStyles((theme) => ({
  page: {
    textAlign: 'center',
  },
  diceBag: {
    '& svg': {
      width: 48,
      height: 48,
    },
  },
  diceForm: {
    margin: `${theme.spacing(1)}px 0`,
    '& > *': {
      verticalAlign: 'middle',
    },
  },
  diceNotationInput: {
    maxWidth: 150,
  },
  help: {
    textAlign: 'left',
    maxWidth: 700,
    margin: `${theme.spacing(1)}px auto`,
    '& dt': {
      fontWeight: 'bold',
    },
    '& dd': {
      margin: 0,
    },
    '& dd + dt': {
      marginTop: theme.spacing(1),
    },
  },
  rolls: {
    display: 'inline-block',
    margin: '0 auto',
    textAlign: 'left',
  },
  diceHistory: {
    paddingLeft: '0.4em',
    fontSize: '0.8em',
    opacity: 0.75,
  },
}));

const DICE = [
  { alt: 'd2', roll: 'd2', icon: D2, coin: true },
  { alt: 'd4', roll: 'd4', icon: D4 },
  { alt: 'd6', roll: 'd6', icon: D6 },
  { alt: 'd8', roll: 'd8', icon: D8 },
  { alt: 'd10', roll: 'd10', icon: D10 },
  { alt: 'd12', roll: 'd12', icon: D12 },
  { alt: 'd20', roll: 'd20', icon: D20 },
  { alt: 'd20 w/ advantage', roll: '2d20kh1', icon: D20A },
  { alt: 'd20 w/ disadvantage', roll: '2d20kl1', icon: D20D },
  { alt: 'd100', roll: 'd100', icon: D100 },
  { alt: 'Fudge/Fate Dice', roll: 'dF', icon: DF },
];
const MAX_HISTORY = 10;

const diceBag = new DiceBag();

export default function DicePage() {
  const classes = useStyles();
  const [lastRoll, setLastRoll] = React.useState('');
  const [lastRollError, setLastRollError] = React.useState(false);
  const [rollData, setRollData] = React.useState(null);
  const [history, setHistory] = React.useState([]);
  const [showHelp, setShowHelp] = React.useState(false);

  function roll(roll) {
    setLastRoll(roll);
    setLastRollError(false);
    let newRollData;
    try {
      newRollData = diceBag.roll(roll);
    } catch (e) {
      setLastRollError(true);
      e.cause && console.error(e.cause);
      console.error(e);
    }
    if (newRollData) {
      if (rollData) {
        const newHistory = [rollData, ...history];
        while (newHistory.length >= MAX_HISTORY) {
          newHistory.pop();
        }
        setHistory(newHistory);
      }
      setRollData(newRollData);
    }
  }

  function handleInput(event) {
    setLastRoll(event.target.value);
    setLastRollError(false);
  }

  function rollInput(event) {
    roll(lastRoll);
    event.preventDefault();
    return false;
  }

  function toggleHelp() {
    setShowHelp(!showHelp);
  }

  const diceIcons = DICE.map((item) => {
    const DieIcon = item.icon;
    const clickHandler = () => roll(item.roll);
    return (
      <IconButton
        key={item.roll}
        color="primary"
        aria-label={'Roll ' + item.alt}
        onClick={clickHandler}
      >
        <DieIcon />
      </IconButton>
    );
  });

  return (
    <Page className={classes.page} title="Dice Roller">
      <div className={classes.diceBag}>{diceIcons}</div>
      <form className={classes.diceForm} onSubmit={rollInput}>
        <TextField
          label="Dice Notation"
          variant="outlined"
          size="small"
          className={classes.diceNotationInput}
          value={lastRoll}
          error={lastRollError}
          onChange={handleInput}
        />
        <IconButton onClick={toggleHelp} aria-label="Dice Notation Help">
          {showHelp && <HelpOnIcon />}
          {!showHelp && <HelpOffIcon />}
        </IconButton>
        <Button variant="outlined" color="primary" onClick={rollInput}>
          Roll
        </Button>
      </form>
      {showHelp && (
        <div className={classes.help}>
          <Typography variant="h6">Dice Notation Help</Typography>
          <dl>
            <dt>{`dX`}</dt>
            <dd>{`Roll 1 die with X sides. Example: "d6" rolls one six-sided die.`}</dd>
            <dt>{`NdX`}</dt>
            <dd>{`Roll N dice with X sides. Example: "2d6" rolls two six-sided dice.`}</dd>
            <dt>{`NdF`}</dt>
            <dd>{`Roll N "fate" or "fudge" dice (a dice with an equal number of +, -, and = sides).`}</dd>
            <dt>{`X`}</dt>
            <dd>{`A static value of X. Example: "5" gives a value of five.`}</dd>
            <dt>{`Arithmetic (+, -, etc)`}</dt>
            <dd>{`Any of the above values can be combined using + (addition), - (subtraction), * (multiplication), / (division), % (modulus), or ^ (exponent), following PEMDAS rules. Examples: 1d20+5 rolls one twenty-sided dice, and adds five to the result; 2^1d6 rolls one six-sided dice, and raises two to the power of the result; etc.`}</dd>
            <dt>{`NdXkhY`}</dt>
            <dd>{`Roll N dice with X sides, keeping the highest Y dice. Example: 2d20kh1 rolls two twenty-sided dice, keeping the highest value.`}</dd>
            <dt>{`NdXklY`}</dt>
            <dd>{`Roll N dice with X sides, keeping the lowest Y dice. Example: 2d20kl1 rolls two twenty-sided dice, keeping the lowest value.`}</dd>
            <dt>{`NdX!`}</dt>
            <dd>{`Roll N dice with X sides, "exploding" maximum value rolls. Example: 2d6! rolls two six-sided dice. If any of the rolls are equal to six, an additional six-sided die is rolled (repeating if that is also a six).`}</dd>
            <dt>{`NdX!Y`}</dt>
            <dd>{`Same as NdX!, except the "exploding" happens if the value is equal to Y.`}</dd>
            <dt>{`NdX!>Y`}</dt>
            <dd>{`Same as NdX!, except the "exploding" happens if the value is greater than Y.`}</dd>
            <dt>{`NdX!<Y`}</dt>
            <dd>{`Same as NdX!, except the "exploding" happens if the value is less than Y.`}</dd>
            <dt>{`floor(E)`}</dt>
            <dd>{`Rounds the result down. Example: floor(3d6/3) will roll three six-sided die, divide the total by three, rounding down.`}</dd>
            <dt>{`ceil(E)`}</dt>
            <dd>{`Rounds the result up. Example: ceil(3d6/3) will roll three six-sided die, divide the total by three, rounding up.`}</dd>
            <dt>{`round(E)`}</dt>
            <dd>{`Rounds the result using round-half-up. Example: round(2d6/3) will roll three six-sided die, divide the total by three, rounding down if the decimal is less than 0.5 and up if the decimal is 0.5 or greater.`}</dd>
            <dt>{`Not Yet Supported`}</dt>
            <dd>{`Future support for re-rolling dice is already planned (both continuous re-rolling, and using the re-rolled value regardless). If there are any other types of dice rolls you would like support for, please open an issue on the GitHub page.`}</dd>
            <dt>{`Experiencing problems?`}</dt>
            <dd>{`If you have any difficulty using this, please open an issue on the GitHub page.`}</dd>
          </dl>
        </div>
      )}
      <div className={classes.rolls}>
        <div className={classes.lastRoll}>
          {rollData && <RollWithValue rollResult={rollData} />}
        </div>
        <div className={classes.diceHistory}>
          {history.map((rollData) => (
            <RollWithValue key={rollData.id} rollResult={rollData} />
          ))}
        </div>
      </div>
    </Page>
  );
}
