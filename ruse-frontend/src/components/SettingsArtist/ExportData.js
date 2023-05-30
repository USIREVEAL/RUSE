import Button from '@material-ui/core/Button';
import React, { useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import useStyles from './SettingArtistStyles';

const ExportData = () => {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const eCode = useSelector(st => st.clientReducer.eCode);

  const exportData = useCallback(
    (data) => {
      dispatch(actions.exportData(data));
    },
    [dispatch],
  );

  const handleExport = (e) => {
    exportData(eCode);
  }

  return (
    <div className={classes.box}>
      <div className={classes.textFieldCont}>
            <Button color="primary" onClick={handleExport}>
                Export
            </Button>
          </div>
    </div>
  )
}

export default ExportData;