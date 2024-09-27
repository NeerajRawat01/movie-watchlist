import { debounce } from "lodash";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"; // Import hooks for routing
import { MoviesActionType } from "../../store/actions/actions.constants";
import {
  getMovieList,
  loadingList,
} from "../../store/selectors/movie.selector";
import MovieCard from "../cards/MovieCard";
import WelcomeCard from "../cards/WelcomeCard";
import SearchBar from "../Searchbar";
import Spinner from "../Spinner";

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const movieData = useSelector(getMovieList);
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to get/set query params

  // Read initial query from the URL
  const initialQuery = searchParams.get("query") || "bas"; // Default query if not found
  const [query, setQuery] = React.useState<string>(initialQuery);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length >= 3) {
        dispatch({
          type: MoviesActionType.FETCH_MOVIES,
          payload: searchQuery,
        });
        // Set the query parameter in the URL
        setSearchParams({ query: searchQuery });
      }
    }, 300),
    [dispatch, setSearchParams] // Add dispatch and setSearchParams as dependencies
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const loading = useSelector(loadingList);

  return (
    <div className="flex flex-col gap-3">
      <WelcomeCard />
      <SearchBar value={query} onSearch={setQuery} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-3 gap-5 h-[calc(100vh-16rem)] overflow-auto">
          {movieData?.map((data) => (
            <MovieCard key={data.imdbID} cardData={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
