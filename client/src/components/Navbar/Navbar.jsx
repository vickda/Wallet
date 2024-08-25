import React, { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

import logo from "../../assets/logo.jpg";
import UserAvatar from "./UserAvatar/UserAvatar";

import "./Navbar.css";

const Navbar = ({ profilePicUrl }) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const links = [
    {
      id: 1,
      name: "People",
      location: "/",
    },
    {
      id: 2,
      name: "Groups",
      location: "/group",
    },
    {
      id: 3,
      name: "User Profile",
      location: "/profile",
    },
  ];

  // Toggle the visibility of the hamburger menu when the button is clicked
  const toggleHamburgerMenu = () => {
    setOpen(!isOpen);
  };

  // Handle Signout when Signout button is clicked
  const handleLogout = () => {
    try {
      signOut(auth);

      // Navigate back to Signin
      navigate("/signin");
    } catch (error) {
      console.log("Unable to Signout", error.message);
    }
  };

  return (
    <nav className="navbar">
      {/* Hamburger & Logo Container */}
      <div className="icon-burgermenu-container">
        <div
          onClick={toggleHamburgerMenu}
          className={`nav-hamburgericon ${isOpen && "open"}`}
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </div>
        <Link to="/" className={`nav-logo ${isOpen && "open"}`}>
          <img className="nav-logo" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* User Avatar Page */}
      <UserAvatar profilePicUrl={profilePicUrl} handleLogout={handleLogout} />

      {/* Panel For Hamburger Menu with Option List */}
      <div className={`panel ${isOpen ? "open" : "close"}`}>
        <ul className="nav-links">
          {links.map(({ id, name, location }) => {
            return (
              <li
                key={id}
                className="nav-link"
                onClick={() => setOpen(!isOpen)}
              >
                <Link to={location} className="nav-link">
                  {name}
                </Link>
              </li>
            );
          })}

          {/* Signout Section */}
          <li className="nav-item" onClick={() => handleLogout()}>
            <p className="nav-link" style={{ padding: "0px" }}>
              Signout
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { Navbar };
