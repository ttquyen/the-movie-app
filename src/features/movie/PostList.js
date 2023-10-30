import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostListAsync } from "./postSlice";
import PostCard from "./PostCard";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";

function PostList({ userId }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, totalPost, isLoading } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]);

  useEffect(() => {
    if (userId) {
      dispatch(getPostListAsync({ userId, page }));
    }
  }, [userId, page, dispatch]);

  return (
    <>
      {posts.map((p) => (
        <PostCard post={p} key={p._id} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPost ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => {
              setPage((page) => page + 1);
            }}
            disabled={Boolean(totalPost) && posts.length >= totalPost}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Post Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default PostList;
