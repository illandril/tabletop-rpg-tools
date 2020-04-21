/* SPDX-License-Identifier: MIT */

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink } from 'react-router-dom';

export default function ListItemLinkInternal(props) {
  return <ListItem button component={RouterLink} {...props} />;
}
