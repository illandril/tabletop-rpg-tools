/* SPDX-License-Identifier: MIT */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import Header from './components/header.js';
import Footer from './components/footer.js';
import PageLoader from './components/page-loader.js';

import HomePage from './pages/home/';
import DungeonPage from './pages/dungeon/';
import DicePage from './pages/dice/';
import NotFoundPage from './pages/404/';
import OpenGamesLicensePage from './pages/ogl/';
import ThanksPage from './pages/thanks/';
import FifthEditionSpellTablesPage from './pages/5e/spell-tables/';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{`
        :root {
          --theme-spacing: `+theme.spacing(1)+`px;
          --color-primary: `+theme.palette.primary.main+`;
          --color-primary-light: `+theme.palette.primary.light+`;
          --color-primary-dark: `+theme.palette.primary.dark+`;
          --color-primary-contrast: `+theme.palette.primary.contrastText+`;
          --color-secondary: `+theme.palette.secondary.main+`;
          --color-secondary-light: `+theme.palette.secondary.light+`;
          --color-secondary-dark: `+theme.palette.secondary.dark+`;
          --color-secondary-contrast: `+theme.palette.secondary.contrastText+`;
        }`}
      </style>
      <Router>
        <Header />
        <React.Suspense fallback={<PageLoader />}>
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
            <Route path="/5e/spell-tables">
              <FifthEditionSpellTablesPage />
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
        </React.Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
