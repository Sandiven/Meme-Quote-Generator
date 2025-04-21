import { useState , useEffect} from 'react'
import { createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Meme from './component/Meme'
import Quote from './component/Quote'
import Favourite from './component/Favourite'

const MemeContext = createContext();
export const useMeme = () => useContext(MemeContext);


function App() {

  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites")
    return stored ? JSON.parse(stored) : [];
  })

  function toggleFavourite(item) {
    const isAlreadyFavourite = favourites.some((fav) => {
      return (
        fav.text==item.text &&
        ((item.type=="quote" && fav.author==item.author) ||
         (item.type=="meme" && fav.image==item.image)) &&
        fav.type==item.type
      )})
  
    if (isAlreadyFavourite) {
      setFavourites((prev) =>
        prev.filter((fav) => {
          return !(
            fav.text==item.text &&
            ((item.type=="quote" && fav.author==item.author) ||
             (item.type=="meme" && fav.image==item.image)) &&
            fav.type==item.type
          )})
      )
    } 
    else
      setFavourites((prev) => [...prev, item])
  }

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites))
  }, [favourites])
  
  
  
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
