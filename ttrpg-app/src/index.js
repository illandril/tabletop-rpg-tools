/* SPDX-License-Identifier: MIT */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import theme from './theme';
import Header from './components/header.js';
import Footer from './components/footer.js';
import ExternalLink from './components/link-external.js';
import PageLoader from './components/page-loader.js';

import Routes from './routes.js';

const useStyles = makeStyles((theme) => ({
  notice: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    backgroundColor: 'rgba(255, 200, 0, 0.5)',
    color: '#000',
    borderRadius: 0,
  },
}));

const Layout = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Paper elevation={4} className={classes.notice}>
        {`This site is currently under construction, and is an "as time permits" side project. Expect intermittent, unannounced updates with substantial changes, occasionally completely breaking everything. Feel free to create new issues in `}
        <ExternalLink color="inherit" href="https://github.com/illandril/tabletop-rpg-tools">
          {`this site's GitHub repository`}
        </ExternalLink>
        {` if you encounter any issues or have feature requests.`}
      </Paper>
      <React.Suspense fallback={<PageLoader />}>
        <Routes />
      </React.Suspense>
      <Footer />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// When ready for adding service worker... https://bit.ly/CRA-PWA
// import * as serviceWorker from './serviceWorker';
// serviceWorker.register();
