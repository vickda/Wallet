import "../Authentication.css";
import googleIcon from "../../../assets/google-icon.png";
import { useState } from "react";
import { auth, provider } from "../../../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      console.error("Error signing in:", error.message);
    }
  };

  // Handle Login & Password Authentication
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return displayErrorMessage("Error: Enter Both Fields");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
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
      {isForgotPass ? (
        // FORGOT PASSWORD FORM
        <section className="container forms">
          <div className="form login">
            <div className="form-content">
              <header>Reset Password</header>

              {/* Login Form */}
              <form action="#">
                <div className="field input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <p className="error-message">{error}</p>

                <div className="form-link">
                  <button
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#0171d3",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsForgotPass(false);
                      setIsError(false);
                    }}
                  >
                    Login Here
                  </button>
                </div>
                <div className="field button-field">
                  <button onClick={(e) => handleLogin(e)}>
                    Send Password Reset Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        // LOGIN FORM
        <section className="container forms">
          <div className="form login">
            <div className="form-content">
              <header>Login</header>

              {/* Login Form */}
              <div>
                <div className="field input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="bx bx-hide eye-icon"></i>
                </div>
                <div className="form-link">
                  <button
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#0171d3",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsForgotPass(true);
                      setIsError(false);
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {isError && <p className="error-message">{error}</p>}
                <div className="field button-field">
                  <button onClick={(e) => handleLogin(e)}>Login</button>
                </div>
              </div>

              {/* Signup Button */}
              <div className="form-link">
                <span>
                  Don't have an account?{" "}
                  <button
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#0171d3",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsLogin(false)}
                    className="signupBtn"
                  >
                    Signup
                  </button>
                </span>
              </div>
            </div>
            <div className="line"></div>

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
      )}
    </>
  );
};

export { Login };
