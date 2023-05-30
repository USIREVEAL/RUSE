// ChartPoints actions
export const setRatios = payload => ({
  type: 'SET_RATIOS',
  payload
});

export const setAllRatios = payload => ({
  type: 'SET_ALL_RATIOS',
  payload
});

export const setBullets = payload => ({
  type: 'SET_BULLETS',
  payload
});

export const setDiag = payload => ({
  type: 'SET_W_DIAG',
  payload
});

export const setBar = payload => ({
  type: 'SET_W_BAR',
  payload
});

// ArtistData actions
export const setData = payload => ({
  type: 'SET_DATA',
  payload
});

// clientReducer actions
export const setClient = payload => ({
  type: 'CONNECT',
  payload
});

export const setConnected = payload => ({
  type: 'SET_CONNECTED',
  payload
});

export const setLevel = payload => ({
  type: 'SET_LEVEL',
  payload
});

export const setECode = payload => ({
  type: 'SET_ECODE',
  payload
});

export const setError = payload => ({
  type: 'SET_ERROR',
  payload
});

//settingsReducer actions
export const setOpenSettings = payload => ({
  type: 'SET_MENU_SETTINGS',
  payload
});

export const setTab = payload => ({
  type: 'SET_TAB',
  payload
});

//settingsArtist actions
export const setArtistOpenSettings = payload => ({
  type: 'SET_ARTIST_MENU_SETTINGS',
  payload
});

export const setArtistTab = payload => ({
  type: 'SET_ARTIST_TAB',
  payload
});

export const setBounds = payload => ({
  type: 'SET_BOUNDS',
  payload
});

export const setArtistRatios = payload => ({
  type: 'SET_ARTIST_RATIOS',
  payload
});

export const setActive = payload => ({
  type: 'SET_ACTIVE',
  payload
});

export const setEvents = payload => ({
  type: 'SET_EVENTS',
  payload
});

export const setBeginner = payload => ({
  type: 'SET_BEGINNER',
  payload
});

export const setIntermediate = payload => ({
  type: 'SET_INTERMEDIATE',
  payload
});

export const setAdvanced = payload => ({
  type: 'SET_ADVANCED',
  payload
});

export const setUpdateTimeout = payload => ({
  type: 'SET_TIMEOUT',
  payload
});

export const setCompose = payload => ({
  type: 'SET_COMPOSE',
  payload
});

export const setComposition = payload => ({
  type: 'SET_COMPOSITION',
  payload
});

export const clearComposition = payload => ({
  type: 'CLEAR_COMPOSITION',
});

// SAGAS
export const exportData = payload => ({
  type: 'EXPORT',
  payload
});
