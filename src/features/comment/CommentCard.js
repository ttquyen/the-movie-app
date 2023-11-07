import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { fToNow } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteCommentDialog from "./DeteleCommentDialog";
import { useDispatch } from "react-redux";
import { getCommentListAsync } from "./commentSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditCommentDialog from "./EditCommentDialog";
import useAuth from "../../hooks/useAuth";
function CommentCard({ comment, movieId }) {
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();
  const handleDeleteDialog = (message) => {
    if (message === "OK") {
      dispatch(getCommentListAsync({ movieId: movieId, page: 1 }));
    }
  };
  const handleEditDialog = (message) => {
    if (message === "OK") {
      dispatch(getCommentListAsync({ movieId: movieId, page: 1 }));
    }
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditComment = () => {
    setOpenEdit(true);
    handleMenuClose();
  };
  const handleDeleteComment = () => {
    setOpenDel(true);
    handleMenuClose();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="comment-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEditComment}>Edit</MenuItem>
      <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
    </Menu>
  );
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          // sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          {user?._id === comment?.author._id && (
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          )}
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary", ml: 2 }}>
          {comment.content}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {fToNow(comment.updatedAt)}
        </Typography>
      </Paper>
      <DeleteCommentDialog
        open={openDel}
        setOpen={setOpenDel}
        comment={comment}
        callback={handleDeleteDialog}
      />
      <EditCommentDialog
        open={openEdit}
        setOpen={setOpenEdit}
        comment={comment}
        callback={handleEditDialog}
      />
      {renderMenu}
    </Stack>
  );
}

export default CommentCard;
