import { useState } from 'react'
import { createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Meme from './component/Meme'
import Quote from './component/Quote'
import Favourite from './component/Favourite'

const MemeContext = createContext();
export const useMeme = () => useContext(MemeContext);


function App() {

  const [favourites, setFavourites] = useState([])

  const toggleFavourite = (meme) => {
    setFavourites((prev) => {
      const isFav = prev.find((item) => item.id === meme.id)
      return isFav? prev.filter((item) => item.id !== meme.id): [...prev, meme]})
  }
  return (
    <>
    <MemeContext.Provider value={{ favourites, toggleFavourite }}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Meme/>} />
        <Route path="/quote" element={<Quote/>} />
        <Route path="/favourite" element={<Favourite/>} />
      </Routes>
    </BrowserRouter>
    </MemeContext.Provider>
    </>
  )
}

export default App
