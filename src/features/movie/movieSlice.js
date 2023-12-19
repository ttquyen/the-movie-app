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
      state.movies = movies;
      state.totalPages = totalPages;
      state.totalMovies = count;
    },
    getSingleMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentMovie = { ...action.payload };
      state.currentRating = action.payload.user_rated
        ? action.payload.user_rated
        : 0;
    },
    sendMovieRatingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentRating = action.payload.data.star;
    },
    addFavoriteMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentMovie.isFavorite = true;
    },
    removeFavoriteMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentMovie.isFavorite = false;
    },
    deleteMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    addMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    updateMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getMovieListAsync =
  ({ title, listType, page, limit = 12, genreId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, title, listType, genreId };
      const response = await apiService.get(`/movies/lists`, {
        params,
      });
      dispatch(slice.actions.getMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
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
      dispatch(slice.actions.getRatedMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
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
      dispatch(slice.actions.getRatedMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
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
      toast.error(error?.response?.data?.errors?.message);
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
      toast.success("Rating movie successful");
      dispatch(getSingleMovieAsync({ movieId, userId: response.data.author }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
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
      toast.success("Add favorite movie successful");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
    }
  };
export const removeFavoriteMovieAsync =
  ({ movieId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/favorites/${movieId}`);
      dispatch(slice.actions.removeFavoriteMovieSuccess(response));
      toast.success("Remove favorite movie successful");
      dispatch(getFavoriteListAsync({}));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
    }
  };
export const deleteMovieAsync =
  ({ movieId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/movies/detail/${movieId}`);
      dispatch(slice.actions.deleteMovieSuccess(response));
      toast.success("Delete movie successful");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
    }
  };
export const addMovieAsync = (movie) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/movies", {
      ...movie,
    });
    dispatch(slice.actions.addMovieSuccess(response));
    toast.success("Add favorite movie successful");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error?.response?.data?.errors?.message);
  }
};
export const updateMovieAsync = (movie) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/movies/detail/${movie._id}`, {
      ...movie,
    });
    dispatch(slice.actions.updateMovieSuccess(response));
    toast.success("Update favorite movie successful");
    dispatch(getSingleMovieAsync({ movieId: movie._id }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error?.response?.data?.errors?.message);
  }
};

export default slice.reducer;
