import React, { useEffect, useState } from "react";
// import "./MovieDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { fDate } from "../utils/formatTime";
import CommentList from "../features/comment/CommentList";
import CommentForm from "../features/comment/CommentForm";
import {
  Stack,
  Typography,
  Box,
  Container,
  Chip,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import GradeIcon from "@mui/icons-material/Grade";
import LaunchIcon from "@mui/icons-material/Launch";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  addFavoriteMovieAsync,
  getSingleMovieAsync,
  removeFavoriteMovieAsync,
  sendMovieRatingAsync,
} from "../features/movie/movieSlice";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "./LoadingScreen";
import TrailerDialog from "./TrailerDialog";
import MovieInfoDialog from "../features/movie/MovieInfoDialog";
import DeleteMovieDialog from "../features/movie/DeteleMovieDialog";
const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openTrailer, setOpenTrailer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const {
    currentMovie: currentMovieDetail,
    currentRating,
    isLoading,
  } = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(getSingleMovieAsync({ movieId: id, userId: user?._id }));
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  const handleDeleteDialog = (message) => {
    if (message === "OK") {
      navigate("/");
    }
  };
  const handleEditDialog = (message) => {
    if (message === "OK") {
    }
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditComment = () => {
    setOpenEdit(true);
    handleMenuClose();
  };
  const handleDeleteComment = () => {
    setOpenDel(true);
    handleMenuClose();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="comment-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEditComment}>Edit</MenuItem>
      <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
    </Menu>
  );
  const handleRating = (newValue) => {
    if (!user) {
      navigate("/login");
    } else if (!user.verified) {
      navigate("/verify-email");
    } else {
      dispatch(sendMovieRatingAsync({ star: newValue, movieId: id }));
    }
  };
  const handleFavorite = (type) => {
    if (!user) {
      navigate("/login");
    } else if (!user.verified) {
      navigate("/verify-email");
    } else {
      if (type === "add") {
        dispatch(addFavoriteMovieAsync({ movieId: id }));
      } else if (type === "remove") {
        dispatch(removeFavoriteMovieAsync({ movieId: id }));
      }
    }
  };

  return (
    <Container
      sx={{
        width: "100vw",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading && <LoadingScreen />}

      {/* BACKDROP */}

      <Stack height={{ xs: 300, md: 400 }} sx={{ width: "100%", mt: 6 }}>
        {currentMovieDetail?.backdrop_path && (
          <img
            style={{
              width: "100%",
              objectFit: "cover",
              objectPosition: "0 35%",
              maxHeight: "500px",
            }}
            src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`}
            alt="movie__backdrop"
          />
        )}
        {user?.role === "ADMIN" && (
          <IconButton
            size="small"
            sx={{ position: "absolute", right: 30, top: 70 }}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
        )}
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
          justifyContent="center"
          alignItems="center"
        >
          <Box
            className="poster"
            sx={{
              position: "relative",
              maxHeight: { xs: "220px", md: "250px" },
              minHeight: { xs: "120px", md: "150px" },
              maxWidth: { xs: "140px", md: "250px" },
              minWidth: { xs: "100px", md: "150px" },
            }}
          >
            {currentMovieDetail?.poster_path && (
              <img
                className="movie__poster"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "0 35%",
                }}
                src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.poster_path}`}
                alt="movie__poster"
              />
            )}
            {currentMovieDetail?.isFavorite ? (
              <IconButton
                color="error"
                sx={{ position: "absolute", right: 0 }}
                onClick={() => handleFavorite("remove")}
              >
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton
                color="error"
                sx={{ position: "absolute", right: 0 }}
                onClick={() => handleFavorite("add")}
              >
                <FavoriteBorderIcon />
              </IconButton>
            )}
          </Box>
          <Stack
            className="title"
            sx={{
              textShadow: "0px 0px 5px #000000",
              color: "#fff",
              pl: { xs: 1.5, md: 5 },
              width: "60%",
            }}
            spacing={{ xs: 1, md: 2 }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: 30, md: 50 },
              }}
            >
              {currentMovieDetail ? currentMovieDetail.title : ""}
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
                {currentMovieDetail.vote_count
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </Typography>
            </Stack>
            <Stack className="run__time">
              <Typography variant="body2">
                {currentMovieDetail.runtime
                  ? currentMovieDetail.runtime + " mins"
                  : ""}
              </Typography>
            </Stack>
            <Stack className="release__date">
              <Typography variant="body2">
                {currentMovieDetail?.release_date
                  ? "Release: " + fDate(currentMovieDetail?.release_date || "")
                  : ""}
              </Typography>
            </Stack>
            <Stack className="genre__chip" direction="row" flexWrap="wrap">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <Chip
                      id={genre.id}
                      key={genre.id}
                      label={genre.name}
                      size="small"
                      sx={{
                        textShadow: "none",
                        m: 0.3,
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
          sx={{ px: 3, pt: { xs: 1, md: 15 } }}
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
                  minWidth: "108px",
                }}
              >
                <Link
                  href={currentMovieDetail.homepage}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#FFF",
                  }}
                >
                  Homepage
                </Link>
              </Button>
            )}

            {currentMovieDetail?.trailer?.length > 0 && (
              <Button
                variant="contained"
                endIcon={<MovieIcon />}
                sx={{
                  bgcolor: "#f5c518",
                  textTransform: "none",
                  fontWeight: 600,
                  minWidth: "88px",
                }}
                onClick={() => setOpenTrailer(true)}
              >
                {" "}
                Trailer
              </Button>
            )}
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
          </Stack>
        </Stack>
      </Stack>
      <DeleteMovieDialog
        open={openDel}
        setOpen={setOpenDel}
        movie={currentMovieDetail}
        callback={handleDeleteDialog}
      />
      <MovieInfoDialog
        open={openEdit}
        setOpen={setOpenEdit}
        movie={currentMovieDetail}
        callback={handleEditDialog}
      />
      {currentMovieDetail?.trailer?.length > 0 && (
        <TrailerDialog
          open={openTrailer}
          setOpen={setOpenTrailer}
          video={currentMovieDetail?.trailer[0]}
        />
      )}
      {renderMenu}
    </Container>
  );
};

export default MovieDetail;
