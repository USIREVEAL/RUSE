import ArrowBackwardIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swipe } from 'react-swipe-component';
import { GLOBAL_PARS } from '../../../globals';
import { getUpdateBullets, onEndEventTimeout, onUpdateNextInterval } from '../../../socketAPI';
import * as actions from '../../../store/actions';
import HexagonInput from '../../HexagonInput/HexagonInput';
import SwipeDrawer from '../../SwipeDrawer/SwipeDrawer';

const MobileAudienceClient = () => {

  const dispatch = useDispatch();

  const value = useSelector(st => st.settingsReducer.tab);

  const initialActive = {first: [false, false, false],
    second: [false, false, false]};

  const [active, setActive] = useState(initialActive);

  // const setOpenSettings = useCallback(
  //   data => {
  //     dispatch(actions.setOpenSettings(data));
  //   },
  //   [dispatch],
  // );

  const setAllRatios = useCallback(
    data => {
      dispatch(actions.setAllRatios(data));
    },
    [dispatch],
  );

  const setTab = useCallback(
    data => {
      dispatch(actions.setTab(data));
    },
    [dispatch],
  );

  const onSwipeLeftListener = (event) => {
    const val = Math.abs((value - 1) % 2)
    setTab(val);
  }

  const onSwipeRightListener = (event) => {
    setTab((value + 1) % 2);
  }

  useEffect(() => {
    getUpdateBullets((err, data) => {
      setActive(data.data);
    })

    onUpdateNextInterval((err, data) => {
      setAllRatios(data.ratios);
      setActive(data.active);
      //navigator.vibrate(200);
    });

    onEndEventTimeout((err, data) => {
      setActive(initialActive)
    });
    
  }, [] );// eslint-disable-line react-hooks/exhaustive-deps
  
  const checkActive = actives => actives.every(a => !a);

  return (
    <div>
      {/* <Box display="flex" style={{position: 'absolute', top: '15px', right: '15px', zIndex: '2'}}>
        <IconButton onClick={() => setOpenSettings(true)} aria-label="open settings">
          <TuneIcon color='primary' />
        </IconButton>
      </Box> */}
      <SwipeDrawer />
      {
        value === 0 ?
        <HexagonInput idx='first' actives={active['first']} /> :
        <HexagonInput idx='second' actives={active['second']} />
      }
      <Swipe
        nodeName="div"
        className="test"
        style={{height: GLOBAL_PARS.HEIGHT_SWIPE}}
        onSwipedLeft={onSwipeLeftListener}
        onSwipedRight={onSwipeRightListener}
        detectTouch={true}
      > 
      {
        !checkActive(active['first']) && !checkActive(active['second'])?
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px',}}>
          <ArrowBackwardIosIcon />
          <ArrowForwardIosIcon />
        </div> : null
      }
      </Swipe>
    </div>
  );
}


export default MobileAudienceClient;