import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";
import { fDate } from "../../utils/formatTime";
import CommentList from "../../features/comment/CommentList";
import CommentForm from "../../features/comment/CommentForm";
import { Stack, Typography, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleMovieAsync,
  sendMovieRatingAsync,
} from "../../features/movie/movieSlice";
import useAuth from "../../hooks/useAuth";
const MovieDetail = () => {
  // const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const currentMovieDetail = useSelector((state) => state.movie.currentMovie);
  useEffect(() => {
    dispatch(getSingleMovieAsync({ movieId: id, userId: user._id }));
  }, [id, dispatch, user, rating]);

  const handleRating = async (newValue) => {
    //TODO
    //set rating to this film
    await dispatch(sendMovieRatingAsync({ star: newValue, movieId: id }));
    setRating(newValue);
  };

  return (
    <Box>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div className="movie">
          <div className="movie__intro">
            <img
              className="movie__backdrop"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.backdrop_path : ""
              }`}
              alt="movie__backdrop"
            />
          </div>
          <div className="movie__detail">
            <div className="movie__detailLeft">
              <div className="movie__posterBox">
                <img
                  className="movie__poster"
                  src={`https://image.tmdb.org/t/p/original${
                    currentMovieDetail ? currentMovieDetail.poster_path : ""
                  }`}
                  alt="movie__poster"
                />
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  mt: 2,
                }}
              >
                <Typography variant="h5">Your Rating: </Typography>
                <Rating
                  name="simple-controlled"
                  max={10}
                  value={currentMovieDetail.user_rated || rating}
                  onChange={(event, value) => handleRating(value)}
                />
              </Box>
            </div>
            <div className="movie__detailRight">
              <div className="movie__detailRightTop">
                <div className="movie__name">
                  {currentMovieDetail ? currentMovieDetail.original_title : ""}
                </div>
                <div className="movie__tagline">
                  {currentMovieDetail ? currentMovieDetail.tagline : ""}
                </div>
                <div className="movie__rating">
                  {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                  <i className="fas fa-star" />
                  <span className="movie__voteCount">
                    {currentMovieDetail
                      ? "(" + currentMovieDetail.vote_count + ") votes"
                      : ""}
                  </span>
                </div>
                <div className="movie__runtime">
                  {currentMovieDetail
                    ? currentMovieDetail.runtime + " mins"
                    : ""}
                </div>
                <div className="movie__releaseDate">
                  {currentMovieDetail.release_date
                    ? "Release: " +
                      fDate(currentMovieDetail?.release_date || "")
                    : ""}
                </div>
                <div className="movie__genres">
                  {currentMovieDetail && currentMovieDetail.genres
                    ? currentMovieDetail.genres.map((genre) => (
                        <span
                          className="movie__genre"
                          id={genre.id}
                          key={genre.id}
                        >
                          {genre.name}
                        </span>
                      ))
                    : ""}
                </div>
              </div>
              <div className="movie__detailRightBottom">
                <div className="synopsisText">Synopsis</div>
                <div className="text">
                  {currentMovieDetail ? currentMovieDetail.overview : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="movie__links">
            <div className="movie__heading">Useful Links</div>
            {currentMovieDetail && currentMovieDetail.homepage && (
              <a
                href={currentMovieDetail.homepage}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__homeButton movie__Button">
                    Homepage <i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
            {currentMovieDetail && currentMovieDetail.imdb_id && (
              <a
                href={
                  "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                }
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__imdbButton movie__Button">
                    Trailer
                    <i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
          </div>
          <Stack className="movie__comments" spacing={2}>
            <CommentList movieId={currentMovieDetail?._id} />
            <CommentForm movieId={currentMovieDetail?._id} />
          </Stack>
        </div>
      )}
    </Box>
  );
};

export default MovieDetail;
