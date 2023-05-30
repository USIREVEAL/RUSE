import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App.js';
import theme from './AppTheme.js';
import './i18n';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducers';
import rootSaga from './store/sagas';

// eslint-disable-next-line no-undef,no-underscore-dangle
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();
let composedMiddleware = applyMiddleware(sagaMiddleware);
if (reduxDevTools) {
  composedMiddleware = compose(
    applyMiddleware(sagaMiddleware),
    reduxDevTools
  );
}
// eslint-disable-next-line import/prefer-default-export
export const store = createStore(reducer, composedMiddleware);
// Register all sagas;
rootSaga.map(saga => sagaMiddleware.run(saga));


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,

  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
