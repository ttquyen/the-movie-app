import * as React from "react";
import Drawer from "@mui/material/Drawer";

export default function AppDrawer({ children, openDrawer, setOpenDrawer }) {
  // const { openDrawer, setOpenDrawer } = React.useContext(DrawerContext);

  const toggleDrawer = () => {
    setOpenDrawer((pre) => !pre);
  };

  return (
    <React.Fragment>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        {children}
      </Drawer>
    </React.Fragment>
  );
}
