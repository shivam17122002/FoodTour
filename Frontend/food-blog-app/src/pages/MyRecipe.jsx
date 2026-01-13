import { useEffect, useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import { ChefHat } from "lucide-react";

import { Link } from "react-router-dom";
import axios from "axios";

const MyRecipe = ({ getMyRecipe, fetchRecipes }) => {
  const isMyRecipePage = window.location.pathname === "/myRecipe";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyRecipes = async () => {
      try {
        let data = [];

        // ✅ Defensive guard: avoid "getMyRecipe is not a function"
        if (typeof getMyRecipe === "function") {
          data = await getMyRecipe();
        } else {
          // Fallback API call (does NOT change app logic, only prevents crash)
          const res = await axios.get("http://localhost:5000/recipe/my");
          data = res.data;
          console.warn("getMyRecipe prop missing. Used fallback API call.");
        }

        setRecipes(data || []);
      } catch (err) {
        console.error("Failed to load recipes:", err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    loadMyRecipes();
  }, [getMyRecipe]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipe/${id}`);

      if (typeof fetchRecipes === "function") {
        fetchRecipes();
      }

      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!recipes.length)
    return <p className="text-center mt-10">No Recipe Found</p>;

  return (
    <section className="bg-[#BBCB64] min-h-screen pt-[9%] pb-[2.4rem]">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 mb-8 flex items-center justify-between">
        <div className="relative pl-4 border-l-4 border-yellow-400">
          <div className="flex items-center gap-3">
            <ChefHat className="w-10 h-10 text-[#CF0F0F]" />
            <h1 className="text-3xl font-extrabold text-[#CF0F0F] tracking-tight">
              My <span className="text-stone-800">Recipes</span>
            </h1>
          </div>

          <p className="mt-1 text-gray-700 max-w-md">
            Manage, edit, and organize your personal recipes
          </p>
        </div>

        <Link
          to="/addRecipe"
          className="inline-flex items-center gap-2 bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition"
        >
          <FaPlus />
          Add Recipe
        </Link>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((item) => (
          <div
            key={item._id}
            className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* IMAGE */}
            <div className="relative h-52">
              <Link to={`/editRecipe/${item._id}`}>
                <button
                  className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  title="Edit"
                >
                  <FaRegEdit className="text-gray-700" />
                </button>
              </Link>

              {item.coverImage ? (
                <img
                  src={`http://localhost:5000/images/${item.coverImage}`}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {item.title}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-teal-600 font-medium">
                <BsStopwatchFill />
                <span>{item.time}</span>
              </div>
            </div>

            {/* DELETE */}
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-100"
              title="Delete"
            >
              <MdDelete className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyRecipe;
