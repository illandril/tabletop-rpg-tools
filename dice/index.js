function emptyNode(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

const MAX_HISTORY = 20;
const BAG_DICE_SIZE = 48;
const TABLE_DICE_SIZE = 48;
const ROLL_DELAY = 75;

import { DiceBag } from './dice-bag.js';

const diceBag = new DiceBag();

const DICE_SIDES = [2, 4, 6, 8, 10, 12, 20, 100];

const bag = document.getElementById('bag');

const rollDice = document.getElementById('rollDice');
const rollEquals = document.getElementById('rollEquals');
const rollResult = document.getElementById('rollResult');

const history = document.getElementById('history');

DICE_SIDES.forEach(sides => {
  const img = document.createElement('img');
  img.classList.add('dice');
  img.width = BAG_DICE_SIZE;
  img.src = './icons/d' + sides + '.svg';
  bag.appendChild(img);
  img.addEventListener('click', () => {
    const img = document.createElement('img');
    img.classList.add('dice');
    img.width = TABLE_DICE_SIZE;
    img.src = './icons/d' + sides + '.svg';
    emptyNode(rollDice);
    rollDice.appendChild(img);

    emptyNode(rollEquals);
    rollEquals.appendChild(document.createTextNode(' = '));

    emptyNode(rollResult);
    rollResult.appendChild(document.createTextNode('.'));
    setTimeout(() => {
      rollResult.appendChild(document.createTextNode('.'));
      setTimeout(() => {
        rollResult.appendChild(document.createTextNode('.'));
        setTimeout(() => {
          emptyNode(rollResult);
          const roll = diceBag.roll('d' + sides);
          rollResult.appendChild(document.createTextNode(roll.total));
          const historyRow = document.createElement('div');
          historyRow.appendChild(document.createTextNode(roll.rolls + ': ' + roll.total));
          history.insertBefore(historyRow, history.firstChild);
          while( history.childElementCount > MAX_HISTORY) {
            history.removeChild(history.lastChild);
          }
        }, ROLL_DELAY);
      }, ROLL_DELAY);
    }, ROLL_DELAY);
  });
});
