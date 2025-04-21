import { useState } from "react";
import { useMeme } from "../App";

function Favourite() {
  const { favourites, toggleFavourite } = useMeme();
  const [filter, setFilter] = useState("all"); 

  const filteredFavourites = favourites.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favourites 💛</h1>

      <div className="flex justify-center space-x-4 mb-6">
        {["all", "quote", "meme"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === f
                ? "bg-[#52B788] text-black"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {filteredFavourites.length === 0 ? (
        <p className="text-center text-gray-400">No favourites to show here </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFavourites.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-xl shadow p-6 hover:shadow-xl transition"
            >
              {item.type === "quote" ? (
                <>
                  <p className="text-lg italic mb-4">"{item.text}"</p>
                  <p className="text-right font-semibold text-[#52B788]">
                    - {item.author || "Unknown"}
                  </p>
                </>
              ) : (
                <>
                  <img src={item.image} alt="Meme" className="rounded-md w-full mb-4"/>

                </>
              )}

              {/* Star button to remove from fav */}
              <button
                onClick={() => toggleFavourite(item)}
                className="absolute bottom-3 left-3 text-2xl text-yellow-400 hover:text-yellow-500 transition"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourite;
