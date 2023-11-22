import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { createCommentAsync } from "./commentSlice";
import { useNavigate } from "react-router-dom";

function CommentForm({ movieId }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else if (!user.verified) {
      navigate("/verify-email");
    } else {
      dispatch(createCommentAsync({ content, movieId }));
      setContent("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack flexDirection="row" alignItems="center">
        <Avatar src={user?.avatarUrl} alt={user?.name} />
        <TextField
          fullWidth
          size="small"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: "1px !important",
            },
          }}
        />
        <IconButton type="submit" onClick={(e) => handleSubmit(e)}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Stack>
    </form>
  );
}

export default CommentForm;
