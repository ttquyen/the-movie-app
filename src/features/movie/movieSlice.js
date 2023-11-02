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
    getFavoriteMovieSuccess(state, action) {
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
      console.log(action.payload);
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
      console.log(action.payload);
      state.currentRating = action.payload.data.star;
      // const { movieId, reactions } = action.payload;
      // state.moviesById[movieId].reactions = { ...reactions };
    },
  },
});

export const getMovieListAsync =
  ({ title, listType, page, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, title, listType };
      console.log(listType);
      const response = await apiService.get(`/movies/lists`, {
        params,
      });
      dispatch(slice.actions.getMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getFavoriteListAsync =
  ({ title, listType, page, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, title, listType };
      console.log(listType);
      const response = await apiService.get("/movies/favorite", {
        params,
      });
      console.log("call fav", response);
      dispatch(slice.actions.getFavoriteMovieSuccess(response.data));
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
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
