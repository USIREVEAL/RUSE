import { TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { inputHexagons } from '../../globals';
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

const HexagonBounds = () => {
  const classes = useStyles();
  const bounds = useSelector(st => st.settingsArtist.bounds);
  const { t } = useTranslation();
  const data = ['first', 'second'];
  
  const dispatch = useDispatch();

  const setBounds = useCallback(
    data => {
      dispatch(actions.setBounds(data));
    },
    [dispatch],
  );

  const handleChange = (e, chart, set, type) => {
    const newArray = [];
    const newValue = type === 'measureUnit' ? e.target.value : parseInt(e.target.value);
    for (let i = 0; i < bounds[chart].length; i++) {
        if ( i === set ) {
          bounds[chart][i][type] = newValue;
          newArray.push(bounds[chart][i])
        } else {
          newArray.push(bounds[chart][i]);
        }
    }
    setBounds({chart: chart, bounds: newArray});
  }

  return (
      data.map((hexagon, idx) => (
        <div key={idx} className={classes.box}>
          {
            inputHexagons[hexagon].map((el, index) => (
              <div key={index} className={classes.textFieldCont}>
                <Typography color="primary">
                  {t(el.name.low)} - {t(el.name.top)}
                </Typography>
                <CssTextField
                  value={bounds[hexagon][index].min}
                  color="primary"
                  label="Min. value"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  onChange={(e) => handleChange(e, hexagon, index, 'min')}
                />
                <CssTextField
                  value={bounds[hexagon][index].max}
                  color="primary"
                  label="Max. value"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  onChange={(e) => handleChange(e, hexagon, index, 'max')}
                />
                <CssTextField
                  value={bounds[hexagon][index].measureUnit}
                  color="primary"
                  label="Measure Unit"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  onChange={(e) => handleChange(e, hexagon, index, 'measureUnit')}
                />
              </div>
            ))
          }
        </div>
      ))
  )
}

export default HexagonBounds;