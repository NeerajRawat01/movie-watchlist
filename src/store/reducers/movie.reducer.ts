import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../models/movie";
import { getLoggedInUser } from "../../services/localStorageServices";

export interface movieState {
  moviesData: Movie[];
  movieDetail?: any;
  loading?: boolean;
  loadingList?: boolean;
  error?: string;
}

const initialState: movieState = {
  moviesData: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      const { loading } = action.payload;
      state.loading = loading;
    },
    fetchMovies: (state) => {
      state.loadingList = true;
      state.moviesData = [];
    },
    fetchMoviesCompleted: (
      state,
      action: PayloadAction<{
        movies: Movie[];
      }>
    ) => {
      state.loadingList = false;
      const loggedInUser = getLoggedInUser();
      const bookmarks = loggedInUser.bookmarks.map((b: Movie) => b.imdbID);
      state.moviesData = action.payload.movies.map((movie: Movie) => {
        return {
          ...movie,
          bookmarked: bookmarks.includes(movie.imdbID),
        };
      });
    },
    fetchDetailedMovie: (
      state,
      action: PayloadAction<{
        movieDetail: any;
      }>
    ) => {
      state.movieDetail = action.payload.movieDetail;
      state.loading = false;
    },
    fetchMoviesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loadingList = false;
    },
  },
});

export const {
  addLoading,
  fetchMovies,
  fetchMoviesCompleted,
  fetchMoviesError,
  fetchDetailedMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
