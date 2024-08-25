import { Navbar } from "../Navbar/Navbar";
import "./Home.css";

const Home = ({ userName }) => {
  return (
    <>
      <h1>Welcome {userName || "User"} To The Dashboard</h1>
    </>
  );
};

export { Home };
