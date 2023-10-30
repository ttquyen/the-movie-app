import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useDispatch } from "react-redux";
import { sendCommentReactionAsync } from "./commentSlice";

function CommentReaction({ comment }) {
  const dispatch = useDispatch();
  const { like, dislike } = comment?.reactions;

  const handleClick = (emoji) => {
    dispatch(sendCommentReactionAsync({ commentId: comment._id, emoji }));
  };
  return (
    <Stack flexDirection="row" alignItems="center">
      <IconButton aria-label="like" onClick={() => handleClick("like")}>
        <ThumbUpOffAltIcon sx={{ fontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography>{like}</Typography>
      <IconButton aria-label="dislike" onClick={() => handleClick("dislike")}>
        <ThumbDownOffAltIcon sx={{ fontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography>{dislike}</Typography>
    </Stack>
  );
}
export default CommentReaction;
