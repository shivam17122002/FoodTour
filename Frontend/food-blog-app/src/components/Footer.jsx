import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {

  return (
    <footer className="mt-0 bg-[#BBCB64] text-stone-800 py-1">
      {/* TOP ROW */}
      <div
        className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full bg-[#CF0F0F] flex items-center justify-center font-extrabold text-white"
          >
            F
          </div>
          <span className="text-xl font-bold tracking-wide">
            Food<span className="text-[#CF0F0F]">Tour</span>
          </span>
        </div>

        {/* Navigation */}
        <nav>
          <ul
            className="flex flex-wrap items-center gap-6 text-sm font-medium"
          >
            {[
              { path: "/", label: "Home" },
              { path: "/", label: "Favourite"},
              { path: "/", label: "My Recipe"},
              { path: "/", label: "About"},
              { path: "/", label: "Contact" },
            ]
           
            .map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  // onClick={(e) =>{ if(!checkLogin()) {e.preventDefault(); alert("Please Login")}}}
                  className="transition-colors text-stone-800/80 hover:text-[#CF0F0F]"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {[
            { icon: <FaGithub />, label: "GitHub", path: "https://github.com/shivam17122002"},
            { icon: <FaLinkedin />, label: "LinkedIn", path: "https://www.linkedin.com/in/shivmpandey02"},
            { icon: <FaCode />, label: "Codilo", path: "https://codolio.com/profile/Shivam17122002"},
          ].map((item, idx) => (
            <a
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
              href={item.path}
              aria-label={item.label}
              className="h-10 w-10 rounded-full bg-[#CF0F0F]/10 flex items-center justify-center text-lg transition-all duration-300 hover:bg-[#F79A19] hover:text-white"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-stone-800/20" />

      {/* BOTTOM TEXT */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-stone-800/70 mb-0">
        © {new Date().getFullYear()} FoodTour.{" "}
        <NavLink
          to={"/AllRightsReserved"}
          className="hover:text-[#CF0F0F] transition-colors"
        >
          All rights reserved.
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
