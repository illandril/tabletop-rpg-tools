/* SPDX-License-Identifier: MIT */

import React from 'react';
import ListItem from '@material-ui/core/ListItem';

export default function ListItemLinkExternal(props) {
  return <ListItem button component="a" target="_blank" rel="external" {...props} />;
}
