import React, { useState } from "react";
import { motion } from "framer-motion";
import RecipeItems from "../components/RecipeItems";
import { useNavigate } from "react-router-dom";
import Model from "../components/Model";
import LoginForm from "../components/LoginForm";
import heroBg from "../assets/heroSection.jpg";
import { Utensils, ChevronRight, ChefHat } from "lucide-react";
import FeaturesSection from "../components/FeaturesSection";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    token ? setLogin(true) : setLogin(false);
    const loggedIn = !!token;
    return loggedIn;
  };

  const addRecipe = () => {
    const token = localStorage.getItem("token");
    token ? navigate("/addRecipe") : setIsOpen(true);
  };

  return (
    <div className="bg-[#BBCB64] overflow-hidde">
      {/* ================= HERO ================= */}
      <section className="relative pt-[7%] pb-20 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto relative group">
          {/* Main Visual Container */}
          <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden rounded-[48px] shadow-2xl">
            <img
              src={heroBg}
              alt="Easy home cooking"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dynamic Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid lg:grid-cols-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="text-white"
                >
                  <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#FFE52A] text-[#1D1D1D] font-bold text-xs uppercase tracking-[0.2em]">
                    <Utensils size={14} />
                    <span>Home-style recipes</span>
                  </div>

                  <h1 className="text-5xl text-[#CF0F0F] md:text-7xl xl:text-8xl font-black leading-[1] mb-6 drop-shadow-sm">
                    Easy <span className="text-stone-600">Home</span> <br />
                    <span className="text-stone-600">Cooking</span>
                  </h1>

                  <p className="mt-4 text-lg md:text-xl text-white/80 max-w-lg leading-relaxed mb-10">
                    Discover simple, comforting recipes shared by people who
                    love cooking. Save favorites and share your own creations.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      className="px-8 py-4 rounded-2xl bg-[#CF0F0F] text-white font-bold hover:bg-[#b00d0d] transition-all flex items-center gap-2 group/btn shadow-xl shadow-red-900/20 cursor-pointer"
                      onClick={() => {
                        if (checkLogin()) {
                          navigate("/expRecipes");
                        } else {
                          alert("Please Login");
                        }
                      }}
                    >
                      Explore Recipes
                      <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>

                    <button
                      className="px-8 py-4 rounded-2xl border-2 border-white/30 backdrop-blur-md text-white font-bold hover:bg-white hover:text-[#1D1D1D] transition-all cursor-pointer"
                      onClick={addRecipe}
                    >
                      Share Your Recipe
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom floating labels for desktop */}
            <div className="absolute bottom-10 right-10 hidden xl:flex gap-4">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] flex items-center gap-4">
                <div className="bg-[#FFE52A] p-3 rounded-2xl text-[#1D1D1D]">
                  <ChefHat size={24} />
                </div>
                <div>
                  <p className="text-white font-black text-xl leading-none">
                    120+
                  </p>
                  <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest mt-1">
                    Experts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <div>
        <FeaturesSection />
      </div>

      <RecipeItems recipe={recipe} checkLogin={checkLogin} />

      {/* ================= LOGIN MODAL ================= */}
      {isOpen && (
        <Model close={() => setIsOpen(false)}>
          <LoginForm setIsOpen={setIsOpen} />
        </Model>
      )}
    </div>
  );
};

export default Home;
