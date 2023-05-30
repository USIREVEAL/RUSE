import { Avatar, Chip } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateClientsA, getUpdateClientsB, getUpdateClientsI } from '../../socketAPI';
import * as actions from '../../store/actions';
import useStyles from './ArtistDataStyles';

const GeneralInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const beginner = useSelector(st => st.settingsArtist.nBeginner);
  const intermediate = useSelector(st => st.settingsArtist.nIntermediate);
  const advanced = useSelector(st => st.settingsArtist.nAdvanced);

  const setBeginner = useCallback(
    data => {
      dispatch(actions.setBeginner(data));
    },
    [dispatch],
  );

  const setIntermediate = useCallback(
    data => {
      dispatch(actions.setIntermediate(data));
    },
    [dispatch],
  );

  const setAdvanced = useCallback(
    data => {
      dispatch(actions.setAdvanced(data));
    },
    [dispatch],
  );

  useEffect(() => {

    getUpdateClientsB((err, data) => {
      setBeginner(data.data);
    })

    getUpdateClientsA((err, data) => {
      setAdvanced(data.data);
    })

    getUpdateClientsI((err, data) => {
      setIntermediate(data.data);
    })
  }, [beginner, intermediate, advanced]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.box}>
       <Chip avatar={<Avatar>{beginner + intermediate + advanced}</Avatar>} label="Number of Audience" color="primary" />
       <Chip avatar={<Avatar>{beginner}</Avatar>} label="Number of Beginner" color="primary" />
       <Chip avatar={<Avatar>{intermediate}</Avatar>} label="Number of Intermediate" color="primary" />
       <Chip avatar={<Avatar>{advanced}</Avatar>} label="Number of Advanced" color="primary" />
    </div>
  )
}

export default GeneralInfo;