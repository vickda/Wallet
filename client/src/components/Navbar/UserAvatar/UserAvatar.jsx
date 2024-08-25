import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase/firebaseConfig";

import "./UserAvatar.css"; // Import the CSS file

const UserAvatar = ({ profilePicUrl }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuReference = useRef(null);
  const profileButtonReference = useRef(null);

  // Handle Signout when Signout button is clicked
  const handleLogout = () => {
    try {
      signOut(auth);
      Navigate({ to: "/signin" });
    } catch (error) {
      console.log("Unable to Signout", error.message);
    }
  };

  useEffect(() => {
    const handleMouseClick = (event) => {
      console.log(event.target);
      if (
        menuReference.current &&
        !menuReference.current.contains(event.target) &&
        profileButtonReference.current &&
        !profileButtonReference.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mouseup", handleMouseClick);

    return () => {
      document.removeEventListener("mouseup", handleMouseClick);
    };
  }, []);

  return (
    <div className="navbar-profile">
      <button
        ref={profileButtonReference}
        className="profile-button"
        onClick={() => setShowMenu(!showMenu)}
      >
        {profilePicUrl ? (
          <img src={profilePicUrl} alt="Profile" className="profile-pic" />
        ) : (
          <FaUserCircle size={40} />
        )}
      </button>
      <div
        ref={menuReference}
        className={`sign-out-menu ${showMenu ? "show" : ""}`}
      >
        <button className="sign-out-button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserAvatar;
