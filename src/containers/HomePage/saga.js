import { put, takeEvery, call } from "redux-saga/effects";
import { API_URL } from "../../constants";
import { get } from "../../utils/helpers";
import requestWrapper from "../../utils/requestWrapper";
import { loadOkrs, toggleDataLoadedState, toggleErrorState } from "./actions";
import { GET_OKRS } from "./constants";

export function* getOkrsSaga(params = {}) {
  try {
    const response = yield call(requestWrapper, {
      url: `${API_URL}`,
      method: "GET",
    });
    const { status } = response;
    if (status === 200) {
      const data = get(response, "data.data", []);
      yield put(loadOkrs(data));
      yield put(toggleDataLoadedState(true));
    } else {
      yield put(toggleErrorState(true));
    }
  } catch (err) {
    yield put(toggleErrorState(true));
    console.error("Caught in homeSaga", err);
  }
}

function* watchHomeSaga() {
  yield takeEvery(GET_OKRS, getOkrsSaga);
}

export const homeSagas = [watchHomeSaga()];
