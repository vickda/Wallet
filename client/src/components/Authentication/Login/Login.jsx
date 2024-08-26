import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, provider } from "../../../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import "./Login.css";
import logo from "../../../assets/logo.jpg";
import googleIcon from "../../../assets/google-icon.png";

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Method To Handle Login Via Third Party Auth
  const loginViaAuth = async () => {
    // HANDLE GOOGLE & GITHUB SIGN VIA FIREBASE
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      navigate("/", { replace: true });
      console.log("User:", user);
    } catch (error) {
      displayErrorMessage("Oops Something went wrong. Contact Support");
      console.error("Error signing in:", error.message);
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
        <div className="form login">
          {/* Logo and App Name */}
          <div className="logo-container">
            <img src={logo} alt="App Logo" className="app-logo" />
            <h1 className="app-name">Cashify</h1>
          </div>

          {/* Login Via Github */}
          <div className="button-container">
            <button className="github-button" onClick={() => loginViaAuth()}>
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub logo"
                className="github-logo"
              />
              Sign in with GitHub
            </button>
          </div>

          {/* Login Via Google */}
          <div className="media-options">
            <button onClick={() => loginViaAuth()} className="google-button">
              <img src={googleIcon} alt="" className="google-logo" />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export { Login };
