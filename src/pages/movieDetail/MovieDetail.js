import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import CommentList from "../../features/comment/CommentList";
import CommentForm from "../../features/comment/CommentForm";
import { Stack, Typography, Box, Container, Chip, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import GradeIcon from "@mui/icons-material/Grade";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  getSingleMovieAsync,
  sendMovieRatingAsync,
} from "../../features/movie/movieSlice";
import useAuth from "../../hooks/useAuth";
const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const currentMovieDetail = useSelector((state) => state.movie.currentMovie);
  const currentRating = useSelector((state) => state.movie.currentRating);
  useEffect(() => {
    dispatch(getSingleMovieAsync({ movieId: id, userId: user._id }));
    window.scrollTo(0, 0);
  }, [id, dispatch, user]);

  const handleRating = (newValue) => {
    dispatch(sendMovieRatingAsync({ star: newValue, movieId: id }));
  };

  return (
    <Container
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* BACKDROP */}
      <Stack sx={{ width: "100%" }}>
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt="movie__backdrop"
        />
      </Stack>
      {/* INFO */}
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          // width: "75%",
          bottom: "150px",
          position: "relative",
        }}
      >
        <Box>
          <img
            className="movie__poster"
            src={`https://image.tmdb.org/t/p/original${
              currentMovieDetail ? currentMovieDetail.poster_path : ""
            }`}
            alt="movie__poster"
          />
        </Box>
        <Box sx={{ textShadow: "0px 0px 5px #000000" }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {currentMovieDetail ? currentMovieDetail.original_title : ""}
          </Typography>
          <Typography variant="body1">
            {currentMovieDetail ? currentMovieDetail.tagline : ""}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, fontSize: 20 }}
            >
              {currentMovieDetail
                ? currentMovieDetail.vote_average?.toFixed(2)
                : ""}{" "}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mx: 0.5 }}>
              /10
            </Typography>
            {/* <i className="fas fa-star" /> */}
            <GradeIcon color="warning" />
            <Typography sx={{ ml: 1 }}>
              {currentMovieDetail
                ? "(" + currentMovieDetail.vote_count + ") votes"
                : ""}
            </Typography>
          </Stack>
          <div className="movie__runtime">
            {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
          </div>
          <div className="movie__releaseDate">
            {currentMovieDetail.release_date
              ? "Release: " + fDate(currentMovieDetail?.release_date || "")
              : ""}
          </div>
          <div className="movie__genres">
            {currentMovieDetail && currentMovieDetail.genres
              ? currentMovieDetail.genres.map((genre) => (
                  <Chip
                    id={genre.id}
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    sx={{
                      backgroundColor: "#fae190",
                      textShadow: "none",
                      mx: 0.5,
                    }}
                  />
                ))
              : ""}
          </div>
          <Stack direction="row">
            {currentMovieDetail && currentMovieDetail.homepage && (
              <Button
                color="error"
                variant="contained"
                endIcon={<LaunchIcon />}
                sx={{ textTransform: "none", fontWeight: 600, mx: 1 }}
              >
                <a
                  href={currentMovieDetail.homepage}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  Homepage
                </a>
              </Button>
            )}
            {currentMovieDetail && currentMovieDetail.imdb_id && (
              <Button
                variant="contained"
                endIcon={<LaunchIcon />}
                sx={{
                  bgcolor: "#f5c518",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                <a
                  href={
                    "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                  }
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  IMDb
                </a>
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>

      <Stack>
        <div className="movie__detailLeft">
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
              value={currentRating}
              onChange={(event, value) => handleRating(value)}
            />
          </Box>
        </div>
        <div className="movie__detailRight">
          {/* <div className="movie__detailRightTop">
                <div className="movie__name">
                  {currentMovieDetail ? currentMovieDetail.original_title : ""}
                </div>
                <div className="movie__tagline">
                  {currentMovieDetail ? currentMovieDetail.tagline : ""}
                </div>
                <Stack
                  className="movie__rating"
                  direction="row"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, fontSize: 20 }}
                  >
                    {currentMovieDetail
                      ? currentMovieDetail.vote_average?.toFixed(2)
                      : ""}{" "}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, mx: 0.5 }}>
                    /10
                  </Typography>
                  <i className="fas fa-star" />
                  <span className="movie__voteCount">
                    {currentMovieDetail
                      ? "(" + currentMovieDetail.vote_count + ") votes"
                      : ""}
                  </span>
                </Stack>
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
                <Stack direction="row">
                  {currentMovieDetail && currentMovieDetail.homepage && (
                    <a
                      href={currentMovieDetail.homepage}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <p>
                        <span className="movie__homeButton movie__Button">
                          Homepage{" "}
                          <i className="newTab fas fa-external-link-alt"></i>
                        </span>
                      </p>
                    </a>
                  )}
                  {currentMovieDetail && currentMovieDetail.imdb_id && (
                    <a
                      href={
                        "https://www.imdb.com/title/" +
                        currentMovieDetail.imdb_id
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
                </Stack>
              </div> */}
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div className="text">
              {currentMovieDetail ? currentMovieDetail.overview : ""}
            </div>
          </div>
        </div>
      </Stack>

      <Stack className="movie__comments" spacing={2}>
        <CommentList movieId={currentMovieDetail?._id} />
        <CommentForm movieId={currentMovieDetail?._id} />
      </Stack>
    </Container>
  );
};

export default MovieDetail;
