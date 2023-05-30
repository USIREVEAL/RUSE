import { TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
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

const HexagonTimeout = () => {
  const classes = useStyles();
  const timeout = useSelector(st => st.settingsArtist.timeout);
  //const { t } = useTranslation();
  
  const dispatch = useDispatch();

  const setUpdateTimeout = useCallback(
    data => {
      dispatch(actions.setUpdateTimeout(data));
    },
    [dispatch],
  );

  const handleChange = (e) => {
    setUpdateTimeout(e.target.value);
  }

  return (
    <div className={classes.box}>
      <div className={classes.textFieldCont}>
            <Typography color="primary">
              Update Timeout
            </Typography>
            <CssTextField
              value={timeout}
              color="primary"
              label="Timeout"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => handleChange(e)}
            />
          </div>
    </div>
  )
}

export default HexagonTimeout;