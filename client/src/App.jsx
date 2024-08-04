import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./AppRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Loading from "./components/Loading/Loading";

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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AppRoutes user={user} />
    </>
  );
}

export default App;
