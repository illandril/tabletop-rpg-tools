/* SPDX-License-Identifier: MIT */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home/';
import DungeonPage from './pages/dungeon/';
import DicePage from './pages/dice/';
import FifthEditionRoutes from './pages/5e/routes.js';
import OpenGamesLicensePage from './pages/ogl/';
import ThanksPage from './pages/thanks/';
import NotFoundPage from './pages/404/';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/dungeon">
        <DungeonPage />
      </Route>
      <Route path="/dice">
        <DicePage />
      </Route>
      <Route path="/5e">
        <FifthEditionRoutes />
      </Route>
      <Route path="/ogl">
        <OpenGamesLicensePage />
      </Route>
      <Route path="/thanks">
        <ThanksPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}
