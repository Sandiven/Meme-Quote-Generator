import { useState , useEffect} from "react"

function Quote(){
    const [quote,setQuote]=useState([])

    useEffect(() => {
        fetch("https://api.allorigins.win/get?url=https://zenquotes.io/api/quotes")
          .then((res) => res.json())
          .then((data) => setQuote(data));
      }, []);

      console.log(quote)
    return(
        <>
            <h1> hello </h1>       
        </>
    )
}
export default Quote