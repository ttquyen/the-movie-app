import React, { useState, useEffect, useContext } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import MovieList from "../features/movie/movieList/movieList";
import AppCarousel from "../components/carousel/AppCarousel";
import Pagination from "../components/AppPagination";
import { MovieContext } from "../contexts/MovieContext";
import AppSearch from "../components/AppSearch";
import AppDrawer from "../components/AppDrawer";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieListAsync } from "../features/movie/movieSlice";

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
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const movieData = useSelector((state) => state.movie);
  const location = useLocation();
  const defaultValues = {
    genre: "All",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterProducts = applyFilter(movieData.movies, filters);
  const dispatch = useDispatch();
  // GENRE LIST
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
    const listType = location.pathname.substring(1) || "top_rated";
    dispatch(getMovieListAsync({ listType, page }));
  }, [dispatch, location, page]);

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 10 }}>
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
                      count={movieData.totalPages}
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
