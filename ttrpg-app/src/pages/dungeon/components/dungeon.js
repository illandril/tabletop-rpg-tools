/* SPDX-License-Identifier: MIT */

import React from 'react';

import Typography from '@material-ui/core/Typography';

import DungeonFactory from '@illandril/tabletop-rpg-tools/dungeon/dungeon-factory.js';
import DungeonLayouts from '@illandril/tabletop-rpg-tools/dungeon/dungeon-layout/dungeon-layouts.js';
import RoomLayouts from '@illandril/tabletop-rpg-tools/dungeon/room/room-layouts.js';

import DungeonImagerReact from './dungeon-imager-react.js';

import './dungeon.scss';

export default class Dungeon extends React.Component {
  state = {
    dungeon: null,
  };

  rebuildDungeon() {
    this.setState({ dungeon: false });
    setTimeout(()=>{
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
          console.log(new Date().getTime() + ' Dungeon built');
          if (this._dungeonBuildRequest === dungeonBuildRequest) {
            console.log('Dungeon used');
            this._dungeonBuildRequest = null;
            this.setState({ dungeon: dungeon });
          } else {
            console.log(new Date().getTime() + ' Too slow, dungeon not used');
          }
      });
      this._dungeonBuildRequest = dungeonBuildRequest;
    },1);
  }

  componentDidMount() {
    console.log(new Date().getTime() + ' Did mount');
    this.rebuildDungeon();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(new Date().getTime() + ' did update');
    if ( JSON.stringify(prevProps.dungeonSettings) !== JSON.stringify(this.props.dungeonSettings) ) {
      console.log(new Date().getTime() + ' New settings');
      this.rebuildDungeon();
    }
  }

  componentWillUnmount() {
    console.log(new Date().getTime() + ' Unmounting');
    this._dungeonBuildRequest = null;
  }

  render() {
    if (!this.state.dungeon) {
      return (
        <Typography
          component="div"
          color="textSecondary"
          variant="h4"
          className="dungeon-loading"
        >Generating Dungeon...</Typography>
      );
    }
    return (
      <div className="dungeon-display">
        <DungeonImagerReact dungeon={this.state.dungeon} />
      </div>
    );
  }
}
