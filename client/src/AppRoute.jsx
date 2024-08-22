// src/AppRoutes.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Authentication } from "./components/Authentication/Authentication";
import { Home } from "./components/Home/Home";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import UserProfile from "./components/UserProfile/UserProfile";
import { Navbar } from "./components/Navbar/Navbar";

const AppRoutes = ({ user }) => {
  console.log(user);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect authenticated users to homepage */}
        <Route
          path="/"
          element={
            user ? (
              <Home userName={user.displayName} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route path="/profile" element={<UserProfile />} />

        {/* Log-in route */}
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <Authentication />}
        />

        {/* For 404 Errors */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
