import { fork, takeLatest } from 'redux-saga/effects';
import exportData from './exportDataSagas';


// eslint-disable-next-line no-empty-function
function* watcher() {
  yield takeLatest('EXPORT', exportData);
}

export default function* root() {
  yield fork(watcher);
}