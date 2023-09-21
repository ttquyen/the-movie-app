import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
