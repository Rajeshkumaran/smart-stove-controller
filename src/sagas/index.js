import { all } from "redux-saga/effects";
import { homeSagas } from "../containers/HomePage/saga";

export default function* rootSaga() {
  yield all([ ...homeSagas]);
}
