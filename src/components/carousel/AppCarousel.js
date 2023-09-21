import React from "react";
import "./AppCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

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
          to={`/movie/${movie.id}`}
          key={movie.id}
        >
          <div className="posterImage">
            <img
              alt="backdrop"
              src={`https://image.tmdb.org/t/p/original${
                movie && movie.backdrop_path
              }`}
            />
          </div>
          <div className="posterImage__overlay">
            <div className="posterImage__title">
              {movie ? movie.original_title : ""}
            </div>
            <div className="posterImage__runtime">
              {movie ? movie.release_date : ""}
              <span className="posterImage__rating">
                {movie ? movie.vote_average : ""}
                <i className="fas fa-star" />{" "}
              </span>
            </div>
            <div className="posterImage__description">
              {movie ? `${movie.overview.slice(0, 100)}...` : ""}
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
}

export default AppCarousel;
