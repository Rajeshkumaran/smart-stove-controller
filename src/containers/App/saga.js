import { put, takeEvery } from 'redux-saga/effects';
import { REGISTER_KEY_FOR_STOVE } from './constants';

export function* registerStoveKeySaga(params = {}) {
  try {
    console.log('params in sga', params);
  } catch (err) {
    yield put(toggleErrorState(true));
    console.error('Caught in homeSaga', err);
  }
}

function* registerStoveKeyWatcher() {
  yield takeEvery(REGISTER_KEY_FOR_STOVE, registerStoveKeySaga);
}
const appSagas = [registerStoveKeyWatcher()];
export default appSagas;
