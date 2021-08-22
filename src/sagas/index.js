import { all } from 'redux-saga/effects';
import appSagas from '../containers/App/saga';

export default function* rootSaga() {
  yield all([...appSagas]);
}
