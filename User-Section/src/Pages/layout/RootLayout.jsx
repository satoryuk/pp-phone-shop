import { Outlet } from "react-router-dom";
import Navbar from "../home/Navbar";
import { useEffect, useState } from "react";
import Footer from "../home/Footer";

const RootLayout = () => {
  const [token, setToken] = useState(null);

  const handleLogin = () => {
    const newToken = "dummy-token"
    console.log("TOhssadsadsToken" + newToken)
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
    console.log("TOken have been clear")
  };
  useEffect(() => {
    setToken(null)
  })
  return (
    <>
      <header>
        <nav><Navbar token={token} onLogin={handleLogin} onLogout={handleLogout} /></nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;
