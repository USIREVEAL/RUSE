import { IconButton } from '@material-ui/core';
import BlurOffIcon from '@material-ui/icons/BlurOff';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import FlashOffIcon from '@material-ui/icons/FlashOff';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateActive, updateComposition } from "../../socketAPI";
import * as actions from '../../store/actions';
import useStyles from './ArtistDataStyles';

const GeneralControls = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const compose = useSelector(st => st.settingsArtist.compose);
  const composition = useSelector(st => st.settingsArtist.composition);
  const eCode = useSelector(st => st.clientReducer.eCode);

  const setCompose = useCallback(
    data => {
      dispatch(actions.setCompose(data));
    },
    [dispatch],
  );

  const clearComposition = useCallback(
    data => {
      dispatch(actions.clearComposition(data));
    },
    [dispatch],
  );

  const [allActive, setAllActive] = useState(false);

  const handleAllBullets = (e) => {
    const val = !allActive;
    updateActive(val, true, eCode);
    setAllActive(val);
  };

  const handleCompose = (e) => {
    setCompose(!compose);
  }

  const handleSendCompose = (e) => {
    updateComposition(composition, eCode);
    setCompose(!compose);
  }

  const handleCancelCompose = (e) => {
    clearComposition();
    setCompose(!compose);
  }

  return (
    <>
      <div className={classes.generalControlsRoot} >
        <IconButton
            variant="contained"
            color="primary"
            onClick={(e) => handleAllBullets(e)} 
        > 
            {allActive ? <FlashOnIcon />  : <FlashOffIcon color='primary' />}
        </IconButton>
        <IconButton
            variant="contained"
            color="primary"
            onClick={(e) => handleCompose(e)} 
        > 
            {compose ? <BlurOnIcon /> : <BlurOffIcon color='primary' />}
        </IconButton>
        { compose ?
          <div>
            <IconButton
                variant="contained"
                color="primary"
                onClick={(e) => handleSendCompose(e)} 
            >
              <DoneIcon />
            </IconButton> 
            <IconButton
                variant="contained"
                color="primary"
                onClick={(e) => handleCancelCompose(e)} 
            >
              <ClearIcon />
            </IconButton>
          </div> : null
        }
      </div>
    </>
  )
}

export default GeneralControls;