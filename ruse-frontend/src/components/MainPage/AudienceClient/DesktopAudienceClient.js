import { makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUpdateBullets, onEndEventTimeout, onUpdateNextInterval } from '../../../socketAPI';
import * as actions from '../../../store/actions';
import HexagonInput from '../../HexagonInput/HexagonInput';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  contHexagon: {
    display: 'flex',
  },
}));

const DesktopAudienceClient = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialActive = {first: [false, false, false],
    second: [false, false, false]};

  const [active, setActive] = useState(initialActive);

  const setAllRatios = useCallback(
    data => {
      dispatch(actions.setAllRatios(data));
    },
    [dispatch],
  );

  useEffect(() => {
    getUpdateBullets((err, data) => {
      setActive(data.data);
    })

    onUpdateNextInterval((err, data) => {
      setAllRatios(data.ratios);
      setActive(data.active);
      navigator.vibrate(200);
    });

    onEndEventTimeout((err, data) => {
      setActive(initialActive)
    });
    
  }, [] );// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <div className={classes.contHexagon}>
        <HexagonInput idx='first' actives={active['first']} />
        <HexagonInput idx='second' actives={active['second']} />
      </div>
    </div>
  );
}


export default DesktopAudienceClient;