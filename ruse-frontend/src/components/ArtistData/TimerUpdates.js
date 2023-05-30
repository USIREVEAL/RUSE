import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import useStyles from './ArtistDataStyles';

const TimerUpdates = () => {
  const classes = useStyles();
  const timeout = useSelector(st => st.settingsArtist.timeout);
  const initialTime = timeout/1000;
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    if (time === 0) {
      setTime(initialTime);
    }

    return () => clearTimeout(intervalId);
  }, [time, initialTime]);

  return (
      <div className={classes.root}>
        <h1 className={classes.time}>{time}</h1>
      </div>
  );
};

export default TimerUpdates;