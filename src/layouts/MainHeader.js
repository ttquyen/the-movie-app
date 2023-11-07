import * as React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Stack,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import EditUserInfoDialog from "../features/user/EditUserInfoDialog";
import { getCurrentUserProfile } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import AppDrawer from "../components/AppDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import AppSearch from "../components/AppSearch";
export default function MainHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useAuth();
  const [openEditUserDialog, setOpenEditUserDialog] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const dispatch = useDispatch();
  const MOVIE_TYPE = [
    { type: "popular", label: "POPULAR" },
    { type: "now_playing", label: "NOW PLAYING" },
    { type: "top_rated", label: "TOP RATED" },
  ];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async (closeType) => {
    if (closeType === "logout") {
      try {
        await logout(() => {
          navigate("/login");
        });
      } catch (error) {}
    } else if (closeType === "rated") {
      navigate("/my_list");
    } else if (closeType === "info") {
      setOpenEditUserDialog(true);
    }
    setAnchorEl(null);
  };
  const handeleCloseDrawer = ({ target }) => {
    navigate(target);
    setOpenDrawer(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose("info")}>My Account</MenuItem>
      <MenuItem onClick={() => handleMenuClose("rated")}>
        My Movie Lists
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose("logout")}>Logout</MenuItem>
    </Menu>
  );

  const mobileListTypeMenu = "primary-search-account-menu-mobile";
  const rendeListTypeMobileMenu = (
    <AppDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
      <Box sx={{ pt: 4 }}>
        <Stack sx={{ px: 1 }}>
          <AppSearch />
        </Stack>
        <List>
          {MOVIE_TYPE.map((mvType) => (
            <ListItem
              key={mvType.type}
              disablePadding
              onClick={() => handeleCloseDrawer({ target: mvType.type })}
            >
              <ListItemButton>
                <Link
                  sx={{
                    display: "block",
                    m: 2,
                    borderBottom: "1px solid #00AB55",
                  }}
                  component={RouterLink}
                  to={mvType.type}
                >
                  {mvType.label}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </AppDrawer>
  );

  const handleUpdateUserInfoDialog = (message) => {
    if (message === "OK") {
      dispatch(getCurrentUserProfile());
    }
  };
  const renderEditUserDialog = (
    <EditUserInfoDialog
      open={openEditUserDialog}
      setOpen={setOpenEditUserDialog}
      callback={handleUpdateUserInfoDialog}
    />
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* LEFT-TOP MENU ICON  */}
          <IconButton
            edge="start"
            aria-label="open drawer"
            size="large"
            aria-controls={mobileListTypeMenu}
            aria-haspopup="true"
            onClick={() => setOpenDrawer(true)}
            color="inherit"
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Logo />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Logo />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {MOVIE_TYPE.map((mvType) => (
              <Link
                sx={{
                  color: "white",
                  display: "block",
                  m: 2,
                }}
                component={RouterLink}
                to={mvType.type}
                key={mvType.type}
              >
                {mvType.label}
              </Link>
            ))}
          </Box>

          {user ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{ pl: 1, display: { xs: "none", md: "flex" } }}
              >
                {user?.name}
              </Typography>
            </Box>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
            // <Link
            //   sx={{
            //     color: "white",
            //     display: "block",
            //     m: 2,
            //   }}
            //   component={RouterLink}
            //   to="/login"
            // >
            //   Login
            // </Link>
          )}
        </Toolbar>
      </AppBar>
      {rendeListTypeMobileMenu}
      {renderMenu}
      {renderEditUserDialog}
    </Box>
  );
}
