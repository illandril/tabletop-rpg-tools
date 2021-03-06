/* SPDX-License-Identifier: MIT */

import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

import ListItemLink from './list-item-link-internal';

import MainPages from '../pages/main-pages';

import metadata from '../metadata.js';

const useStyles = makeStyles((theme) => ({
  spacer: {
    flexGrow: 1,
  },
  menuText: {
    paddingRight: theme.spacing(1),
  },
}));

const MenuDrawer = ({ closeMenu }) => {
  const classes = useStyles();
  return (
    <List>
      <ListItemLink to="/" onClick={closeMenu}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText className={classes.menuText} primary="Home" />
      </ListItemLink>
      {MainPages.map((item) => (
        <ListItemLink key={item.path} to={item.path} onClick={closeMenu}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText className={classes.menuText} primary={item.name} />
        </ListItemLink>
      ))}
    </List>
  );
};

MenuDrawer.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};

const AppLayout = () => {
  const classes = useStyles();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open menu"
            onClick={handleToggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{metadata.name}</Typography>
          <div className={classes.spacer} />
          {MainPages.map(
            (item) =>
              item.icon && (
                <IconButton
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  alt={item.name}
                  title={item.name}
                >
                  {item.icon}
                </IconButton>
              )
          )}
          <IconButton
            edge="end"
            component="a"
            target="_blank"
            rel="external"
            href="https://github.com/illandril/tabletop-rpg-tools"
            color="inherit"
            alt="GitHub repository"
            title="GitHub repository"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav aria-label="menu">
        <Drawer
          variant="temporary"
          anchor="left"
          open={menuOpen}
          onClose={handleToggleMenu}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <MenuDrawer closeMenu={closeMenu} />
        </Drawer>
      </nav>
    </>
  );
};

export default AppLayout;
