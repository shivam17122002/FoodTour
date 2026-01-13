import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";

const RecipeShowcase = ({
  recipe = [],
  limit = 3,
  checkLogin
}) => {
  // Showing only a small selection (default 3) for a compact home page look
  const displayedRecipes = recipe.slice(0, limit);
  const navigate = useNavigate();
  

  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );
  const toggleFav = (item) => {
    const exists = favItems.some((r) => r._id === item._id);
    const updated = exists
      ? favItems.filter((r) => r._id !== item._id)
      : [...favItems, item];

    setFavItems(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <section className="py-11 bg-[white]/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* SECTION HEADER - More Compact */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-[#CF0F0F] text-[10px] font-black tracking-[0.2em] uppercase mb-1">
              Top Picks
            </h2>
            <h3 className="text-3xl font-extrabold text-stone-800">
              Latest <span className="text-[#F79A19]">Bites</span>
            </h3>
          </div>

          <button
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-stone-500 hover:text-[#CF0F0F] transition-colors group"
            onClick={() => checkLogin() ? navigate("/expRecipes") : alert("Please Login")}
          >
            See All
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* COMPACT RECIPE GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedRecipes.length > 0 ? (
            displayedRecipes.map((item, index) => {

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* COMPACT IMAGE SECTION */}
                  <div className="relative h-44 w-full overflow-hidden">
                    {item.coverImage ? (
                      <img
                        src={`http://localhost:5000/images/${item.coverImage}`}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-stone-50 text-stone-300 text-xs">
                        No Image
                      </div>
                    )}

                    {/* MINI TIME BADGE */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <Clock size={12} className="text-[#F79A19]" />
                      <span className="text-[10px] font-bold text-stone-700">
                        {item.time || "20m"}
                      </span>
                    </div>

                    {/* MINI LIKE BUTTON */}
                    {/* () => toggleFav(item) */}

                    <button
                      onClick={()=> checkLogin() ? toggleFav(item) : alert("Please Login first")}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                      <AiFillLike
                        size={16}
                        className={`transition-colors ${
                          favItems.some((r) => r._id === item._id)
                            ? "text-red-500"
                            : "text-stone-300"
                        }`}
                      />
                    </button>
                  </div>

                  {/* COMPACT CONTENT */}
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-stone-800 leading-tight mb-2 group-hover:text-[#CF0F0F] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-10 text-center text-stone-400 text-sm italic">
              Loading our kitchen favorites...
            </div>
          )}
        </div>

        {/* MOBILE VIEW ALL BUTTON */}
        <div className="mt-8 sm:hidden flex justify-center">
          <button
            className="text-sm font-bold text-[#CF0F0F] flex items-center gap-2"
            onClick={() => navigate("/expRecipes")}
          >
            View All Recipes <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecipeShowcase;
