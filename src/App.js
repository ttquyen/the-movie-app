import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";
import { MovieProvider } from "./contexts/MovieContext";
import { DrawerProvider } from "./contexts/DrawerContext";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <DrawerProvider>
          <BrowserRouter>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </DrawerProvider>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
