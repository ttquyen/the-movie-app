import React from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { CssBaseline, alpha, createTheme } from "@mui/material";
import customizeComponentTheme from "./customizations";
function ThemeProvider({ children }) {
  const PRIMARY = {
    lighter: "#790252",
    light: "#FFFB73",
    main: "#00d473",
    dark: "#177b4d",
    darker: "#AA5D1A",
    contrastText: "#FFF",
  };
  const SECONDARY = {
    lighter: "#D6E4FF",
    light: "#84A9FF",
    main: "#3366FF",
    dark: "#1939B7",
    darker: "#091A7A",
    contrastText: "#FFF",
  };
  const SUCCESS = {
    lighter: "#E9FCD4",
    light: "#AAF27F",
    main: "#54D62C",
    dark: "#229A16",
    darker: "#08660D",
    contrastText: "#FFF",
  };

  const GREY = {
    0: "#FFFFFF",
    100: "#F9FAFB",
    200: "#F4F6F8",
    300: "#DFE3E8",
    400: "#C4CDD5",
    500: "#919EAB",
    600: "#637381",
    700: "#454F5B",
    800: "#212B36",
    900: "#161C24",
    500_8: alpha("#919EAB", 0.08),
    500_12: alpha("#919EAB", 0.12),
    500_16: alpha("#919EAB", 0.16),
    500_24: alpha("#919EAB", 0.24),
    500_32: alpha("#919EAB", 0.32),
    500_48: alpha("#919EAB", 0.48),
    500_56: alpha("#919EAB", 0.56),
    500_80: alpha("#919EAB", 0.8),
  };

  const themeOptions = {
    palette: {
      mode: "dark",
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      text: {
        primary: GREY[100],
        secondary: GREY[300],
        disabled: GREY[600],
      },
      background: { paper: "#0c131b", default: "#0c131b", neutral: "#0e161e" },
      action: {
        // active: ,
        active: PRIMARY.main,
        hover: PRIMARY.dark,
        selected: "#306425",
        disabled: GREY["700"],
        disabledBackground: "#5F7161",
        focus: "#D8E9A8",
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 8 },
  };
  const theme = createTheme(themeOptions);
  theme.components = customizeComponentTheme(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
