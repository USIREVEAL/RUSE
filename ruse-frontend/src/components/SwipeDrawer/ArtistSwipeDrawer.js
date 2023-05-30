import { Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  drawer: {
    backgroundColor: theme.palette.background.primary,
  },
  fullList: {
    width: 'auto',
  },
  button: {
    padding: 0,
    minWidth: '42px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 'calc(100% - 20px)',
    backgroundColor: theme.palette.background.primary,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
    minWidth: 'calc(100% - 20px)',
    backgroundColor: `${theme.palette.background.primary}!important`,
  },
  drawerTitle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '10px',
    padding: '0 20px'
  },
  drawerDivider: {
    backgroundColor: theme.palette.primary.main,
    height: '2px'
  }
}));

const SwipeDrawer = () => {
  const classes = useStyles();

  const openSettings = useSelector(st => st.settingsArtist.openSettings);
  const value = useSelector(st => st.settingsArtist.tab);

  const dispatch = useDispatch();

  const setArtistOpenSettings = useCallback(
    data => {
      dispatch(actions.setArtistOpenSettings(data));
    },
    [dispatch],
  );

  const setArtistTab = useCallback(
    data => {
      dispatch(actions.setArtistTab(data));
    },
    [dispatch],
  );

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setArtistOpenSettings(open);
  };

  const handleTabs = (event, newValue) => {
    setArtistTab(newValue);
    toggleDrawer(false)
  };

  const list = (anchor) => (
    <div
      style={{ backgroundColor: "#1a1a1d", height: '100%', color: '#950740' }}
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Tabs 
        value={value} 
        orientation='vertical' 
        indicatorColor="primary" 
        onChange={handleTabs} 
      >
        <Tab label='Visualize Data' />
        <Tab label='Settings' />
      </Tabs>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <SwipeableDrawer
              anchor={anchor}
              open={openSettings}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SwipeDrawer;
