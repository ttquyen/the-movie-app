import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import MovieDetail from "../pages/MovieDetail";
import RegisterPage from "../pages/RegisterPage";
import CustomMovieListPage from "../pages/CustomMovieListPage";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="popular" element={<HomePage />} />
        <Route path="now_playing" element={<HomePage />} />
        <Route path="upcoming" element={<HomePage />} />
        <Route path="top_rated" element={<HomePage />} />
        <Route path="movies/detail/:id" element={<MovieDetail />}></Route>
        <Route path="my_list" element={<CustomMovieListPage />}></Route>
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
