import { all, fork } from "redux-saga/effects";
import { movieSagaWatcher } from "./movie.saga";

export default function* rootSaga() {
  yield all([fork(movieSagaWatcher)]);
}
