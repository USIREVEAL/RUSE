import { Button, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { updateNextInterval } from "../../socketAPI";
import useStyles from './SettingArtistStyles';

const CssTextField = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiFormLabel-root': {
      color: 'white'
    },
    '& .MuiInputBase-root': {
      color: 'white'
    }
  },
}))(TextField);

const HexagonNextInterval = () => {
  const classes = useStyles();

  const initialState = {first: [false, false, false], second: [false,false,false]};
  const [int, setint] = useState(initialState);
  
  const eCode = useSelector(st => st.clientReducer.eCode);
  const { t } = useTranslation();

  const handlePar = (e, chart, set) => {
    const newInt = {...int};
    const val = parseFloat(e.target.value)
    newInt[chart][set] = Number.isNaN(val) ? false : val;
    setint(newInt);
  }

  const handleNextInt = () => {
    updateNextInterval(int, eCode);
  }

  return (
      <>
        <div className={classes.box}>
          <div className={classes.textFieldCont}>
            <Typography color="primary">
              {t('first_h')}
            </Typography>
            <CssTextField
              color="primary"
              type="number"
              label={`${t('consonance')} - ${t('dissonance')}`}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => handlePar(e, 'first', 0)}
            />
            <CssTextField
              color="primary"
              type="number"
              label={`${t('low-pitch')} - ${t('high-pitch')}`}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => handlePar(e, 'first', 1)}
            />
            <CssTextField
              color="primary"
              type="number"
              label={`${t('dark timbre')} - ${t('bright timbre')}`}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => handlePar(e, 'first', 2)}
            />
          </div>
        </div>
        <div className={classes.box}>
          <div className={classes.textFieldCont}>
            <Typography color="primary">
              {t('second_h')}
            </Typography>
            <CssTextField
              color="primary"
              type="number"
              label={`${t('regular')} - ${t('chaotic')}`}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => handlePar(e, 'second', 0)}
            />
            <CssTextField
              color="primary"
              type="number"
              label={`${t('slow')} - ${t('fast')}`}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => handlePar(e, 'second', 1)}
            />
            <CssTextField
              color="primary"
              type="number"
              label={`${t('monophony')} - ${t('polyphony')}`}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => handlePar(e, 'second', 2)}
            />
          </div>
        </div>
        <div>
          <Button color="primary" onClick={handleNextInt}>Save</Button>
        </div>
      </>
  )
}

export default HexagonNextInterval;