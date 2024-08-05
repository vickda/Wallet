import { useState } from "react";
import "../Authentication.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/firebaseConfig";

const Signup = ({ setIsLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPass) {
      return displayErrorMessage("Error: Enter ALL Fields");
    }

    if (password !== confirmPass) {
      return displayErrorMessage("Error: Both Passwords Must Match");
    }

    // Create User in Firebase
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      displayErrorMessage(error.message);
    }
  };

  // Method To Display Error Messages
  const displayErrorMessage = (errorMessage) => {
    setError(errorMessage);
    setIsError(true);

    setTimeout(() => {
      setIsError(false);
    }, 2500);
  };

  return (
    <>
      <section className="container forms">
        <div className="form signup">
          <div className="form-content">
            <header>Signup</header>
            <form action="#">
              <div className="name-field">
                {/* Input for First Name */}
                <input
                  type="text"
                  placeholder="First Name"
                  className="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {/* Input for Last Name */}
                <input
                  type="text"
                  placeholder="Last Name"
                  className="name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="field input-field">
                {/* Input for Email */}
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field input-field">
                {/* Input for Password */}
                <input
                  type="password"
                  placeholder="Create password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="field input-field">
                {/* Input for Confirm Password */}
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              {isError && <p className="error-message">{error}</p>}

              <div className="field button-field">
                {/* Signup Button */}
                <button onClick={(e) => handleSignup(e)}>Signup</button>
              </div>
            </form>
            <div className="form-link">
              <span>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#0171d3",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Signup };
