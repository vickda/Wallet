import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import "./UserAvatar.css"; // Import the CSS file

const UserAvatar = ({ profilePicUrl, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuReference = useRef(null);
  const profileButtonReference = useRef(null);

  // Event listener to close the menu when a click occurs outside of it
  useEffect(() => {
    const handleMouseClick = (event) => {
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
      {/* Profile button that toggles the visibility of the sign-out menu */}
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

      {/* Sign-out menu that appears when the profile button is clicked */}
      <div
        ref={menuReference}
        className={`sign-out-menu ${showMenu ? "show" : ""}`}
      >
        {/* Sign-out button that triggers the logout process */}
        <button className="sign-out-button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserAvatar;
