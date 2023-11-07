import { CssBaseline } from "@mui/material";
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
    lighter: "#34495E",
    light: "#2C3E50",
    main: "#34495E",
    dark: "#263341",
    darker: "#19232d",
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

function ThemeProvider({ children }) {
    const themeOptions = {
        palette: {
            mode: "dark",
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
        },
        shape: { borderRadius: 8 },
    };

    const theme = createTheme(themeOptions);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}

export default ThemeProvider;
