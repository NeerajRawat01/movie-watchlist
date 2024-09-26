import React from "react";
import { Movie } from "../../models/movie";
import { getLoggedInUser } from "../../services/localStorageServices";
import MovieCard from "../cards/MovieCard";

const Favorites: React.FC = () => {
  const loggedInUser = getLoggedInUser();
  const bookmarks = loggedInUser.bookmarks;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl">
        Welcome
        <span className="text-red-700 font-bold"> {loggedInUser.name}</span> to
        your list
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-3 gap-5 h-[calc(100vh-7rem)] overflow-auto">
        {bookmarks?.map((data: Movie) => (
          <MovieCard key={data.imdbID} isRenderedForBookmarks cardData={data} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
