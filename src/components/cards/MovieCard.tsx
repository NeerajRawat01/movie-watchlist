import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { Movie } from "../../models/movie";
import { useNavigate } from "react-router-dom";
import {
  bookmarkMovie,
  unbookmarkMovie,
} from "../../services/localStorageServices";
import { IoCheckbox } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

interface Props {
  cardData: Movie;
  isRenderedForBookmarks?: boolean;
}

const MovieCard: React.FC<Props> = ({ cardData, isRenderedForBookmarks }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/movie-detail/${cardData.imdbID}`);
      }}
      className="border-2 rounded  relative flex flex-col gap-2 hover:shadow-md cursor-pointer"
    >
      {isRenderedForBookmarks && (
        <RxCross2
          onClick={(e) => {
            e.stopPropagation();
            unbookmarkMovie(cardData);
            window.location.reload();
          }}
          className="absolute rounded-full text-blue-700 bg-red-500 -top-2 -right-2 text-3xl"
        />
      )}
      {!isRenderedForBookmarks &&
        (cardData?.bookmarked ? (
          <IoCheckbox className="absolute text-red-700 -top-2 -right-2 text-3xl" />
        ) : (
          <BsFillBookmarkPlusFill
            onClick={(e) => {
              e.stopPropagation();
              bookmarkMovie(cardData);
              window.location.reload();
            }}
            className="absolute text-red-700 -top-2 -right-2 text-3xl"
          />
        ))}

      <img
        loading="lazy"
        className=" h-[20rem] object-cover"
        src={cardData.Poster}
        alt="Movie Poster"
      />
      <div className="flex flex-col text-gray-600 gap-2 px-3 py-2">
        <h1>
          <span className="font-bold">Title : </span> {cardData.Title}
        </h1>
        <h2>
          <span className="font-bold">Year : </span>
          {cardData.Year}
        </h2>
        <h2>
          <span className="font-bold">Type : </span>
          {cardData.Type}
        </h2>
        <span className="font-bold text-red-500">Click to show more....</span>
      </div>
    </div>
  );
};

export default MovieCard;
