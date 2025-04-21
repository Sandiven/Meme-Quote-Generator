import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
    return (
        <>
            <div className="flex space-x-8 bg-[#000000] h-16 ">
                <Link to="/" className="m-4 text-xl text-[white] hover:scale-120 hover:text-[#52B788] font-bold transition duration-300 ease-in-out">Meme-Template</Link>
                <Link to="/quote" className="m-4 text-xl text-[white] hover:scale-120 hover:text-[#52B788] font-bold transition duration-300 ease-in-out">Qoute</Link>
                <Link to="/favourite" className="m-4 text-[white] text-xl hover:scale-120 hover:text-[#52B788] font-bold transition duration-300 ease-in-out">Favourite</Link>
            </div>
        </>
    )
}

export default Navbar