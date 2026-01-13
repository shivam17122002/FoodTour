import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsStopwatchFill } from "react-icons/bs";
import RecipeModal from "../components/RecipeModal";

const ExploreRecipes = ({ recipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );

  if (!recipe || recipe.length === 0) {
    return (
      <p className="text-center text-stone-700 mt-24 text-lg">
        No recipes available 🍽️
      </p>
    );
  }

  const toggleFav = (item) => {
    const exists = favItems.some((r) => r._id === item._id);
    const updated = exists
      ? favItems.filter((r) => r._id !== item._id)
      : [...favItems, item];

    setFavItems(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <section className="bg-[#BBCB64] min-h-screen py-16 pt-[7%]">
      <div className="max-w-7xl mx-auto px-6">
       
        <div className="mb-14 text-center relative">
          {/* Accent pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE52A] text-stone-800 text-sm font-medium shadow-sm">
            🍽 Curated Recipes
          </div>

          {/* Main heading */}
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">
            Explore{" "}
            <span className="text-[#CF0F0F] relative">
              Recipes
              <span className="absolute -bottom-1 left-0 w-full h-[4px]  rounded-full"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl mx-auto text-stone-600 text-base md:text-lg leading-relaxed">
            Discover thoughtfully crafted recipes, designed for everyday cooking
            and unforgettable taste.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipe.map((item) => (
            <article
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52">
                {item.coverImage ? (
                  <img
                    src={`http://localhost:5000/images/${item.coverImage}`}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full bg-stone-100 flex items-center justify-center text-stone-400">
                    No Image
                  </div>
                )}

                {/* Like Button */}
                <button
                  onClick={() => toggleFav(item)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <AiFillLike
                    className={`text-lg ${
                      favItems.some((r) => r._id === item._id)
                        ? "text-red-500"
                        : "text-stone-300"
                    }`}
                  />
                </button>

                {/* Time Badge */}
                {item.time && (
                  <div className="absolute bottom-3 left-3 bg-[#F79A19] text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium">
                    <BsStopwatchFill />
                    {item.time}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-stone-800 line-clamp-1">
                  {item.title}
                </h2>

                {/* Ingredients preview */}
                <div>
                  <h4 className="text-sm font-semibold text-stone-700 mb-1">
                    Ingredients
                  </h4>
                  <p className="text-sm text-stone-600 line-clamp-2">
                    {item.ingredients.join(", ")}
                  </p>
                </div>

                {/* Instructions preview */}
                <div>
                  <h4 className="text-sm font-semibold text-stone-700 mb-1">
                    Instructions
                  </h4>
                  <p className="text-sm text-stone-600 line-clamp-3">
                    {item.instructions}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setSelectedRecipe(item)}
                  className="mt-3 w-full bg-[var(--tertiary)] hover:bg-[#F79A19] text-stone-800 font-medium py-2 rounded-xl transition"
                >
                  View Full Recipe
                </button>
              </div>
            </article>
          ))}
        </div>
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ExploreRecipes;
