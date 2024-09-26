import { createSelector } from "reselect";
import { AppState } from "../index";

const movieStore = (store: AppState) => store.movie;

export const getMovieList = createSelector(
  [movieStore],
  (movie) => movie.moviesData
);

export const loadingList = createSelector(
  [movieStore],
  (movie) => movie.loadingList
);

export const getMovieDetail = createSelector(
  [movieStore],
  (movie) => movie.movieDetail
);

export const getLoading = createSelector([movieStore], (movie) => movie.loading);
