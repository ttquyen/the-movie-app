import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCommentListAsync } from "./commentSlice";
import { COMMENT_PER_POST } from "../../app/config";
import { Pagination, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../pages/LoadingScreen";

function CommentList({ movieId }) {
  console.log(movieId);
  const dispatch = useDispatch();
  const {
    commentsById,
    commentsByMovie,
    currentPage,
    totalComments,
    isLoading,
  } = useSelector(
    (state) => ({
      commentsById: state.comment.commentsById,
      commentsByMovie: state.comment.commentsByMovie[movieId] || [],
      currentPage: state.comment.currentPage,
      totalComments: state.comment.totalComments,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );
  console.log(commentsById, commentsByMovie);
  const totalPage = Math.ceil(totalComments / COMMENT_PER_POST);
  useEffect(() => {
    console.log("movieId", movieId);
    if (movieId) {
      dispatch(getCommentListAsync({ movieId }));
    }
  }, [movieId, dispatch]);

  let renderComments;
  if (commentsByMovie) {
    const comments = commentsByMovie.map((cmtId) => commentsById[cmtId]);
    renderComments = (
      <Stack spacing={1}>
        {comments.map((cmt) => (
          <CommentCard key={cmt._id} comment={cmt} movieId={movieId} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }

  return (
    <Stack spacing={1.5} sx={{ px: 1.5 }}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle2" color="text.secondary">
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? "1 comment"
            : "No comments"}
        </Typography>
        {totalComments > COMMENT_PER_POST && (
          <Pagination
            count={totalPage}
            page={currentPage}
            onChange={(e, page) =>
              dispatch(getCommentListAsync({ movieId, page }))
            }
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  );
}

export default CommentList;
