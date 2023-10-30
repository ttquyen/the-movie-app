import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { Button, DialogContent, DialogContentText } from "@mui/material";
import { useDispatch } from "react-redux";

import { deletePostAsync } from "./postSlice";

export default function DeletePostDialog({ open, setOpen, post, callback }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeletePost = () => {
    dispatch(deletePostAsync(post._id));
    callback("OK");
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDeletePost}
            autoFocus
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
