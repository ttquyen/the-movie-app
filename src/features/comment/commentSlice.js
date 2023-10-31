import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { COMMENT_PER_POST } from "../../app/config";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {
    //"cmtID1":"content1"
    //"cmtID2":"content2"
  },
  commentsByMovie: {
    //"movieID1":["cmtID1", "cmtID2"]
  },
  currentPage: null,
  totalComments: null,
};
const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { movie, _id } = action.payload;
      state.commentsById[_id] = action.payload;
      state.commentsByMovie[movie].push(_id);
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("REDUCER: Get all comments ");

      const { comments, count, page, movieId } = action.payload;
      comments.forEach((comment) => {
        state.commentsById[comment._id] = comment;
      });
      state.commentsByMovie[movieId] = comments.map((cmt) => cmt._id).reverse();
      state.currentPage = page;
      state.totalComments = count;
    },
    updateCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("REDUCER: Update comment ");
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});
export const createCommentAsync =
  ({ content, movieId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        content,
        movieId,
      });
      dispatch(slice.actions.createCommentSuccess(response.data));
      dispatch(getCommentListAsync({ movieId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getCommentListAsync =
  ({ movieId, page = 1, limit = COMMENT_PER_POST }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/movies/comments/${movieId}`, {
        params,
      });
      dispatch(
        slice.actions.getCommentSuccess({ ...response.data, movieId, page })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deleteCommentAsync = (commentId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/comments/${commentId}`);
    dispatch(slice.actions.deleteCommentSuccess(commentId));
    toast.success("Delete Comment successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export default slice.reducer;
