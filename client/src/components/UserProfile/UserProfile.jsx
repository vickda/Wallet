import React, { useState } from "react";
import "./UserProfile.css";
import { Navbar } from "../Navbar/Navbar";

const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      firstName,
      lastName,
      email,
      image,
    });
  };

  return (
    <>
      <div className="user-profile-container">
        <form onSubmit={handleSubmit} className="user-profile-form">
          <div className="image-column">
            {image ? (
              <img src={image} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-placeholder">
                <p>No Image</p>
              </div>
            )}
          </div>
          <div className="data-column">
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
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUpload" className="custom-file-upload">
                Upload Profile Picture
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <button type="submit" className="submit-btn">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
