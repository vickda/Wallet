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
import { Contacts } from "./components/Contacts/Contacts";

const AppRoutes = ({ user }) => {
  let profilePicUrl, displayName, email, phoneNumber;

  // Destructure Values from User Data & set them for use
  if (user) {
    ({ displayName, email, phoneNumber } = user);
    profilePicUrl = `https://robohash.org/${user.uid}.png?set=set2`;
  }

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
              <Navbar profilePicUrl={profilePicUrl} />
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
          <Route
            path="/profile"
            element={
              <UserProfile
                displayName={displayName}
                email={email}
                phoneNumber={phoneNumber}
                profilePicUrl={profilePicUrl}
              />
            }
          />

          {/* USER PROFILE */}
          <Route path="/contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
