import React from "react";
import "./UserProfile.css";

const UserProfile = ({ displayName, email, phoneNumber, profilePicUrl }) => {
  displayName = displayName || "No Name Found";
  email = email || "No Email Found";
  phoneNumber = phoneNumber || "123-123-1234";

  return (
    <>
      <div className="user-profile-container">
        <div className="user-profile">
          <form className="user-profile-form">
            {/* PROFILE PICTURE */}
            <div className="image-column">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="profile-image"
              />
            </div>
            <div className="data-column">
              {/* NAME FORM GROUP */}
              <div className="form-group">
                <label htmlFor="displayName">Name:</label>
                <input
                  type="text"
                  disabled={true}
                  id="displayName"
                  value={displayName}
                />
              </div>
              {/* Phone Number FORM GROUP */}
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  disabled={true}
                  id="phoneNumber"
                  value={phoneNumber}
                />
              </div>
              {/* EMAIL FORM GROUP */}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" disabled={true} value={email} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
