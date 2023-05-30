const initialState = {
    ratios: {
      first: [
        0.8,
        0.8,
        0.8,
      ],
      second: [
        0.8,
        0.8,
        0.8,
      ]
    },
    withDiagonals: true,
    withBarycenter: true
};
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case 'SET_ALL_RATIOS':
        return {
          ...state,
          ratios: payload
        };
      case 'SET_RATIOS':
        const newRatios = {...state.ratios};
        newRatios[payload.chart] =  payload.ratio;

        return {
          ...state,
          ratios: newRatios
        };
      case 'SET_BULLETS':
        const newBullets = {...state.bullets};
        newBullets[payload.chart] =  payload.bullets;

        return {
          ...state,
          bullets: newBullets
        };
      case 'SET_W_DIAG':
        return {
          ...state,
          withDiagonals: payload
        };
      case 'SET_W_BAR':
        return {
          ...state,
          withBarycenter: payload
        };
      case 'CLEAR_CHARTS':
        return {
          ...initialState
        };
      default:
        return state;
    }
  };