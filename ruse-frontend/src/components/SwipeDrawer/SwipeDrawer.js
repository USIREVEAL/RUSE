import { Divider, FormControl, Grid, Link, MenuItem, Select, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import LanguageIcon from '@material-ui/icons/Language';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  },
  drawerFooter: {
    position: 'fixed',
    bottom: '0',
    width: 'inherit',
    "& div": {
      margin: '10px 0',
    }
  }
}));

const SwipeDrawer = () => {
  const classes = useStyles();

  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState('en');

  const openSettings = useSelector(st => st.settingsReducer.openSettings);
  const value = useSelector(st => st.settingsReducer.tab);

  const dispatch = useDispatch();

  const setOpenSettings = useCallback(
    data => {
      dispatch(actions.setOpenSettings(data));
    },
    [dispatch],
  );

  const setTab = useCallback(
    data => {
      dispatch(actions.setTab(data));
    },
    [dispatch],
  );

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenSettings(open);
  };

  const handleChange = (e) => {
    const lang = e.target.value;
    e.preventDefault();
    setLang(lang)
    i18n.changeLanguage(lang)
  };

  const handleTabs = (event, newValue) => {
    setTab(newValue);
  };

  const list = (anchor) => (
    <div
      style={{ backgroundColor: "#1a1a1d", height: '100%', color: '#950740' }}
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <div className={classes.drawerTitle}>
        <LanguageIcon color='secondary' /> <span style={{padding: '0 20px'}}>Language</span>
      </div>
      <Divider variant='middle' className={classes.drawerDivider} />
      <FormControl margin='dense' variant="outlined" className={classes.formControl}>
        <Select
          value={lang}
          className={classes.select}
          onChange={handleChange}
        >
          <MenuItem value='en'><span role='img' aria-label='england'>🇬🇧 - EN</span></MenuItem>
          <MenuItem value='it'><span role='img' aria-label='italy'>🇮🇹 - IT</span></MenuItem>
          <MenuItem value='fr'><span role='img' aria-label='france'>🇫🇷 - FR</span></MenuItem>
          <MenuItem value='de'><span role='img' aria-label='germany'>🇩🇪 - DE</span></MenuItem>
        </Select>
      </FormControl>
      <Tabs 
        value={value} 
        orientation='vertical' 
        indicatorColor="primary" 
        onChange={handleTabs} 
      >
        <Tab label={t('first')} />
        <Tab label={t('second')} />
      </Tabs>
      <div className={classes.drawerFooter}>
        <Divider variant='middle' className={classes.drawerDivider} />
        <Grid container direction="column" alignContent='center'>
        <Grid item style={{marginTop: '5px'}}>
          <Link href='https://reveal.si.usi.ch/' color='inherit'>
            <img src='Logo-REVEAL1.png' width='128px' alt='REVEAL'></img>
          </Link>
        </Grid>
        <Grid item>
          <Link href='https://si.usi.ch/' color='inherit'>
            <img src='Logo-SI.png' width='128px' alt='Software Institute'></img>
          </Link>  
        </Grid>
        <Grid item>
          <Link href='https://www.conservatorio.ch/it/scuola-universitaria' color='inherit'>
            <img src='Logo-CSI.png' width='128px' alt='Conservatorio della Svizzera Italiana'></img>  
          </Link>
        </Grid>
        <Grid item>
          {"Copyright © "} {new Date().getFullYear()}
        </Grid>
      </Grid>
      </div>
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
