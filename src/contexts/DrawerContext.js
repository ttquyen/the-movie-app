import { createContext, useState } from "react";

const initialState = {
  openDrawer: false,
};

const DrawerContext = createContext({ ...initialState });
function DrawerProvider({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

export { DrawerContext, DrawerProvider };
