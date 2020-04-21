/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import DungeonFactory from '@illandril/tabletop-rpg-tools/dungeon/dungeon-factory.js';
import BuiltDungeon from '@illandril/tabletop-rpg-tools/dungeon/dungeon/dungeon.js';
import DungeonLayouts from '@illandril/tabletop-rpg-tools/dungeon/dungeon-layout/dungeon-layouts.js';
import RoomLayouts from '@illandril/tabletop-rpg-tools/dungeon/room/room-layouts.js';

import DungeonImagerReact from './dungeon-imager-react.js';

const useStyles = makeStyles((theme) => ({
  display: {
    padding: theme.spacing(2),
  },
  loading: {
    padding: theme.spacing(4),
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <Typography component="div" color="textSecondary" variant="h4" className={classes.loading}>
      Generating Dungeon...
    </Typography>
  );
};

const Loaded = ({ dungeon }) => {
  const classes = useStyles();
  return (
    <div className={classes.display}>
      <DungeonImagerReact dungeon={dungeon} />
    </div>
  );
};

Loaded.propTypes = {
  dungeon: PropTypes.instanceOf(BuiltDungeon).isRequired,
};

export default class Dungeon extends React.Component {
  state = {
    dungeon: null,
  };

  rebuildDungeon() {
    this.setState({ dungeon: false });
    setTimeout(() => {
      const dungeonSettings = this.props.dungeonSettings;

      const dungeonFactory = new DungeonFactory(dungeonSettings.seed);
      dungeonFactory.rows = dungeonSettings.rows;
      dungeonFactory.cols = dungeonSettings.cols;

      let dungeonLayoutObj = DungeonLayouts[0];
      DungeonLayouts.some((layout) => {
        if (layout.id === dungeonSettings.dungeonLayout) {
          dungeonLayoutObj = layout;
          return true;
        }
        return false;
      });
      dungeonFactory.dungeonLayout = dungeonLayoutObj;

      let roomLayoutObj = RoomLayouts[0];
      RoomLayouts.some((layout) => {
        if (layout.id === dungeonSettings.roomLayout) {
          roomLayoutObj = layout;
          return true;
        }
        return false;
      });
      dungeonFactory.roomLayout = roomLayoutObj.create();
      dungeonFactory.roomLayout.minRoomSize = dungeonSettings.minRoomSize;
      dungeonFactory.roomLayout.maxRoomSize = dungeonSettings.maxRoomSize;
      dungeonFactory.corridorLayout.corridorStraightness = dungeonSettings.corridorStraightness;
      dungeonFactory.corridorLayout.stairCount = dungeonSettings.stairCount;
      dungeonFactory.corridorLayout.deadendRemovalChance = dungeonSettings.deadendRemovalChance;

      const dungeonBuildRequest = dungeonFactory.createDungeon().then((dungeon) => {
        if (this._dungeonBuildRequest === dungeonBuildRequest) {
          this._dungeonBuildRequest = null;
          this.setState({ dungeon: dungeon });
        }
      });
      this._dungeonBuildRequest = dungeonBuildRequest;
    }, 1);
  }

  componentDidMount() {
    this.rebuildDungeon();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.dungeonSettings) !== JSON.stringify(this.props.dungeonSettings)) {
      this.rebuildDungeon();
    }
  }

  componentWillUnmount() {
    this._dungeonBuildRequest = null;
  }

  render() {
    if (!this.state.dungeon) {
      return <Loading />;
    }
    return <Loaded dungeon={this.state.dungeon} />;
  }
}

Dungeon.propTypes = {
  dungeonSettings: PropTypes.shape({
    seed: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    dungeonLayout: PropTypes.string.isRequired,
    roomLayout: PropTypes.string.isRequired,
    minRoomSize: PropTypes.number.isRequired,
    maxRoomSize: PropTypes.number.isRequired,
    corridorStraightness: PropTypes.number.isRequired,
    stairCount: PropTypes.number.isRequired,
    deadendRemovalChance: PropTypes.number.isRequired,
  }).isRequired,
};
