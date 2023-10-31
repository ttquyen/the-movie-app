import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  totalPages: 0,
  movies: [],
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
    sendMovieReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { movieId, reactions } = action.payload;
      state.moviesById[movieId].reactions = { ...reactions };
    },
  },
});

export const getMovieListAsync =
  ({ title, listType, page, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, title };
      const response = await apiService.get(`/movies/lists/${listType}`, {
        params,
      });
      dispatch(slice.actions.getMovieSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendMovieReactionAsync =
  ({ movieId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.movie("/reactions", {
        targetType: "Movie",
        targetId: movieId,
        emoji,
      });
      dispatch(
        slice.actions.sendMovieReactionSuccess({
          reactions: response.data,
          movieId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
