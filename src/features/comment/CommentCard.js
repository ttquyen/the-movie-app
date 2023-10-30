import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { fDateTime } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteCommentDialog from "./DeteleCommentDialog";
import { useDispatch } from "react-redux";
import { getCommentListAsync } from "./commentSlice";
function CommentCard({ comment, postId }) {
  const [openDel, setOpenDel] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (message) => {
    if (message === "OK") {
      dispatch(getCommentListAsync({ postId: postId, page: 1 }));
    }
  };
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Stack>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDateTime(comment.createdAt)}
            </Typography>
            <IconButton onClick={() => setOpenDel(true)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
      <DeleteCommentDialog
        open={openDel}
        setOpen={setOpenDel}
        comment={comment}
        callback={handleDelete}
      />
    </Stack>
  );
}

export default CommentCard;
