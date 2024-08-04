import "../Authentication.css";
import googleIcon from "../../../assets/google-icon.png";
import facebookIcon from "../../../assets/fb-icon.png";
import { useState } from "react";

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPass, setIsForgotPass] = useState(false);

  // Method To Handle Login Via Third Party Auth
  const loginViaAuth = (type) => {
    if (type === "Google") {
      console.log("Google Auth");
    } else if (type === "Facebook") {
      console.log("Facebook Auth");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <>
      {isForgotPass ? (
        <section className="container forms">
          <div className="form login">
            <div className="form-content">
              <header>Login</header>

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

                <div className="form-link">
                  <button
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#0171d3",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsForgotPass(false)}
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
        <section className="container forms">
          <div className="form login">
            <div className="form-content">
              <header>Login</header>

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
                    onClick={() => setIsForgotPass(true)}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="field button-field">
                  <button onClick={(e) => handleLogin(e)}>Login</button>
                </div>
              </form>

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

            {/* Login Via Facebook */}
            <div className="media-options">
              <button
                onClick={() => loginViaAuth("Facebook")}
                className="field facebook"
              >
                <img
                  src={facebookIcon}
                  className="bx bxl-facebook facebook-icon"
                ></img>
                <span>Login with Facebook</span>
              </button>
            </div>

            {/* Login Via Google */}
            <div className="media-options">
              <button
                onClick={() => loginViaAuth("Google")}
                className="field google"
              >
                <img src={googleIcon} alt="" className="google-img" />
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
