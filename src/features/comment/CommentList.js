import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCommentListAsync } from "./commentSlice";
import { COMMENT_PER_POST } from "../../app/config";
import { Pagination, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../pages/LoadingScreen";

function CommentList({ postId }) {
  const dispatch = useDispatch();
  const {
    commentsById,
    commentsByPost,
    currentPage,
    totalComments,
    isLoading,
  } = useSelector(
    (state) => ({
      commentsById: state.comment.commentsById,
      commentsByPost: state.comment.commentsByPost[postId],
      currentPage: state.comment.currentPageByPost[postId] || 1,
      totalComments: state.comment.totalCommentsByPost[postId],
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );
  const totalPage = Math.ceil(totalComments / COMMENT_PER_POST);
  useEffect(() => {
    if (postId) {
      dispatch(getCommentListAsync({ postId }));
    }
  }, [postId, dispatch]);

  let renderComments;
  if (commentsByPost) {
    const comments = commentsByPost.map((cmtId) => commentsById[cmtId]);
    renderComments = (
      <Stack spacing={1}>
        {comments.map((cmt) => (
          <CommentCard key={cmt._id} comment={cmt} postId={postId} />
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
              dispatch(getCommentListAsync({ postId, page }))
            }
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  );
}

export default CommentList;
