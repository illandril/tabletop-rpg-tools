/* SPDX-License-Identifier: MIT */

import { createMuiTheme } from '@material-ui/core/styles';
import metadata from './metadata.js';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: metadata.colors.primary,
    },
    secondary: {
      main: metadata.colors.secondary,
    },
    background: {
      default: metadata.colors.background,
    },
  },
});

export default theme;
