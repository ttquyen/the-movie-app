import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { Button, DialogContent, DialogContentText } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFavoriteMovieAsync } from "./movieSlice";

export default function RemoveFavoriteDialog({ open, setOpen, movie }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemove = () => {
    handleClose();
    dispatch(removeFavoriteMovieAsync({ movieId: movie._id }));
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove this favorite movie from list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleRemove}
            autoFocus
            color="error"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
