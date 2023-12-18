import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import { fDate } from "../../../utils/formatTime";

const MovieCard = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movies/detail/${movie._id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              alt="card-img"
              className="cards__img"
              src={
                movie.poster_path
                  ? movie.imdb_id
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : movie.poster_path
                  : "https://picsum.photos/200/300?grayscale"
              }
            />
            <div className="cards__overlay">
              <div className="card__title">{movie ? movie.title : ""}</div>
              <div className="card__runtime">
                {movie ? fDate(movie.release_date) : ""}
                <span className="card__rating">
                  {movie ? movie.vote_average?.toFixed(2) : ""}
                  <i className="fas fa-star" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default MovieCard;
