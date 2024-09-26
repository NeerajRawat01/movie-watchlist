import { combineReducers } from "redux";
import movieReducer from "./movie.reducer";

const appReducer = combineReducers({
  movie: movieReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
