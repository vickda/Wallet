import { useState } from "react";
import "../Authentication.css";

const Signup = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    console.log(email, password, confirmPass);
  };

  return (
    <>
      <section className="container forms">
        <div className="form signup">
          <div className="form-content">
            <header>Signup</header>
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
                  placeholder="Create password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>
              <div className="field button-field">
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
