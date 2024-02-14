import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// reducers
const plantList = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLANT":
      return action.payload;
    default:
      return state;
  }
};

// SAGAs
const sagaMiddleware = createSagaMiddleware();

function* getPlants(action) {
  try {
    const elementResponse = yield axios({ method: "GET", url: "/api/plants" });

    yield put({ type: "ADD_PLANT", payload: elementResponse.data });
  } catch (err) {
    console.error("ERROR in client GET route:", err);
  }
}

function* postPlant(action) {
  try {
    yield axios({ method: "POST", url: "/api/plants", data: action.payload });
    yield put({ type: "GET_PLANTS" });
  } catch (err) {
    console.error("ERROR in client POST route:", err);
  }
}

function* deletePlant(action) {
  try {
    yield axios({ method: "DELETE", url: `api/plants/${action.payload}` });
    yield put({ type: "GET_PLANTS" });
  } catch (err) {
    console.error("ERROR in client DELETE route:", err);
  }
}

function* watcherSaga() {
  //
  yield takeEvery("GET_PLANTS", getPlants);
  yield takeEvery("POST_PLANT", postPlant);
  yield takeEvery("DELETE_PLANT", deletePlant);
}

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(logger, sagaMiddleware)
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

sagaMiddleware.run(watcherSaga);

export default store;
