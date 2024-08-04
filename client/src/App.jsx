import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./AppRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  console.log(user, "from app");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppRoutes user={user} />
    </>
  );
}

export default App;
