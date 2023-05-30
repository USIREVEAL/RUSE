const initialState = {
    openSettings: false,
    tab: 0,
    nBeginner: 0,
    nIntermediate: 0,
    nAdvanced: 0,
    timeout: 30000,
    active:{
      first: [false, false, false],
      second: [false, false, false]
    },
    bounds: {
      first: [
        {min: 0, max: 1, measureUnit: "%"},
        {min: 0, max: 1, measureUnit: "%"},
        {min: 0, max: 1, measureUnit: "%"}
      ],
      second: [
        {min: 0, max: 1, measureUnit: "%"},
        {min: 0, max: 1, measureUnit: "%"},
        {min: 0, max: 1, measureUnit: "%"}
      ],
    },
    ratios:{
      'first': [
        {sum: [0, 0], count: [0, 0], ratio: [0, 0]}, 
        {sum: [0, 0], count: [0, 0], ratio: [0, 0]}, 
        {sum: [0, 0], count: [0, 0], ratio: [0, 0]}], 
      'second': [
        {sum: [0, 0], count: [0, 0], ratio: [0, 0]},
        {sum: [0, 0], count: [0, 0], ratio: [0, 0]},
        {sum: [0, 0], count: [0, 0], ratio: [0, 0]}]
    },
    events: {
      first: [false, false, false],
      second:[false, false, false],
    },
    compose: false,
    composition: {
      first: [false, false, false],
      second:[false, false, false],
    },
};
  
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_COMPOSITION':
      return {
        ...state,
        composition: payload
      };
    case 'CLEAR_COMPOSITION': 
      return {
        ...state,
        composition: {
          first: [false, false, false],
          second:[false, false, false],
        }
      }
    case 'SET_ARTIST_TAB':
      return {
        ...state,
        tab: payload,
      };
    case 'SET_ARTIST_MENU_SETTINGS':
      return {
        ...state,
        openSettings: payload,
      };
    case 'SET_ARTIST_RATIOS':
      return {
        ...state,
        ratios: payload,
      };
    case 'SET_BEGINNER':
      return {
        ...state,
        nBeginner: payload,
      };
    case 'SET_INTERMEDIATE':
      return {
        ...state,
        nIntermediate: payload,
      };
    case 'SET_ADVANCED':
      return {
        ...state,
        nAdvanced: payload,
      };
    case 'SET_BOUNDS':
      const newBounds = {...state.bounds};
      newBounds[payload.chart] =  payload.bounds;

      return {
        ...state,
        bounds: newBounds,
      };
    case 'SET_ACTIVE':
      const newActive = payload.all ? payload.active : {...state.active};
      if(!payload.all) {
        newActive[payload.chart] =  payload.active;
      }

      return {
        ...state,
        active: newActive,
      };
    case 'SET_EVENTS':
      const newEvents = payload.all ? payload.events : {...state.events};
      if (!payload.all) {
        newEvents[payload.chart] =  payload.events;
      }

      return {
        ...state,
        events: newEvents,
      };
    case 'SET_TIMEOUT':
      return {
        ...state,
        timeout: payload,
      };
    case 'SET_COMPOSE':
      return {
        ...state,
        compose: payload,
      };
    case 'CLEAR_CHARTS':
      return {
        ...initialState
      };
    default:
      return state;
  }
};