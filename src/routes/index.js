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
import VerifyEmailPage from "../pages/VerifyEmailPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="popular" element={<HomePage />} />
        <Route path="now-playing" element={<HomePage />} />
        <Route path="top-rated" element={<HomePage />} />
        <Route path="movies/detail/:id" element={<MovieDetail />}></Route>
      </Route>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="my-list" element={<CustomMovieListPage />}></Route>
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
