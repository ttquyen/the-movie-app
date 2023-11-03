import React, { useEffect, useState } from "react";
// import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { fDate } from "../utils/formatTime";
import CommentList from "../features/comment/CommentList";
import CommentForm from "../features/comment/CommentForm";
import { Stack, Typography, Box, Container, Chip, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import GradeIcon from "@mui/icons-material/Grade";
import LaunchIcon from "@mui/icons-material/Launch";
import MovieIcon from "@mui/icons-material/Movie";
import {
  getSingleMovieAsync,
  sendMovieRatingAsync,
} from "../features/movie/movieSlice";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "./LoadingScreen";
import TrailerDialog from "./TrailerDialog";
const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [openTrailer, setOpenTrailer] = useState(false);
  const VIDEO_URL = "https://www.youtube.com/embed/9fJtM5z0g7M";
  const {
    currentMovie: currentMovieDetail,
    currentRating,
    isLoading,
  } = useSelector((state) => state.movie);
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
      <Stack height={{ xs: 300, md: 400 }} sx={{ width: "100%", mt: 6 }}>
        <img
          style={{
            width: "100%",
            objectFit: "cover",
            objectPosition: "0 35%",
            maxHeight: "500px",
          }}
          // className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt="movie__backdrop"
        />
      </Stack>
      {/* INFO */}
      <Stack
        className="main__content"
        sx={{
          bottom: "200px",
          position: "relative",
          px: 1,
        }}
        spacing={2}
      >
        <Stack
          className="title__poster"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box className="poster">
            <img
              className="movie__poster"
              style={{
                width: "100%",
                objectFit: "cover",
                objectPosition: "0 35%",
                maxHeight: "350px",
                minHeight: "150px",
                minWidth: "100px",
              }}
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt="movie__poster"
            />
          </Box>
          <Stack
            className="title"
            sx={{ textShadow: "0px 0px 5px #000000", color: "#fff", pl: 1.5 }}
            spacing={{ xs: 1, md: 2 }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: { xs: 30, md: 50 } }}>
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </Typography>
            <Typography variant="body2">
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
              <GradeIcon color="warning" />
              <Typography sx={{ ml: 1 }}>
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </Typography>
            </Stack>
            <Stack className="run__time">
              <Typography variant="body2">
                {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
              </Typography>
            </Stack>
            <Stack className="release__date">
              <Typography variant="body2">
                {currentMovieDetail?.release_date
                  ? "Release: " + fDate(currentMovieDetail?.release_date || "")
                  : ""}
              </Typography>
            </Stack>
            <Stack className="genre__chip" direction="row">
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
            </Stack>
          </Stack>
        </Stack>
        <Stack
          className="external__and__rating"
          direction="column"
          justifyContent="center"
          sx={{ px: 3 }}
        >
          <Stack
            className="external__link"
            direction="row"
            justifyContent="center"
            sx={{ my: 1 }}
            spacing={3}
          >
            {currentMovieDetail && currentMovieDetail.homepage && (
              <Button
                color="error"
                variant="contained"
                endIcon={<LaunchIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  width: "fit-content",
                }}
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
                  width: "fit-content",
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
            <Button
              variant="contained"
              endIcon={<MovieIcon />}
              sx={{
                bgcolor: "#f5c518",
                textTransform: "none",
                fontWeight: 600,
                width: "fit-content",
              }}
              onClick={() => setOpenTrailer(true)}
            >
              {" "}
              Trailer
            </Button>
          </Stack>
          <Stack className="rating" alignItems="center" spacing={0.5}>
            <Typography sx={{ fontSize: { xs: 16, md: 20 } }}>
              Your Rating:{" "}
            </Typography>
            <Rating
              name="simple-controlled"
              max={10}
              value={currentRating}
              onChange={(event, value) => handleRating(value)}
            />
          </Stack>
        </Stack>

        <Stack className="overview" spacing={1} sx={{ px: { md: 10 } }}>
          <Typography sx={{ fontWeight: 600, fontSize: { xs: 25, md: 30 } }}>
            Overview
          </Typography>
          <Typography variant="subtitle2">
            {currentMovieDetail ? currentMovieDetail.overview : ""}
          </Typography>
        </Stack>
        <Stack className="movie__comments" spacing={2} sx={{ px: { md: 10 } }}>
          <Typography sx={{ fontWeight: 600, fontSize: { xs: 25, md: 30 } }}>
            Comments
          </Typography>

          <Stack
            className="comment__list"
            width={{ xs: "100%", md: "80%" }}
            sx={{ mx: "auto" }}
            spacing={1}
          >
            <CommentList movieId={currentMovieDetail?._id} />
            <CommentForm movieId={currentMovieDetail?._id} />
            {/* <Stack></Stack> */}
            {/* <Stack className="comment__form"></Stack> */}
          </Stack>
        </Stack>
      </Stack>
      {isLoading && <LoadingScreen />}
      <TrailerDialog
        open={openTrailer}
        setOpen={setOpenTrailer}
        video={VIDEO_URL}
      />
    </Container>
  );
};

export default MovieDetail;
