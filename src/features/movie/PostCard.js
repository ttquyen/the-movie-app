import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fDateTime } from "../../utils/formatTime";
import { Link as RouterLink } from "react-router-dom";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import EditPostDialog from "./EditPostDialog";
import DeletePostDialog from "./DetelePostDialog";
import { useDispatch } from "react-redux";
import { getPostListAsync } from "./postSlice";
import useAuth from "../../hooks/useAuth";

function PostCard({ post }) {
  const { author, updatedAt, image, content, _id } = post;
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditPost = () => {
    handleClose();
    setOpenEdit(true);
  };
  const handleDeletePost = () => {
    handleClose();
    setOpenDel(true);
  };

  const handleCallBack = (message) => {
    if (message === "OK") {
      dispatch(getPostListAsync({ userId: user._id, page: 1 }));
    }
  };
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="avatar"
            src={author?.avatarUrl}
            alt={author?.name}
          />
        }
        action={
          <IconButton aria-label="settings" onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            fontWeight={600}
            to={`/user/${author?._id}`}
          >
            {author.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDateTime(updatedAt)}
          </Typography>
        }
      />
      <Stack spacing={1} sx={{ p: 1 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        {image && (
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt="post image"
            sx={{
              p: 1,
              borderRadius: 2,
              "& img": {
                objectFit: "cover",
                width: 1,
                height: 1,
                overflow: "hidden",
              },
            }}
          />
        )}
        <PostReaction post={post} />
        <CommentList postId={_id} />
        <CommentForm postId={_id} />
      </Stack>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditPost}>Edit</MenuItem>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
      <EditPostDialog
        open={openEdit}
        setOpen={setOpenEdit}
        post={post}
        callback={handleCallBack}
      />
      <DeletePostDialog
        open={openDel}
        setOpen={setOpenDel}
        post={post}
        callback={handleCallBack}
      />
    </Card>
  );
}

export default PostCard;
