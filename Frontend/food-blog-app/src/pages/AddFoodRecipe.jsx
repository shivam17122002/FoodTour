import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFoodRecipe = ({ setRecipes }) => {
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    coverImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      setRecipeData({ ...recipeData, coverImage: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(recipeData).forEach((key) => {
      if (key === "ingredients") {
        data.append(key, JSON.stringify(recipeData[key].split("\n")));
      } else {
        data.append(key, recipeData[key]);
      }
    });

    try {
      const res = await axios.post("http://localhost:5000/recipe", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRecipes((prev) => [res.data, ...prev]); // or setRecipes
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#BBCB64] px-6 py-20 pt-[7%]">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="relative inline-block text-4xl md:text-5xl font-extrabold text-[#CF0F0F]">
            <span className="relative inline-block">
              Share your
              {/* Accent line below */}
              <span className="absolute left-0 -bottom-2 h-[4px] w-[8.6ch] bg-[#F79A19] rounded-full" />
            </span>{" "}
            <span className="text-stone-900">home recipe</span>
          </h1>

          <p className="mt-4 max-w-xl mx-auto text-lg text-stone-700">
            Add a recipe you love. Simple steps, real ingredients, honest
            cooking.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/85 backdrop-blur rounded-3xl shadow-xl p-8 md:p-12 w-full">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                value={recipeData.title}
                onChange={handleChange}
                required
                placeholder="Paneer Butter Masala"
                className="w-full rounded-2xl border border-stone-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#CF0F0F]"
              />
            </div>

            {/* INGREDIENTS */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Ingredients
              </label>
              <textarea
                name="ingredients"
                value={recipeData.ingredients}
                onChange={handleChange}
                rows="5"
                required
                placeholder="One ingredient per line"
                className="w-full rounded-2xl border border-stone-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF0F0F]"
              />
              <p className="mt-2 text-sm text-stone-500">
                Tip: Write each ingredient on a new line
              </p>
            </div>

            {/* INSTRUCTIONS */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Cooking Instructions
              </label>
              <textarea
                name="instructions"
                value={recipeData.instructions}
                onChange={handleChange}
                rows="6"
                required
                placeholder="Explain step by step in simple language..."
                className="w-full rounded-2xl border border-stone-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF0F0F]"
              />
            </div>

            {/* META */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Cooking Time
                </label>
                <input
                  type="text"
                  name="time"
                  value={recipeData.time}
                  onChange={handleChange}
                  placeholder="30 minutes"
                  className="w-full rounded-2xl border border-stone-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF0F0F]"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Cover Image
                </label>

                <div className="relative">
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />

                  <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center hover:border-[#CF0F0F] transition">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 object-cover rounded-xl"
                      />
                    ) : (
                      <p className="text-stone-600">Click to upload image</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full rounded-full bg-[#CF0F0F] py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#b40d0d]"
              >
                Publish Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddFoodRecipe;
