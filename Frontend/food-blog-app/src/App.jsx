import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyRecipe from "./pages/MyRecipe";
import Favourite from "./pages/Favourite";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import AllRightsReserved from "./pages/AllRightsReserved";
import AddFoodRecipe from "./pages/addFoodRecipe";
import EditRecipe from "./pages/EditRecipe";
import ExploreRecipes from "./pages/ExploreRecipes";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all recipes and RETURN them
  const fetchRecipes = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/recipe");
      setRecipes(res.data);
      return res.data; 
    } catch (error) {
      console.error("error:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const getMyRecipe = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return [];

    return recipes.filter((item) => item.createdBy?.toString() === user._id);
  }, [recipes]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-white"></div>
          <p className="text-sm text-gray-300 tracking-wide">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home recipe={recipes} />} />
        <Route
          path="/myRecipe"
          element={<MyRecipe getMyRecipe={getMyRecipe} fetchRecipes={fetchRecipes} />}
        />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/allRightsReserved" element={<AllRightsReserved />} />
        <Route path="/addRecipe" element={<AddFoodRecipe setRecipes={setRecipes} />} />
        <Route path="/editRecipe/:id" element={<EditRecipe />} />
        <Route path="/expRecipes" element={<ExploreRecipes recipe={recipes} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
