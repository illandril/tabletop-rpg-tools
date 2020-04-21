/* SPDX-License-Identifier: MIT */

import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import CharacterCreationPage from './character-creation/';
import SpellTablesPage from './spell-tables/';

export default function FifthEditionRoutes() {
  const match = useRouteMatch();
  const prefix = match.url;
  return (
    <Switch>
      <Route path={prefix + '/character-creation'}>
        <CharacterCreationPage />
      </Route>
      <Route path={prefix + '/spell-tables'}>
        <SpellTablesPage />
      </Route>
    </Switch>
  );
}
