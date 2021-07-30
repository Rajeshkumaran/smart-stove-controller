import { put, takeEvery, call } from 'redux-saga/effects';
import { UPDATE_STOVE_SETTINGS } from './constants';

export function* updateStoveSettingsSaga(params = {}) {
  try {
    console.log('');
  } catch (err) {
    yield put(toggleErrorState(true));
    console.error('Caught in homeSaga', err);
  }
}

function* updateStoveSettingsWatcher() {
  yield takeEvery(UPDATE_STOVE_SETTINGS, updateStoveSettingsSaga);
}

export const homeSagas = [updateStoveSettingsWatcher()];
