import { useState, useEffect } from "react";
import { useMeme } from "../App";

function Quote() {
  const [quotes, setQuote] = useState([]);
  const { favourites, toggleFavourite } = useMeme();

  useEffect(() => {
    fetch("https://api.allorigins.win/get?url=https://zenquotes.io/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        const parsedQuotes = JSON.parse(data.contents);
        setQuote(parsedQuotes);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Quotes 💭</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote, index) => {
          const isFav = favourites.find(
            (item) => item.q === quote.q && item.a === quote.a
          );

          return (
            <div
              key={index}
              className="relative bg-gray-800 rounded-xl shadow p-6 hover:shadow-xl transition"
            >
              <p className="text-lg italic mb-4">"{quote.q}"</p>
              <p className="text-right font-semibold text-[#52B788]">
                - {quote.a || "Unknown"}
              </p>
              <button
                onClick={() =>
                  toggleFavourite({
                    ...quote,
                    text: quote.q,
                    author: quote.a,
                    type: "quote",
                  })
                }
                className={`absolute bottom-3 left-3 text-2xl transition ${
                  isFav ? "text-yellow-400" : "text-gray-400"
                } hover:text-yellow-500`}
              >
                ★
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Quote;
