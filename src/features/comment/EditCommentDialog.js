import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { Box, Stack } from "@mui/material";

import { Button, DialogContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { updateCommentAsync } from "./commentSlice";
import { Typography, Avatar } from "@mui/material";
import { fDateTime } from "../../utils/formatTime";

export default function EditCommentDialog({
  open,
  setOpen,
  comment,
  callback,
}) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(comment.content || "");
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditComment = () => {
    handleClose();
    dispatch(updateCommentAsync({ content, commentId: comment._id }));
    callback("OK");
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle id="alert-dialog-title">{"Edit Comment"}</DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ m: 1 }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                alt={comment.author?.name}
                src={comment.author?.avatarUrl}
              />
              <Typography
                variant="title2"
                sx={{
                  fontWeight: 600,
                  position: "absolute",
                  left: "50px",
                  bottom: "10px",
                }}
              >
                {comment.author.name}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                position: { xs: "absolute", md: "inherit" },
                top: { xs: "100px" },
                left: { xs: "82px" },
                fontSize: { xs: "12px" },
              }}
            >
              {" "}
              {fDateTime(comment?.updatedAt)}
            </Typography>
          </Stack>
          <TextField
            fullWidth
            size="small"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            sx={{
              ml: 1,
              mr: 1,
              "& fieldset": {
                borderWidth: "1px !important",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditComment} autoFocus variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
