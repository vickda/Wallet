import { useState } from "react";
import "./App.css";
import { Authentication } from "./client/components/Authentication/Authentication";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Authentication></Authentication>
    </>
  );
}

export default App;
