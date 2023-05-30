import { combineReducers } from 'redux';
import chartPoints from './ChartPoints';
import clientReducer from './clientReducer';
import settingsArtist from './SettingsArtist';
import settingsReducer from './settingsReducer';

export default combineReducers({
  chartPoints,
  settingsArtist,
  clientReducer,
  settingsReducer
});