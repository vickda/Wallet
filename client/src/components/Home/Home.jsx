const Home = ({ userName }) => {
  console.log(userName);

  return (
    <>
      <h1>Welcome {userName || "User"} To The Dashboard</h1>
    </>
  );
};

export { Home };
