import { BsStopwatchFill } from "react-icons/bs";

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      {/* Card */}
      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 bg-white/90 hover:bg-white text-stone-700 rounded-full w-9 h-9 flex items-center justify-center shadow transition"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative h-[420px] md:h-auto overflow-hidden">
            {recipe.coverImage ? (
              <img
                src={`http://localhost:5000/images/${recipe.coverImage}`}
                alt={recipe.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-stone-100 flex items-center justify-center">
                No Image
              </div>
            )}

            {recipe.time && (
              <div className="absolute bottom-4 left-4 bg-[var(--secondary)] text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium shadow">
                <BsStopwatchFill />
                {recipe.time}
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="p-10 flex flex-col gap-8 max-h-[80vh] overflow-y-auto">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-stone-800 leading-tight">
                {recipe.title}
              </h2>
              <p className="text-stone-500 mt-1 text-sm">
                Crafted with care · Home-style recipe
              </p>
            </div>

            {/* Ingredients */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)] mb-3">
                Ingredients
              </h3>
              <ul className="grid grid-cols-2 gap-y-2 text-stone-700 text-sm">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>• {ing}</li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)] mb-3">
                Preparation
              </h3>
              <ol className="space-y-3 text-stone-700 text-sm list-decimal list-inside">
                {recipe.instructions.split("\n").map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
