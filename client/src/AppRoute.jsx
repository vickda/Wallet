// src/AppRoutes.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
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
      <Routes>
        {/* LOGIN */}
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <Authentication />}
        />

        {/* 404 MISSING */}
        <Route path="*" element={<PageNotFound />} />

        {/* Routes For All Pages with Navbar*/}
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          {/* HOME */}
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

          {/* USER PROFILE */}
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
