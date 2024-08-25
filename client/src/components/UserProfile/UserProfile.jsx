import React, { useState } from "react";
import "./UserProfile.css";
import { Navbar } from "../Navbar/Navbar";

const UserProfile = ({ profilePicUrl }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      firstName,
      lastName,
      email,
    });
  };

  return (
    <>
      <div className="user-profile-container">
        <div className="user-profile">
          <form onSubmit={handleSubmit} className="user-profile-form">
            {/* PROFILE PICTURE */}
            <div className="image-column">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="profile-image"
              />
            </div>
            <div className="data-column">
              {/* FIRST NAME FORM GROUP */}
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              {/* LAST NAME FORM GROUP */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              {/* EMAIL FORM GROUP */}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  disabled={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* SAVE BUTTON */}
              <button type="submit" className="submit-btn">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
