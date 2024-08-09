import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

const Navbar = ({ links }) => {
  const [open, setOpen] = useState(false);
  console.log(links);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    try {
      signOut(auth);
      Navigate({ to: "/signin" });
    } catch (error) {
      console.log("Unable to Signout", error.message);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img className="nav-logo" src={logo} alt="Logo" />
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links nav-active" : "nav-links"}>
        {links.map(({ id, name, location }) => {
          return (
            <li key={id} className="nav-item">
              <Link to={location} className="nav-link" onClick={closeMenu}>
                {name}
              </Link>
            </li>
          );
        })}

        <li className="nav-item " onClick={() => handleLogout()}>
          <p className="nav-link" style={{ padding: "0px" }}>
            Signout
          </p>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
