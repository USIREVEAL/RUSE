import { Button } from '@material-ui/core';
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { closeEvent, getUpdateArtist, getUpdateFromTimeout, onUpdateInterval } from '../../socketAPI';
import * as actions from '../../store/actions';
import useStyles from './ArtistDataStyles';
import GeneralControls from "./GeneralControls";
import HexagonControlAxes from "./HexagonControlAxes";

const ArtistData = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const eCode = useSelector(st => st.clientReducer.eCode);


  const setArtistRatios = useCallback(
    data => {
      dispatch(actions.setArtistRatios(data));
    },
    [dispatch],
  );

  const setECode = useCallback(
    data => {
      dispatch(actions.setECode(data));
    },
    [dispatch],
  );

  const setError = useCallback(
    data => {
      dispatch(actions.setError(data));
    },
    [dispatch],
  );

  const setActive = useCallback(
    data => {
      dispatch(actions.setActive(data));
    },
    [dispatch],
  );

  const setClient = useCallback(
    data => {
      dispatch(actions.setClient(data));
    },
    [dispatch],
  );

  const setData = (ratios) => {
    setArtistRatios(ratios);
    const active = {
      first: [false, false, false],
      second: [false, false, false]
    };
    
    setActive({active: active, all: true});
  }

  useEffect(() => {

    getUpdateArtist((err, data) => {
      if (data.status === 'success') {
        setData(data.ratios);
      } else {
        setError({status: true, msg: data.msg})
      }
    })

    onUpdateInterval((err, data) => {
      setActive({active: data.active, all:true });
      const timer = setTimeout(() => getUpdateFromTimeout(eCode), 30000)
      return () => clearTimeout(timer);
    })

  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleCloseEvent = () => {
    localStorage.removeItem('clientType');
    localStorage.removeItem('eCode');
    const date = new Date();

    setECode(-1);
    setClient('');
    closeEvent(eCode, date);
    history.push('/');
  }

  return (
    <div style={{marginTop: '55px'}}>
      <div className={classes.titleCode}>
        {eCode}
        <Button color="primary" onClick={handleCloseEvent}>Close Live Event</Button>
      </div>
      <GeneralControls />
      <div id='dataBars'>
        <HexagonControlAxes chart='first' name='First Hexagon' dir='left' />
        <HexagonControlAxes chart='second' name='Second Hexagon' dir='right' />
      </div>
      {/* <HexagonDistribution /> */}
    </div>
  )
}

  export default ArtistData;