import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import useStyles from './ArtistDataStyles';

const Timer = ({ active }) => {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const compose = useSelector(st => st.settingsArtist.compose);

  useEffect(() => {
      
      if (!active) {
        setTime(0);
        return;
      }
      
      const intervalId = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => clearInterval(intervalId);
  }, [active, time]);

  return (
      <div className={classes.timerRoot}>
        <h1 className={classes.time}>{active && !compose ? time : null}</h1>
      </div>
  );
};

export default Timer;