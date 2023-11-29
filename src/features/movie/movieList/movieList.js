import React from "react";
import "./movieList.css";
import MovieCard from "../movieCard/MovieCard";

const MovieList = ({ movieList }) => {
  return (
    <div className="movie__list">
      <div className="list__cards">
        {movieList.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
