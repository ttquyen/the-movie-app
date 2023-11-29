import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { Button, DialogContent, DialogContentText } from "@mui/material";
import { useDispatch } from "react-redux";

import { deleteCommentAsync } from "./commentSlice";

export default function DeleteCommentDialog({
  open,
  setOpen,
  comment,
  callback,
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteComment = () => {
    handleClose();
    dispatch(deleteCommentAsync(comment._id));
    callback("OK");
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Delete Comment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDeleteComment}
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
