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
  commentsByPost: {
    //"postID1":["cmtID1", "cmtID2"]
  },
  currentPageByPost: {
    //"postID1":2
    //"postID2":1
  },
  totalCommentsByPost: {
    //"postID1":6
    //"postID2":2
  },
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
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { comments, count, page, postId } = action.payload;
      comments.forEach((comment) => {
        state.commentsById[comment._id] = comment;
      });
      state.commentsByPost[postId] = comments.map((cmt) => cmt._id).reverse();
      state.currentPageByPost[postId] = page;
      state.totalCommentsByPost[postId] = count;
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    sendCommentReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, reactions } = action.payload;
      state.commentsById[commentId].reactions = { ...reactions };
    },
  },
});
export const createCommentAsync =
  ({ content, postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", { content, postId });
      dispatch(slice.actions.createCommentSuccess(response.data));
      dispatch(getCommentListAsync({ postId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getCommentListAsync =
  ({ postId, page, limit = COMMENT_PER_POST }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });
      dispatch(
        slice.actions.getCommentSuccess({ ...response.data, postId, page })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sendCommentReactionAsync =
  ({ commentId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/reactions", {
        targetType: "Comment",
        targetId: commentId,
        emoji,
      });
      dispatch(
        slice.actions.sendCommentReactionSuccess({
          reactions: response.data,
          commentId,
        })
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
