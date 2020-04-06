/* SPDX-License-Identifier: MIT */

import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DiceIcon from '@material-ui/icons/Casino';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RandomRollTable from '@illandril/tabletop-rpg-tools/dice/random-roll-table.js';
import RandomNumberGenerator from '@illandril/tabletop-rpg-tools/dice/random-number-generator.js';

import Page from '../../../components/page.js';

import Confusion from '../../../data/srd/5.1/spells/confusion.js';
import Reincarnate from '../../../data/srd/5.1/spells/reincarnate.js';

import './page.scss';

const spells = [Confusion, Reincarnate];
const dice = new RandomNumberGenerator();

const DescriptionLine = ({ line }) => {
  if (line instanceof RandomRollTable) {
    const [rollResult, setRollResult] = React.useState(false);
    const roll = function() {
      setRollResult(line.rollResult(dice));
    };
    const resultValue = rollResult ? rollResult.diceValue : '';
    const resultText = rollResult ? rollResult.tableResult : '';
    let lastEnd = 0;
    return (
      <div className="roll-table">
        <div className="header dice">d{line.totalWeight}</div>
        <div className="header name">{line.name}</div>
        <div className="result">
          <IconButton aria-label="roll table" onClick={roll}>
            <DiceIcon />
          </IconButton> {resultValue}<br/>
          {resultText}
        </div>
        {line.options.map((option, i) => {
          const start = lastEnd + 1;
          const end = start + (option.weight - 1);
          const range = start + ((start === end) ? '' : ('-' + end));
          lastEnd = end;
          return (
            <React.Fragment key={i}>
              <div className="dice">
                {range}
              </div>
              <div className="name">{option.value}</div>
            </React.Fragment>
          );
        })}
      </div>
    );
  } else {
    return <div>{line}</div>;
  }
};

const Spell = ({ spell }) => (
  <div className="spell">
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

export default () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Page className="fifth-edition-spell-tables" maxWidth="md">
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
};
