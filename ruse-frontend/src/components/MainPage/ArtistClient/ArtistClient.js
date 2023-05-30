import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { getEventCode, getUpdate, joinEvent, startEvent } from '../../../socketAPI';
import * as actions from '../../../store/actions';
import TabsContainerArtist from '../TabsContainerArtist';

const ArtistClient = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const eCode = useSelector(st => st.clientReducer.eCode);
  const [redirect, setRedirect] = useState(false);

  const setConnected = useCallback(
    data => {
      dispatch(actions.setConnected(data));
    },
    [dispatch],
  );

  const setArtistRatios = useCallback(
    data => {
      dispatch(actions.setArtistRatios(data));
    },
    [dispatch],
  );

  const setActive = useCallback(
    data => {
      dispatch(actions.setActive(data));
    },
    [dispatch],
  );

  const setEvents = useCallback(
    data => {
      dispatch(actions.setEvents(data));
    },
    [dispatch],
  );

  const setClient = useCallback(
    data => {
      dispatch(actions.setClient(data));
    },
    [dispatch],
  );

  const setECode = useCallback(
    data => {
      dispatch(actions.setECode(data));
    },
    [dispatch],
  );

  useEffect(() => {
    if ( localStorage.getItem('clientType') !== 'artist' && !localStorage.getItem('eCode')) {
      startEvent();
    } else {
      joinEvent(999999, 'artist');
    }

    getEventCode((err, data) => {
      setECode(data);
      // set Item in local storage
      localStorage.setItem('clientType', 'artist');
      localStorage.setItem('eCode', data);
      setClient('artist');
      history.push(`/ars`);
    });
    
    let html = window.document.getElementsByTagName('html')[0];
    html.style.overflow = 'initial'; 
    
    getUpdate((err, data) => {
      if (err) return;
      if (data.data.status === 'error') {
        localStorage.removeItem('clientType');
        localStorage.removeItem('eCode');
        setRedirect(true);
      } else {
        setConnected(true);
        setArtistRatios(data.data.ratios);
        setActive({active: data.data.active, all: true});
        setEvents(data.data.events);
      }
    });
  });

  return (
    <>
    {
      eCode >= 0 && !redirect ? 
        <TabsContainerArtist /> :
        <Redirect to='/' />
    }
    </>
  );
}


export default ArtistClient;