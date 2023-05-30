const initialState = {
  openSettings: false,
  tab: 0,
};

const settingsReducer = (state = initialState, {type, payload}) => {
switch (type) {
    case 'SET_MENU_SETTINGS':
      return {
          ...state,
          openSettings: payload
      };
    case 'SET_TAB':
      return {
          ...state,
          tab: payload
      };
    default:
    return state;
}
};

export default settingsReducer;