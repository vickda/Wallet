import { Navbar } from "../Navbar/Navbar";
import "./Home.css";

const Home = ({ userName }) => {
  const links = [
    {
      id: 1,
      name: "People",
      location: "/",
    },
    {
      id: 2,
      name: "Groups",
      location: "/group",
    },
    {
      id: 3,
      name: "User Profile",
      location: "/profile",
    },
  ];

  return (
    <>
      <Navbar links={links} />
      <h1>Welcome {userName || "User"} To The Dashboard</h1>
    </>
  );
};

export { Home };
