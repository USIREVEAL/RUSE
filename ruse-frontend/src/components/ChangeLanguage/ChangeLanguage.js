import { IconButton } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import LanguageIcon from '@material-ui/icons/Language';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import useStyles from './ChangeLanguageStyle';

const ChangeLanguage = () => {
  const classes = useStyles();
  const openSettings = useSelector(st => st.settingsReducer.openSettings);
  const anchorRef = React.useRef(null);

  const dispatch = useDispatch();

  const setOpenSettings = useCallback(
    data => {
      dispatch(actions.setOpenSettings(data));
    },
    [dispatch],
  );

  const handleToggle = () => {
    setOpenSettings((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenSettings(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenSettings(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openSettings);
  React.useEffect(() => {
    if (prevOpen.current === true && openSettings === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openSettings;
  }, [openSettings]);

  return (
    <div className={classes.root}>
      <div>
        <IconButton 
            ref={anchorRef}
            aria-controls={openSettings ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
        >
            <LanguageIcon />
        </IconButton>
        <Popper open={openSettings} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={openSettings} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>EN</MenuItem>
                    <MenuItem onClick={handleClose}>IT</MenuItem>
                    <MenuItem onClick={handleClose}>FR</MenuItem>
                    <MenuItem onClick={handleClose}>DE</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default ChangeLanguage;
