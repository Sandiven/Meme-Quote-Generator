import { useEffect, useState } from "react";
import { useMeme } from "../App";

function Meme() {
  const [memes, setMemes] = useState([]);
  const { favourites, toggleFavourite } = useMeme();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setMemes(data.data.memes);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Meme Templates 😁</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {memes.map((meme, index) => {
          const isFav = favourites.some(
            (fav) =>
              fav.type === "meme" &&
              fav.image === meme.url &&
              fav.name === meme.name
          );

          return (
            <div
              key={index}
              className="relative bg-gray-800 rounded-xl shadow p-3 hover:shadow-xl transition flex flex-col justify-between h-[350px]"
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="rounded-md w-full h-48 object-contain bg-gray-700 mb-2"
              />
              <p className="text-center text-sm text-white font-semibold truncate">{meme.name}</p>

              {/* Star */}
              <button
                onClick={() =>
                  toggleFavourite({ image: meme.url, name: meme.name, type: "meme" })
                }
                className={`absolute bottom-3 left-3 text-2xl transition ${
                  isFav ? "text-yellow-400" : "text-gray-400"
                } hover:text-yellow-500`}
              >
                ★
              </button>

              {/* Download */}
              <a
                href={meme.url}
                download
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 right-3 text-white bg-gray-700 hover:bg-green-500 rounded-full p-1 text-sm"
              >
                🔍
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Meme;
