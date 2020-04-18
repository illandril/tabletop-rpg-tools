/* SPDX-License-Identifier: MIT */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import Header from './components/header.js';
import Footer from './components/footer.js';
import ExternalLink from './components/link-external.js';
import PageLoader from './components/page-loader.js';

import HomePage from './pages/home/';
import DungeonPage from './pages/dungeon/';
import DicePage from './pages/dice/';
import NotFoundPage from './pages/404/';
import OpenGamesLicensePage from './pages/ogl/';
import ThanksPage from './pages/thanks/';
import FifthEditionRoutes from './pages/5e/routes.js';

import styles from './index.module.scss';

function PageContents() {
  return (
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
    </React.Suspense>
  );
}

function ThemeCSSVariables({ theme }) {
  return (
    <style>
      {`
  :root {
    --theme-spacing: ${theme.spacing(1)}px;
    --color-primary: ${theme.palette.primary.main};
    --color-primary-light: ${theme.palette.primary.light};
    --color-primary-dark: ${theme.palette.primary.dark};
    --color-primary-contrast: ${theme.palette.primary.contrastText};
    --color-secondary: ${theme.palette.secondary.main};
    --color-secondary-light: ${theme.palette.secondary.light};
    --color-secondary-dark: ${theme.palette.secondary.dark};
    --color-secondary-contrast: ${theme.palette.secondary.contrastText};
  }`}
    </style>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeCSSVariables theme={theme} />
        <Router>
          <Header />
          <Paper elevation={4} className={styles.notice}>
            This site is currently under construction, and is an "as time permits" side project.
            Expect intermittent, unannounced updates with substantial changes, occasionally
            completely breaking everything. Feel free to create new issues in{' '}
            <ExternalLink color="inherit" href="https://github.com/illandril/tabletop-rpg-tools">
              this site's GitHub repository
            </ExternalLink>{' '}
            if you encounter any issues or have feature requests.
          </Paper>
          <PageContents />
          <Footer />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// When ready for adding service worker... https://bit.ly/CRA-PWA
// import * as serviceWorker from './serviceWorker';
// serviceWorker.register();
