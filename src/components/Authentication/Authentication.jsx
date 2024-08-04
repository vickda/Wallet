import { useState } from "react";
import { Login } from "./Login/Login";
import { Signup } from "./Signup/Signup";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export { Authentication };
