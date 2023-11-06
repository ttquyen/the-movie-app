import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  totalPages: 0,
  movies: [],
  currentMovie: {},
  currentRating: 0,
  totalMovies: null,
};
const slice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { totalPages, movies } = action.payload;
      state.movies = movies;
      state.totalPages = totalPages;
    },
    getRatedMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, totalPages, movies } = action.payload;
      console.log("REDUCER:", action.payload);
      state.movies = movies;
      state.totalPages = totalPages;
      state.totalMovies = count;
    },
    getSingleMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("REDUCER: get single movie");
      state.currentMovie = { ...action.payload };
      state.currentRating = action.payload.user_rated
        ? action.payload.user_rated
        : 0;
    },
    sendMovieRatingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("REDUCER: ratingggg");
      state.currentRating = action.payload.data.star;
      // const { movieId, reactions } = action.payload;
      // state.moviesById[movieId].reactions = { ...reactions };
    },
    addFavoriteMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("REDUCER: add fav");
      state.currentMovie.isFavorite = true;
    },
    removeFavoriteMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("REDUCER: remove fav");
      state.currentMovie.isFavorite = false;
    },
  },
});

export const getMovieListAsync =
  ({ title, listType, page, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, title, listType };
      const response = await apiService.get(`/movies/lists`, {
        params,
      });
      dispatch(slice.actions.getMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getRatedListAsync =
  ({ title, listType, page, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, title, listType };
      const response = await apiService.get("/movies/rated", {
        params,
      });
      console.log("call fav", response);
      dispatch(slice.actions.getRatedMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getFavoriteListAsync =
  ({ title, page, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, title };
      const response = await apiService.get("/movies/favorites", {
        params,
      });
      console.log("call fav", response);
      dispatch(slice.actions.getRatedMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getSingleMovieAsync =
  ({ movieId, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { userId };
      const response = await apiService.get(`/movies/detail/${movieId}`, {
        params,
      });
      dispatch(slice.actions.getSingleMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendMovieRatingAsync =
  ({ movieId, star }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/ratings", {
        movieId,
        star,
      });
      dispatch(slice.actions.sendMovieRatingSuccess(response));
      toast.success("Rating movie successfull");
      dispatch(getSingleMovieAsync({ movieId, userId: response.data.author }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const addFavoriteMovieAsync =
  ({ movieId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/favorites", {
        movieId,
      });
      dispatch(slice.actions.addFavoriteMovieSuccess(response));
      toast.success("Add favorite movie successfull");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const removeFavoriteMovieAsync =
  ({ movieId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/favorites/${movieId}`);
      dispatch(slice.actions.removeFavoriteMovieSuccess(response));
      toast.success("Remove favorite movie successfull");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
