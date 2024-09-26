import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoviesActionType } from "../../store/actions/actions.constants";
import MovieCard from "../cards/MovieCard";
import WelcomeCard from "../cards/WelcomeCard";
import SearchBar from "../Searchbar";
import { getMovieList } from "../../store/selectors/movie.selector";
import { debounce } from "lodash";

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const movieData = useSelector(getMovieList);
  const [query, setQuery] = React.useState<string>("bas");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length >= 3) {
        dispatch({
          type: MoviesActionType.FETCH_MOVIES,
          payload: searchQuery,
        });
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <div className="flex flex-col gap-3">
      <WelcomeCard />
      <SearchBar onSearch={setQuery} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-3 gap-5 h-[calc(100vh-16rem)] overflow-auto">
        {movieData?.map((data) => (
          <MovieCard key={data.imdbID} cardData={data} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
