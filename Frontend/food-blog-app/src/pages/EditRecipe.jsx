import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    coverImage: null,
  });

  const [loading, setLoading] = useState(true);

  /* Fetch existing recipe */
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipe/${id}`);
        const recipe = res.data;

        setRecipeData({
          title: recipe.title,
          ingredients: recipe.ingredients.join("\n"),
          instructions: recipe.instructions,
          time: recipe.time,
          coverImage: null,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  /* Handle input change */
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setRecipeData({
      ...recipeData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  /* Submit edited recipe */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(recipeData).forEach((key) => {
      if (key === "ingredients") {
        formData.append(key, JSON.stringify(recipeData[key].split("\n")));
      } else if (key === "coverImage") {
        // append image ONLY if user selected one
        if (recipeData.coverImage) {
          formData.append("coverImage", recipeData.coverImage);
        }
      } else {
        formData.append(key, recipeData[key]);
      }
    });

    try {
      await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      navigate("/myRecipe");
    } catch (error) {
      console.log("Edit recipe failed:", error.response || error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading recipe...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 pt-[7%]">
      <div className="relative pl-4 border-l-4 border-yellow-400 mb-8">
        <h2 className="text-2xl font-extrabold text-red-800 tracking-tight">
          Edit Recipe
        </h2>
        <p className="mt-1 text-gray-700">
          Update your recipe details and keep them fresh
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={recipeData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          name="ingredients"
          value={recipeData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (one per line)"
          rows="5"
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          name="instructions"
          value={recipeData.instructions}
          onChange={handleChange}
          placeholder="Cooking Instructions"
          rows="5"
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="time"
          value={recipeData.time}
          onChange={handleChange}
          placeholder="Cooking Time"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="file"
          name="coverImage"
          onChange={handleChange}
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
