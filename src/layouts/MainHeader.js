import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const navbarItems = [
  {
    label: "Movies",
    id: "movies",
    menuItems: ["popular", "now playing", "upcomming", "toprated"],
  },
  {
    label: "TV Shows",
    id: "tvshows",
    menuItems: ["popular", "airingtoday", "onTV", "toprated"],
  },
  {
    label: "People",
    id: "people",
    menuItems: ["popular", "upcomming", "toprated"],
  },
  {
    label: "More",
    id: "more",
    menuItems: ["popular", "nowplaying"],
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function MainHeader() {
  const { user } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNavItem, setAnchorElNavItem] = React.useState(
    new Array(4).fill(null)
  );

  // console.log(first);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log(event);
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenNavBarMenu = (event, index, b) => {
    let tmpArr = [...anchorElNavItem];
    tmpArr.splice(index, 1, event.currentTarget);
    console.log(b);
    setAnchorElNavItem([...tmpArr]);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseNavBarMenu = () => {
    let tmpArr = new Array(4).fill(null);
    setAnchorElNavItem([...tmpArr]);
    console.log("leave");
  };
  const handleClickNavBar = (nbItem) => {
    console.log(nbItem);
  };
  const NavBarItemWithMenu = () => {};

  // return (
  //   <Box>
  //     <AppBar position="static">
  //       <Toolbar variant="dense">
  //         <IconButton
  //           edge="start"
  //           color="inherit"
  //           aria-label="menu"
  //           sx={{ mr: 2 }}
  //         >
  //           <Logo />
  //         </IconButton>
  //         {/* <Typography variant="h6" color="inherit" component="div">
  //           The Movie App
  //         </Typography> */}
  //         <Box sx={{ flexGrow: 1 }} />
  //         <Typography variant="h6" color="inherit" component="div">
  //           Welcome {user?.username}!
  //         </Typography>
  //       </Toolbar>
  //     </AppBar>
  //   </Box>
  // );
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 2, display: { xs: "none", md: "flex" } }}
          >
            <Logo />
          </IconButton>
          {/* FOR MOBILE */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-nav-bar-mobile"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNavItem)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navbarItems.map((nbItem) => (
                <MenuItem
                  key={nbItem.id}
                  onClick={handleOpenNavBarMenu}
                  onMouseOver={handleOpenNavBarMenu}
                  onMouseOut={handleCloseNavBarMenu}
                >
                  <Typography textAlign="center">{nbItem.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* CENTER ICON FOR MOBILE */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Logo />
          </IconButton>
          {/* MAIN NAVBAR */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navbarItems.map((nbItem, index) => (
              <>
                <Button
                  key={nbItem.id}
                  onClick={(event) => handleOpenNavBarMenu(event, index)}
                  onMouseEnter={(event) =>
                    handleOpenNavBarMenu(event, index, "enter")
                  }
                  // NEED TO CHECK
                  // onMouseLeave={handleCloseNavBarMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {nbItem.label}
                </Button>
                <Menu
                  sx={{ mt: "45px" }}
                  id={"menu" + nbItem.id}
                  anchorEl={anchorElNavItem?.at(index)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElNavItem?.at(index))}
                  onClose={handleCloseNavBarMenu}
                >
                  {nbItem?.menuItems.map((i) => (
                    <MenuItem
                      key={i + nbItem.id + index}
                      onClick={handleCloseNavBarMenu}
                    >
                      <Typography textAlign="center">{i}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ))}
          </Box>
          {/* AVATAR */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h6" color="inherit" component="div">
              {user?.username}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
