import React, { useState, useEffect, useContext } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { API_KEY } from "../app/config";
import MovieList from "../components/movieList/movieList";
import AppCarousel from "../components/carousel/AppCarousel";
import Pagination from "../components/AppPagination";
import { MovieContext } from "../contexts/MovieContext";
import AppSearch from "../components/AppSearch";
import AppDrawer from "../components/AppDrawer";
import Typography from "@mui/material/Typography";

const applyFilter = (movies, filters) => {
  let filteredProducts = movies;
  if (filters.genre !== "All") {
    filteredProducts = filteredProducts.filter((movie) =>
      movie?.genre_ids.includes(+filters.genre)
    );
  }
  return filteredProducts;
};
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const defaultValues = {
    genre: "All",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterProducts = applyFilter(movies, filters);
  const { movieTypeCtx, setMovieTypeCtx, movieSearchCtx, setMovieSearchCtx } =
    useContext(MovieContext);

  // GENRE LIST
  useEffect(() => {
    const getGenreList = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenreList(res.data?.genres);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getGenreList();
  }, []);

  // MOVIE LIST by search
  useEffect(() => {
    const getMovieList = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${movieSearchCtx}`
        );
        setMovies(res.data?.results);
        setCount(res.data?.total_pages < 500 ? res.data?.total_pages : 500);
        setError("");
        setMovieTypeCtx("popular");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    if (movieSearchCtx) {
      getMovieList();
    }
  }, [movieSearchCtx, page, setMovieTypeCtx]);

  // MOVIE LIST By Type
  useEffect(() => {
    const getMovieList = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/movie/${movieTypeCtx}?api_key=${API_KEY}&language=en-US&page=${page}`
        );

        setMovies(res.data?.results);
        setCount(res.data?.total_pages < 500 ? res.data?.total_pages : 500);
        setError("");
        setMovieSearchCtx(null);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMovieList();
  }, [movieTypeCtx, page, setMovieSearchCtx]);

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack sx={{ display: { xs: "none", md: "flex" } }}>
        <AppSearch />
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={reset} filterOptions={genreList} />
        </FormProvider>
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
                  <AppCarousel movieList={filterProducts?.slice(0, 10)} />
                  <MovieList movieList={filterProducts} />

                  {filterProducts?.length > 0 ? (
                    <Pagination
                      page={page}
                      setPage={setPage}
                      count={count}
                      handleChangePagination={handleChangePagination}
                    />
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      Sorry... There are no movies for this genre.
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Stack>
      <AppDrawer>
        <Box sx={{ p: 2 }}>
          <AppSearch />
          <FormProvider methods={methods}>
            <ProductFilter resetFilter={reset} filterOptions={genreList} />
          </FormProvider>
        </Box>
      </AppDrawer>
    </Container>
  );
};

export default HomePage;
