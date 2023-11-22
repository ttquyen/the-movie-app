import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { Stack } from "@mui/material";

import { Button, DialogContent } from "@mui/material";
import { TextField } from "@mui/material";

export default function TokenDialog({ open, setOpen, callback }) {
  const [token, setToken] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handleClose();
    callback(token);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle id="alert-dialog-title">
          Change Password Verification
        </DialogTitle>
        <DialogContent>
          <Stack>
            <TextField
              fullWidth
              size="small"
              value={token}
              label="Token"
              onChange={(event) => setToken(event.target.value)}
              sx={{
                ml: 1,
                mr: 1,
                "& fieldset": {
                  borderWidth: "1px !important",
                },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
