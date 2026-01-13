import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Model from "./Model";
import LoginForm from "./LoginForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useNavigate();
  // useEffect(() => {
  //   const checkAuth = () => {
  //     const token = localStorage.getItem("token");
  //     setIsAuthenticated(!!token);
  //   };
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors duration-300
     ${isActive ? "text-[#CF0F0F]" : "text-stone-800 hover:text-[#CF0F0F]"}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50
        ${scrolled ? " backdrop-blur-sm" : "bg-[#BBCB64]"}
      `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-[#CF0F0F]">Food</span>
            <span className="text-stone-800">Tour</span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 bg-white/70 px-6 py-2 rounded-full shadow-sm">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>

            {/* Use a function to handle protected links */}
            <NavLink
              to="/favourite"
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                  setIsOpen(true);
                }
              }}
              className={linkClass}
            >
              Favourite
            </NavLink>

            <NavLink
              to="/myRecipe"
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                  setIsOpen(true);
                }
              }}
              className={linkClass}
            >
              My Recipe
            </NavLink>

            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="rounded-full bg-[#CF0F0F] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#b40d0d] transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-full bg-[#CF0F0F] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#b40d0d] transition"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {isOpen && (
        <Model close={() => setIsOpen(false)}>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </Model>
      )}
    </>
  );
};

export default Navbar;
