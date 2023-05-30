import { Checkbox, Divider, makeStyles, Typography } from "@material-ui/core";
import FlashOffIcon from '@material-ui/icons/FlashOff';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { inputHexagons } from '../../globals';
import { getUpdateActive, getUpdateComposition, updateActive, updateEvents } from '../../socketAPI';
import * as actions from '../../store/actions';
import HeatmapBar from "./HeatmapBar";
import Timer from "./Timer";

const useStyles = dir => makeStyles((theme) => ({
  barContainer: {
    margin: '17.5px 0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: dir === 'left' ? 'row' : 'row-reverse',
  },
  divider: {
    backgroundColor: theme.palette.primary.main,
  },
  activated: {
    backgroundColor: theme.palette.third.main
  }
}));

const HexagonControlAxes = ({
    chart, name, dir
} : Props) => {
  const dispatch = useDispatch();
  const bounds = useSelector(st => st.settingsArtist.bounds);
  const ratios = useSelector(st => st.settingsArtist.ratios);
  const active = useSelector(st => st.settingsArtist.active);
  const events = useSelector(st => st.settingsArtist.events);
  const compose = useSelector(st => st.settingsArtist.compose);

  const composition = useSelector(st => st.settingsArtist.composition);
  const eCode = useSelector(st => st.clientReducer.eCode);

  const setComposition = useCallback(
    data => {
      dispatch(actions.setComposition(data));
    },
    [dispatch],
  );

  const clearComposition = useCallback(
    data => {
      dispatch(actions.clearComposition(data));
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

  const setError = useCallback(
    data => {
      dispatch(actions.setError(data));
    },
    [dispatch],
  );

  useEffect(() => {
    if(!compose) {
      clearComposition();
    }

    getUpdateComposition((err, data) => {
      if (data.status === 'success') {
        setEvents({events: data.data, all: true});
      } else {
        setError({status: true, msg: data.msg})
      }
    })

    getUpdateActive((err, data) => {
      if (data.status === 'success') {
        setActive({active: data.data, all:true});
      } else {
        setError({status: true, msg: data.msg});
      }
    })
    
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const data = inputHexagons;
  const classes = useStyles(dir)();

  const handleBullet = (e ,chart, idx, type) => {
    const newArray = [];
    const oldArray = type === 'A' ? active[chart] : events[chart];

    for (let i = 0; i < oldArray.length; i++) {
        if (i === idx ) {
          newArray.push(!oldArray[idx]);
        } else {
          newArray.push(oldArray[i]);
        }
    }

    if (type === 'A') {
      if (!compose) {
        updateActive({chart: chart, set: idx, value: e.target.checked}, false, eCode);
        setActive({chart: chart, active: newArray});
      }
    } else {
      if (!compose) {
        //setUpdateTimeout(0);
        updateEvents({chart: chart, set: idx, value: e.target.checked}, eCode);
        setEvents({chart: chart, events: newArray});
      }
    }

    if (compose && type === 'E') {
      let newState = {...composition};
      newState[chart][idx] = e.target.checked;
      setComposition(newState)
    }
  };

  return (
      <div>
        <Typography color="primary" variant="h6" align={dir}>
          {name}
        </Typography>
        <Divider className={classes.divider} />
        <View style={{alignItems: 'center',}}>
          {
            ratios[chart] !== undefined ? ratios[chart].map( (el, index) => (
              <div key={index} className={classes.barContainer}>
                <Timer active={events[chart][index]} />
                <Checkbox 
                  checked={events[chart][index]}
                  className={composition[chart][index] && compose ? classes.activated : null}
                  onChange={(e) => handleBullet(e,chart, index, 'E')} 
                  icon={<PlayArrowOutlinedIcon color='primary' />} 
                  checkedIcon={<PauseCircleOutlineOutlinedIcon color='primary' />}
                />
                <Checkbox 
                  checked={active[chart][index]} 
                  onChange={(e) => handleBullet(e,chart, index, 'A')} 
                  icon={<FlashOffIcon color='primary' />} checkedIcon={<FlashOnIcon />} 
                />
                <HeatmapBar 
                  names={data[chart][index].name} 
                  ratio={el.ratio} 
                  direction='h' 
                  event={events[chart][index]}
                  bounds={bounds[chart][index]} 
                  set={index}
                  chart={chart}
                />
              </div>
            )) : null
          }
        </View>
      </div>
  )
}

  export default HexagonControlAxes;