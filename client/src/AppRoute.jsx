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

const AppRoutes = ({ user }) => {
  console.log(user);

  return (
    <Router>
      <Routes>
        {/* Redirect authenticated users to homepage */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        {/* Log-in route */}
        <Route
          path="/login"
          exact={true}
          element={user ? <Navigate to="/" /> : <Authentication />}
        />

        {/* For 404 Errors */}
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
