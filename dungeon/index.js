function emptyNode( node ) {
  while ( node.hasChildNodes() ) {
    node.removeChild( node.lastChild );
  }
}
import { DungeonFactory } from './dungeon-factory.js';
import { DungeonLayouts } from './dungeon-layout/dungeon-layouts.js';
import { RoomLayouts } from './room/room-layouts.js';
import { dungeonToHTML } from './imaging/html/dungeon-imager-html.js';
import { dungeonToSVG } from './imaging/image/dungeon-imager-svg.js';


const container = document.getElementById( 'dungeonContainer' );

const seedInput = document.getElementById( 'seed' );

const randomSeedButton = document.getElementById( 'randomSeed' );
randomSeedButton.addEventListener( 'click', function() {
  seedInput.value = Math.floor( Math.random() * (seedInput.max+1) );
  generate();
}, false /* useCapture */ );
seedInput.addEventListener( 'input', generate, false /* useCapture */ );

const rowsInput = document.getElementById( 'rows' );
const colsInput = document.getElementById( 'cols' );
const roomMinInput = document.getElementById( 'roomMin' );
const roomMinDisplay = document.getElementById( 'roomMinDisplay' );
const roomMaxInput = document.getElementById( 'roomMax' );
const roomMaxDisplay = document.getElementById( 'roomMaxDisplay' );

function clampInput( input, opt_overrideMin ) {
  return Math.max( (opt_overrideMin || input.min), Math.min( input.max, (input.value|0) ) );
}

roomMinInput.addEventListener( 'input', updateRoomMinMaxDisplay, false /* useCapture */ );
roomMaxInput.addEventListener( 'input', updateRoomMinMaxDisplay, false /* useCapture */ );
rowsInput.addEventListener( 'input', updateRoomMinMaxDisplay, false /* useCapture */ );
colsInput.addEventListener( 'input', updateRoomMinMaxDisplay, false /* useCapture */ );
function updateRoomMinMaxDisplay() {
  const rows = clampInput( rowsInput );
  const cols = clampInput( colsInput );
  roomMinInput.max = roomMaxInput.max = Math.min( rows, cols );

  const roomMin = clampInput( roomMinInput );
  roomMinInput.value = roomMin;
  const roomMax = clampInput( roomMaxInput, roomMin );
  roomMaxInput.value = roomMax;

  emptyNode( roomMinDisplay );
  roomMinDisplay.appendChild( document.createTextNode( roomMin ) );
  emptyNode( roomMaxDisplay );
  roomMaxDisplay.appendChild( document.createTextNode( roomMax ) );
}
updateRoomMinMaxDisplay();


function addOptions( select, namedOptions ) {
  namedOptions.forEach( namedOption => {
    const option = document.createElement( 'option' );
    option.value = namedOption.name;
    option.appendChild( document.createTextNode( namedOption.name ) );
    select.appendChild( option );
  } );
}
const dungeonLayoutInput = document.getElementById( 'dungeonLayout' );
addOptions( dungeonLayoutInput, DungeonLayouts );

const roomLayoutInput = document.getElementById( 'roomLayout' );
addOptions( roomLayoutInput, RoomLayouts );

const corridorLayoutInput = document.getElementById( 'corridorLayout' );


const deadendRemovalPercentInput = document.getElementById( 'deadendRemovalPercent' );
const deadendRemovalPercentDisplay = document.getElementById( 'deadendRemovalPercentDisplay' );
deadendRemovalPercentInput.addEventListener( 'input', updateDeadendPercentDisplay, false /* useCapture */ );
function updateDeadendPercentDisplay() {
  emptyNode( deadendRemovalPercentDisplay );
  deadendRemovalPercentDisplay.appendChild( document.createTextNode( clampInput( deadendRemovalPercentInput ) + '%' ) );
}
updateDeadendPercentDisplay();

const stairCountInput = document.getElementById( 'stairCount' );
const stairCountDisplay = document.getElementById( 'stairCountDisplay' );
stairCountInput.addEventListener( 'input', updateStairCountDisplay, false /* useCapture */ );
function updateStairCountDisplay() {
  emptyNode( stairCountDisplay );
  stairCountDisplay.appendChild( document.createTextNode( clampInput( stairCountInput ) ) );
}
updateStairCountDisplay();


dungeonLayoutInput.addEventListener( 'input', generate, false /* useCapture */ );
rowsInput.addEventListener( 'input', generate, false /* useCapture */ );
colsInput.addEventListener( 'input', generate, false /* useCapture */ );
roomLayoutInput.addEventListener( 'input', generate, false /* useCapture */ );
roomMinInput.addEventListener( 'input', generate, false /* useCapture */ );
roomMaxInput.addEventListener( 'input', generate, false /* useCapture */ );
corridorLayoutInput.addEventListener( 'input', generate, false /* useCapture */ );
deadendRemovalPercentInput.addEventListener( 'input', generate, false /* useCapture */ );
stairCountInput.addEventListener( 'input', generate, false /* useCapture */ );


function generate() {
  emptyNode( container );

  const seed = seedInput.value|0;
  const rows = clampInput( rowsInput );
  const cols = clampInput( colsInput );
  const roomMin = clampInput( roomMinInput );
  const roomMax = clampInput( roomMaxInput );
  const dungeonLayout = dungeonLayoutInput.value;
  const roomLayout = roomLayoutInput.value;
  const corridorLayout = corridorLayoutInput.value;
  const deadendRemovalPercent = clampInput( deadendRemovalPercentInput );
  const stairCount = clampInput( stairCountInput );
  const opts = {
    'seed': seed,
    'n_rows': rows * 2 + 1,
    'n_cols': cols * 2 + 1,
    'dungeon_layout': dungeonLayout,
    'room_min': roomMin * 2 - 1, // minimum room size
    'room_max': roomMax * 2 - 1, // maximum room size
    'room_layout': roomLayout,
    'corridor_layout': corridorLayout,
    'remove_deadends': deadendRemovalPercent,
    'add_stairs': stairCount, // number of stairs
  };
  const dungeonFactory = new DungeonFactory( seed );
  dungeonFactory.rows = rows;
  dungeonFactory.cols = cols;
  dungeonFactory.dungeonLayout = dungeonLayout;

  const selectedRoomLayoutName = roomLayout;
  let roomLayoutObj = RoomLayouts[0];
  RoomLayouts.some( layout => {
    if ( layout.name === selectedRoomLayoutName ) {
      roomLayoutObj = layout;
      return true;
    }
  });
  dungeonFactory.roomLayout = roomLayoutObj.create();
  dungeonFactory.roomLayout.minRoomSize = roomMin;
  dungeonFactory.roomLayout.maxRoomSize = roomMax;

  let chanceToTryStraightFirst;
  if ( opts['corridor_layout'] === 'Labyrinth' ) {
    chanceToTryStraightFirst = 0;
  } else if ( opts['corridor_layout'] === 'Straight' ) {
    chanceToTryStraightFirst = 1;
  } else {
    chanceToTryStraightFirst = 0.5;
  }
  dungeonFactory.corridorLayout.chanceToTryStraightFirst = chanceToTryStraightFirst;
  dungeonFactory.corridorLayout.stairCount = stairCount;
  dungeonFactory.corridorLayout.deadendRemovalChance = deadendRemovalPercent / 100;

  const dungeon = dungeonFactory.createDungeon();
  container.appendChild( dungeonToHTML( dungeon ) );
}

randomSeedButton.click();
