import { makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { GLOBAL_PARS } from '../../../globals';
import { addClient, onCloseEvent } from '../../../socketAPI';
import * as actions from '../../../store/actions';
import DesktopAudienceClient from './DesktopAudienceClient';
import MobileAudienceClient from './MobileAudienceClient';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  contHexagon: {
    display: 'flex',
  }
}));

const AudienceClient = () => {
  const {WIDTH_S} = GLOBAL_PARS;
  const classes = useStyles();

  const eCode = useSelector(st => st.clientReducer.eCode);

  const dispatch = useDispatch();

  const setClient = useCallback(
    data => {
      dispatch(actions.setClient(data));
    },
    [dispatch],
  );

  const setConnected = useCallback(
    data => {
      dispatch(actions.setConnected(data));
    },
    [dispatch],
  );

  const setECode = useCallback(
    data => {
      dispatch(actions.setECode());
    },
    [dispatch],
  );

  useEffect(() => {
    if (eCode >= 0) {
      const client = 'audience';
      setClient(client);
      addClient({status: client}, eCode);

      let html = window.document.getElementsByTagName('html')[0];
      setConnected(true);
      html.style.overflow = 'hidden'; 
    }

    onCloseEvent((err, data) => {
      setECode(-1);
    });
  });

  return (
    <>
      {
        eCode >= 0 ?
          <div className={classes.root}>
            {
              WIDTH_S >= 1080 ?
                <DesktopAudienceClient /> :
                <MobileAudienceClient />
            }
          </div> :
          <Redirect to='/' />
      }
    </>
  );
}


export default AudienceClient;