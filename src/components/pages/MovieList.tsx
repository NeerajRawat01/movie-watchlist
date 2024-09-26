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

  const [query, setQuery] = React.useState<string>("");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length >= 3) {
        dispatch({
          type: MoviesActionType.FETCH_MOVIES,
          payload: searchQuery,
        });
      }
    }, 300), // 300ms debounce delay
    []
  );

  // useEffect(() => {
  //   dispatch({
  //     type: MoviesActionType.FETCH_MOVIE_BY_ID,
  //     payload: 'tt14588158',
  //   });
  // }, []);

  useEffect(() => {
    debouncedSearch(query);
    // Cancel debounce on component unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  // const dummyData = [
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "1",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 2",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "2",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 3",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "3",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 4",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "4",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 5",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "5",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 6",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "6",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 7",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "7",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 8",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "8",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 9",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "9",
  //   },
  //   {
  //     Poster: "https://i.redd.it/i5z6984wfjzb1.jpg",
  //     Title: "Bas kar Bassi 10",
  //     Type: "movie",
  //     Year: "2022",
  //     imdbID: "10",
  //   },
  // ];

  const movieData = useSelector(getMovieList);

  console.log("movieData", query);

  return (
    <div className="flex flex-col gap-3">
      <WelcomeCard />
      <SearchBar onSearch={setQuery} />
      <div className="grid grid-cols-5 gap-5 h-[calc(100vh-16rem)] overflow-auto">
        {movieData?.map((data) => (
          <MovieCard cardData={data} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
