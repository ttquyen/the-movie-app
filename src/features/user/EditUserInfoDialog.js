import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { Box, Stack } from "@mui/material";

import { Button, DialogContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { Typography, Avatar } from "@mui/material";
import { updateAccountAsync } from "./userSlice";
import useAuth from "../../hooks/useAuth";

export default function EditUserInfoDialog({ open, setOpen, callback }) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditUserInfo = () => {
    handleClose();
    dispatch(updateAccountAsync({ id: user._id, name }));
    callback("OK");
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle id="alert-dialog-title">{"My Account"}</DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ m: 3 }}
            spacing={3}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                alt={user?.name}
                src={user?.avatarUrl}
                sx={{ width: 80, height: 80 }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  // position: "absolute",
                  left: "50px",
                  bottom: "10px",
                }}
              >
                {user?.email}
              </Typography>
            </Box>
          </Stack>
          <Stack>
            <TextField
              fullWidth
              size="small"
              value={name}
              label="Name"
              onChange={(event) => setName(event.target.value)}
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
          <Button onClick={handleEditUserInfo} autoFocus variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
