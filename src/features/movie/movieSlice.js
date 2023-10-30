import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
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
      console.log(action.payload);
      const { totalPages, movies } = action.payload;
      state.movies = movies;
      state.totalPages = totalPages;
      // // filter duplicate movie before push new page to current page
      // movies.forEach((movie) => {
      //   state.moviesById[movie._id] = movie;
      //   if (!state.currentPageMovies.includes(movie._id)) {
      //     state.currentPageMovies.push(movie._id);
      //   }
      // });
      // state.totalMovie = count;
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
