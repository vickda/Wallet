import React, { useState } from "react";
import {
  FaBars,
  FaXmark,
  FaFlipboard,
  FaAddressBook,
  FaUserGroup,
  FaUserGear,
  FaDoorOpen,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

import logo from "../../assets/logo.jpg";
import UserAvatar from "./UserAvatar/UserAvatar";

import "./Navbar.css";

const Navbar = ({ profilePicUrl }) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  // Navbar Options
  const links = [
    {
      id: 0,
      name: "Dashboard",
      location: "/",
      icons: <FaFlipboard className="nav-icon" />,
    },
    {
      id: 1,
      name: "Contacts",
      location: "/contacts",
      icons: <FaAddressBook className="nav-icon" />,
    },
    {
      id: 2,
      name: "Groups",
      location: "/groups",
      icons: <FaUserGroup className="nav-icon" />,
    },
    {
      id: 3,
      name: "User Profile",
      location: "/profile",
      icons: <FaUserGear className="nav-icon" />,
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

  // Go Home When Logo Is Click & Close Hamburger Menu if Opened
  const navigateToDashboard = () => {
    setOpen(false);
    navigate("/");
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
        <div
          className={`nav-logo ${isOpen && "open"}`}
          onClick={navigateToDashboard}
        >
          <img className="nav-logo" src={logo} alt="Logo" />
        </div>
      </div>

      {/* User Avatar Page */}
      <UserAvatar profilePicUrl={profilePicUrl} handleLogout={handleLogout} />

      {/* Panel For Hamburger Menu with Option List */}
      <div className={`panel ${isOpen ? "open" : "close"}`}>
        <ul className="nav-links">
          {links.map(({ id, name, location, icons }) => {
            return (
              <li
                key={id}
                className="nav-link"
                onClick={() => setOpen(!isOpen)}
              >
                {icons}
                <Link to={location} className="nav-link">
                  {name}
                </Link>
              </li>
            );
          })}

          {/* Signout Section */}
          <li className="nav-link" onClick={() => handleLogout()}>
            <p className="nav-link" style={{ padding: "0px" }}>
              <FaDoorOpen className="nav-icon" />
              Signout
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { Navbar };
