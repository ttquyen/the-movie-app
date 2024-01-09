import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { Button, DialogContent, DialogContentText } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteMovieAsync } from "./movieSlice";

export default function DeleteMovieDialog({ open, setOpen, movie, callback }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteMovie = () => {
    handleClose();
    dispatch(deleteMovieAsync({ movieId: movie._id }));
    callback("OK");
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Delete Movie"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this movie?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDeleteMovie}
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
