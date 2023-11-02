import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { MovieContext } from "../contexts/MovieContext";
import Button from "@mui/material/Button";
import { DrawerContext } from "../contexts/DrawerContext";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function MainHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { user, logout } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();
  const { setMovieTypeCtx } = React.useContext(MovieContext);
  const { setOpenDrawer } = React.useContext(DrawerContext);
  const MOVIE_TYPE = [
    { type: "popular", label: "Popular" },
    { type: "now_playing", label: "Now Playing" },
    { type: "upcoming", label: "Up Coming" },
    { type: "top_rated", label: "Top Rated" },
  ];
  const handleSelectMovieType = (type) => {
    setMovieTypeCtx(type);
    handleMobileMenuClose();
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = async (closeType) => {
    if (closeType === "logout") {
      try {
        await logout(() => {
          navigate("/login");
        });
      } catch (error) {}
    }
    if (closeType === "favorite") {
      navigate("/favorite");
    }
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      <MenuItem onClick={() => handleMenuClose("favorite")}>Profile</MenuItem>
      <MenuItem onClick={() => handleMenuClose("logout")}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {MOVIE_TYPE.map((mvType) => (
        <MenuItem
          key={mvType.type}
          onClick={() => handleSelectMovieType(mvType.type)}
        >
          <Link
            sx={{
              color: "white",
              display: "block",
              m: 2,
            }}
            component={RouterLink}
            to={mvType.type}
          >
            {mvType.label}
          </Link>
        </MenuItem>
      ))}
    </Menu>
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
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
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
            aria-label="open drawer"
            size="large"
            aria-haspopup="true"
            onClick={() => setOpenDrawer(true)}
            color="inherit"
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
          >
            <SearchIcon />
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
                // onClick={() =>
                //     handleSelectMovieType(mvType.type)
                // }
              >
                {mvType.label}
              </Link>
            ))}
          </Box>
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
              {user?.username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
