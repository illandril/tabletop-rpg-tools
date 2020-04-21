/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import DiceIcon from '@material-ui/icons/Casino';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RandomRollTable from '@illandril/tabletop-rpg-tools/dice/random-roll-table.js';
import RandomNumberGenerator from '@illandril/tabletop-rpg-tools/dice/random-number-generator.js';

import Page from '../../../components/page.js';

import Confusion from '../../../data/srd/5.1/spells/confusion.js';
import Reincarnate from '../../../data/srd/5.1/spells/reincarnate.js';

const useStyles = makeStyles((theme) => ({
  spell: {
    '& > div + div': {
      marginTop: theme.spacing(1),
    },
  },
  rollTable: {
    display: 'grid',
    gridTemplateColumns: 'fit-content(20%) fit-content(40%) fit-content(40%)',
    alignItems: 'stretch',
    '& > :not($result)': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      '&:not($header)': {
        '&:nth-child(4n + 4), &:nth-child(4n + 5)': {
          backgroundColor: theme.palette.secondary.dark,
        },
        '&:nth-child(4n + 6), &:nth-child(4n + 7)': {
          backgroundColor: theme.palette.secondary.light,
        },
      },
    },
  },
  dice: {
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
  },
  result: {
    gridColumn: 3,
    gridRow: '1 / 999',
    fontSize: '1.3em',
    padding: theme.spacing(1),
  },
}));

const spells = [Confusion, Reincarnate];
const dice = new RandomNumberGenerator();

const RollTableLine = ({ line }) => {
  const classes = useStyles();
  const [rollResult, setRollResult] = React.useState(false);
  const roll = () => setRollResult(line.rollResult(dice));
  const resultValue = rollResult ? rollResult.diceValue : '';
  const resultText = rollResult ? rollResult.tableResult : '';
  let lastEnd = 0;
  return (
    <div className={classes.rollTable}>
      <div className={clsx(classes.header, classes.dice)}>d{line.totalWeight}</div>
      <div className={clsx(classes.header, classes.name)}>{line.name}</div>
      <div className={classes.result}>
        <IconButton aria-label="roll table" onClick={roll}>
          <DiceIcon />
        </IconButton>{' '}
        {resultValue}
        <br />
        {resultText}
      </div>
      {line.options.map((option, i) => {
        const start = lastEnd + 1;
        const end = start + (option.weight - 1);
        const range = start + (start === end ? '' : '-' + end);
        lastEnd = end;
        return (
          <React.Fragment key={i}>
            <div className={classes.dice}>{range}</div>
            <div className={classes.name}>{option.value}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

RollTableLine.propTypes = {
  line: PropTypes.instanceOf(RandomRollTable).isRequired,
};

const DescriptionLine = ({ line }) => {
  if (line instanceof RandomRollTable) {
    return <RollTableLine line={line} />;
  } else {
    return <div>{line}</div>;
  }
};

DescriptionLine.propTypes = {
  line: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RandomRollTable)]).isRequired,
};

const Spell = ({ spell }) => {
  const classes = useStyles();

  return (
    <div className={classes.spell}>
      <div>
        <b>Casting Time:</b> {spell.castingTime}
      </div>
      <div>
        <b>Range:</b> {spell.range}
      </div>
      <div>
        <b>Components:</b> {spell.components}
      </div>
      <div>
        <b>Duration:</b> {spell.duration}
      </div>
      {spell.description.map((line, i) => (
        <DescriptionLine key={i} line={line} />
      ))}
    </div>
  );
};

Spell.propTypes = {
  spell: PropTypes.shape({
    castingTime: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
    components: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RandomRollTable)])
    ).isRequired,
  }),
};

export default function SpellTablesPage() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Page className={classes.page} title="5e Spell Tables" maxWidth="md">
      {spells.map((spell) => (
        <ExpansionPanel
          key={spell.name}
          expanded={expanded === spell.name}
          onChange={handleChange(spell.name)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {spell.name}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Spell spell={spell} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Page>
  );
}
