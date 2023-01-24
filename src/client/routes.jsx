import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";

export const useRoutes = (isLogin) => {
  if (isLogin) {
    return (
      <React.Fragment>
        <Routes>
          <Route exact path="/" element={<Navigate to="/main" />} />
          <Route exact path="/login" element={<Navigate to="/main" />} />
          <Route exact path="/main" element={<MainPage />} />
        </Routes>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/main" element={<Navigate to="/" />} />
        <Route path="/*" element={<AuthPage />} />
      </Routes>
    </React.Fragment>
  );
};
