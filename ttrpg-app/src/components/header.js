/* SPDX-License-Identifier: MIT */

import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

import ListItemLink from './list-item-link-internal';

import MainPages from '../pages/main-pages';

import metadata from '../metadata.js';

import './header.scss';

const MenuDrawer = ({ closeMenu }) => {
  return (
    <List className="nav-menu">
      <ListItemLink to="/" onClick={closeMenu}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemLink>
      {MainPages.map((item, index) => (
        <ListItemLink key={item.path} to={item.path} onClick={closeMenu}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemLink>
      ))}
    </List>
  );
};

const AppLayout = () => {
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
          <div className="header-spacer" />
          {MainPages.map(
            (item, index) =>
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
