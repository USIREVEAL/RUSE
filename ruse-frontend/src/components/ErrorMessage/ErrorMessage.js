import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorMessage = () => {
  const dispatch = useDispatch();
  const error = useSelector(st => st.clientReducer.error);

  const setError = useCallback(
    data => {
      dispatch(actions.setError(data));
    },
    [dispatch],
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  return (
    <Snackbar open={error.status} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
          {error.msg}
      </Alert>
    </Snackbar>
  )
}

  export default ErrorMessage;