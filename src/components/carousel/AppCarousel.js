import React from "react";
import "./AppCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

function AppCarousel({ movieList }) {
  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      transitionTime={3}
      infiniteLoop={true}
      showStatus={false}
    >
      {movieList?.map((movie) => (
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={`/movies/detail/${movie._id}`}
          key={movie._id}
        >
          <div className="posterImage">
            <img
              alt="backdrop"
              src={
                movie.backdrop_path
                  ? movie.imdb_id
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : movie.backdrop_path
                  : "https://annenberg.usc.edu/sites/default/files/AII.8.17.23.jpg"
              }
            />
          </div>
          <div className="posterImage__overlay">
            <div className="posterImage__title">{movie ? movie.title : ""}</div>
            <div className="posterImage__runtime">
              {movie ? fDate(movie.release_date) : ""}
              <span className="posterImage__rating">
                {movie ? movie.vote_average?.toFixed(2) : ""}
                <i className="fas fa-star" />{" "}
              </span>
            </div>
            <div className="posterImage__description">
              {movie ? `${movie.overview.slice(0, 250)}...` : ""}
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
}

export default AppCarousel;
