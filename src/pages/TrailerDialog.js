import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
function TrailerDialog({ open, setOpen, video }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">{"Official Trailer"}</DialogTitle>
      <DialogContent>
        <iframe
          width="100%"
          height="315"
          src={video}
          title="Youtube Player"
          frameborder="0"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
}

export default TrailerDialog;
