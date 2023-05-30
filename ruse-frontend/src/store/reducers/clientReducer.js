const initialState = {
    clientType: '',
    connected: false,
    loading: true,
    eCode: -1,
    level: -1,
    error: {
      status: false,
      msg: '',
    },
  };
  
  const clientReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case 'SET_ECODE':
        return {
          ...state,
          eCode: payload
        };
      case 'SET_ERROR':
        return {
          ...state,
          error: payload
        };
      case 'CONNECT':
        return {
          ...state,
          clientType: payload,
          loading: false,
        };
      case 'SET_CONNECTED':
        return {
          ...state,
          connected: payload,
        };
      case 'SET_LEVEL':
        return {
          ...state,
          level: payload
        };
      case 'CONNECT_FAILED':
        return {
          ...state,
          connected: false
        };
      default:
        return state;
    }
  };
  
  export default clientReducer;