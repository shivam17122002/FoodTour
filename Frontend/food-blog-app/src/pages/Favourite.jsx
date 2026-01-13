import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsHeartbreak } from "react-icons/bs";

const Favourite = () => {
  const [favItems, setFavItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites when page opens
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fav")) || [];
    setFavItems(data);
    setLoading(false);
  }, []);

  // Remove recipe from favorites (LOGIC UNCHANGED)
  const removeFromFav = (id) => {
    const updatedFavs = favItems.filter((item) => item._id !== id);
    setFavItems(updatedFavs);
    localStorage.setItem("fav", JSON.stringify(updatedFavs));
  };

  return (
    <section
      className="bg-gradient-to-b from-[#F6F5EF] to-[#ECE9DA] py-20 pt-[7%]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12">
          <span className="block text-[11px] font-semibold tracking-[0.3em] uppercase text-[#CF0F0F] mb-2">
            Your Collection
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-stone-800">
            Favorite <span className="text-[#F79A19]">Recipes</span>
          </h1>

          <div className="w-14 h-[3px] bg-[#FFE52A] mt-4 rounded" />
        </div>

        {/* LOADER */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 rounded-full border-4 border-[#CF0F0F]/30 border-t-[#CF0F0F] animate-spin" />
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && favItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BsHeartbreak className="text-5xl text-[#CF0F0F]/60 mb-4" />
            <p className="text-lg font-medium text-stone-800">
              No favorite recipes yet
            </p>
            <p className="text-sm text-stone-700 mt-1">
              Start liking recipes to see them here.
            </p>
          </div>
        )}

        {/* FAVORITE CARDS */}
        {!loading && favItems.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favItems.map((item) => (
              <div
                key={item._id}
                className="bg-white/80 rounded-2xl overflow-hidden border border-white/40 shadow hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="h-52 w-full">
                  <img
                    src={`http://localhost:5000/images/${item.coverImage}`}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-stone-800 leading-snug">
                    {item.title}
                  </h2>

                  <button
                    onClick={() => removeFromFav(item._id)}
                    title="Remove from favorites"
                    className="transition-transform hover:scale-110"
                  >
                    <AiFillLike className="text-2xl text-[#CF0F0F]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Favourite;
