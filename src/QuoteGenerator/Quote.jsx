import { useState } from "react";
import QuoteButton from "./QuoteButton";

function Quote() {
  const [Quote, setQuote] = useState("");

  const fetchApi = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    )
      .then((res) => res.json())
      .then((data) => setQuote(data));
  };
  return (
    <div className="Quote">
      <QuoteButton callApi={fetchApi} />
      <p>{Quote}</p>
    </div>
  );
}
export default Quote;
