import { useEffect, useState } from "react"
import { useMeme } from "../App"

function Meme(){
    const [meme, setMeme]=useState([])
    const { favourites, toggleFavourite } = useMeme();

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
          .then((res)=>res.json())
          .then((data) => {
            setMeme(data.data.memes)
          });
      }, []);

    return(
        <>
        <div className="p-6 bg-gray-900 min-h-screen text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Meme Templates 😁</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {meme.map((meme) => {const isFav = favourites.find((item) => item.id === meme.id)

          return (
            <div key={meme.id} className="relative bg-gray-800 rounded-xl overflow-hidden shadow hover:scale-105 transition-transform duration-300">
               <a href={meme.url}download className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-sm rounded hover:bg-green-400 transition"title="Download Meme">🔍</a>
              <img src={meme.url} alt={meme.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-center">{meme.name}</h2>
              </div>
              <button onClick={() => toggleFavourite(meme)}className={`absolute bottom-3 left-3 text-2xl transition-colors ${isFav ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-500`}>★</button>
            </div>
          )
          })}
            </div>
        </div>
        </>      
    )
}
export default Meme