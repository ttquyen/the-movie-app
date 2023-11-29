import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
function TrailerDialog({ open, setOpen, video }) {
  const handleClose = () => {
    setOpen(false);
  };
  const trailerUrl = `https://www.youtube.com/embed/${video?.key}`;
  return (
    <Dialog open={open} onClose={handleClose} fullWidth sx={{ p: 0 }}>
      <DialogTitle id="alert-dialog-title">{"Official Trailer"}</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <iframe
          width="100%"
          height="315"
          src={trailerUrl}
          title="Youtube Player"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
}

export default TrailerDialog;
