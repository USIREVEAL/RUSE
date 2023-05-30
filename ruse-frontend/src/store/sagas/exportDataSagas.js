import {
  call, select
} from 'redux-saga/effects';
import { exportReq } from '../API';

export default function* exportData(payload) {
  try {
  	const eCode = yield select(st => st.clientReducer.eCode);
    yield call(exportReq, eCode);

  } catch (e) {
    console.error(e);
  }
}