import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Button } from "@mui/material";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import MovieList from "../features/movie/movieList/movieList";
import AppCarousel from "../components/carousel/AppCarousel";
import Pagination from "../components/AppPagination";
import AppSearch from "../components/AppSearch";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieListAsync } from "../features/movie/movieSlice";
import FilterGenre from "../features/movie/FilterGenre";
import useAuth from "../hooks/useAuth";
import MovieInfoDialog from "../features/movie/MovieInfoDialog";

const HomePage = () => {
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [openNewMovie, setOpenNewMovie] = useState(false);
  const navigate = useNavigate();
  const movieData = useSelector((state) => state.movie);
  const { user } = useAuth();

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const getGenreList = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/genres`);
        setGenreList(res.data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getGenreList();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const title = params.get("title");
    const page = params.get("page");
    const genreId = params.get("genreId");
    const listType = location.pathname?.substring(1);

    dispatch(getMovieListAsync({ listType, page, title, genreId }));
  }, [dispatch, location, page]);

  const handleChangePagination = (event, value) => {
    setPage(value);
    const params = new URLSearchParams(location.search);
    params.set("page", value);
    navigate({ pathname: location.pathname, search: params.toString() });
  };
  const handleAddNewMovie = (a) => {
    console.log("Add new movie");
  };
  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 10 }}>
      <Stack sx={{ display: { xs: "none", md: "flex" } }}>
        <Stack sx={{ m: 2 }}>
          {user?.role === "ADMIN" && (
            <Button variant="contained" onClick={() => setOpenNewMovie(true)}>
              + New Movie
            </Button>
          )}
        </Stack>
        <AppSearch />
        <FilterGenre genres={genreList} />
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <Stack sx={{ mb: 2 }}>
                    <AppCarousel movieList={movieData.movies?.slice(0, 10)} />
                  </Stack>

                  <Stack>
                    <MovieList movieList={movieData.movies} />
                  </Stack>
                  {movieData.movies?.length > 0 ? (
                    <Pagination
                      page={page}
                      setPage={setPage}
                      count={movieData.totalPages}
                      handleChangePagination={handleChangePagination}
                    />
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      Sorry... There are no movies for the current filter.
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Stack>
      <MovieInfoDialog
        open={openNewMovie}
        setOpen={setOpenNewMovie}
        callback={handleAddNewMovie}
      />
    </Container>
  );
};

export default HomePage;
