import { useState } from "react";
import { Login } from "./Login/Login";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Login setIsLogin={setIsLogin} />
    </>
  );
};

export { Authentication };
