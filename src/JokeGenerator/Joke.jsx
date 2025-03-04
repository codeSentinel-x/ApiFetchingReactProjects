import { useCallback, useEffect, useState } from "react";
import JokeButton from "./JokeButton";
import JokeCat from "./JokeCat";
import JokeBlacklist from "./JokeBlacklist";
import JokeTypeSelector from "./JokeTypeSelector";
import JokeCatSelector from "./JokeCatSelector";
import JokeBlacklistSelector from "./JokeBlacklistSelector";

function Joke() {
  const [OnePartJoke, setOnePartJoke] = useState(""); //param = data.joke
  const [TwoPartJoke, setTwoPartJoke] = useState(["", ""]); //param[0] = data.setup  param[1] = data.delivery
  const [JokeType, setJokeType] = useState("single");
  const [activeCat, setActiveCat] = useState([]);
  const [activeFlags, setActiveFlags] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(["", ""]); //param[0] = singleCat  param[1] = twopartCat

  //boleans that define if any or none is checked acoording to length of activeCat and activeFlag arrays length
  const isAnyChecked = activeCat.length === 0;
  const isNoneChecked = activeFlags.length === 0;

  //setup functions that check if any or none are checked on every rerender
  //they clear activeCategory or activeFlag arrays checkboxes if so
  useEffect(() => {
    if (isAnyChecked) setActiveCat([]);
  }, [isAnyChecked]);
  useEffect(() => {
    if (isNoneChecked) setActiveFlags([]);
  }, [isNoneChecked]);

  //that functions handles changes of the any checkbox and the none checkbox
  //They also clear the activeCat or activeFlags arrays if so
  const handleAnyChange = () => {
    setActiveCat([]);
  };
  const handleNoneChange = () => {
    setActiveFlags([]);
  };

  //that functions handle changes of the category checkboxes and the blacklist checkboxes
  //They also uncheck the any or none checkboxes if so
  const handleCategoryChange = useCallback((cat) => {
    setActiveCat((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);
  const handleFlagChange = useCallback((flag) => {
    setActiveFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  }, []);

  //simple function that sets the joke type to the state
  const handleJokeTypeChange = (type) => setJokeType(type);

  //this function ensure that category display only if currentCategory is set
  //it also check if current category was set for the current joke
  const getRenderStatusOfCatDisplay = () => {
    if (JokeType == "single") return currentCategory[0] ? "block" : "none";
    else return currentCategory[1] ? "block" : "none";
  };

  //this function fetches the joke from the api
  //it uses activeCat and activeFlags arrays to create a query string
  //and also sets the joke to the state
  const fetchApi = () => {
    let queryCat = activeCat.length > 0 ? activeCat.join(",") : "Any";
    let queryFlags = activeFlags.length > 0 ? activeFlags.join(",") : "";
    let url = `https://v2.jokeapi.dev/joke/${queryCat}?${
      queryFlags ? `blacklistFlags=${queryFlags}&` : ""
    }type=${JokeType}`;
    console.log(
      `QueryCat: ${queryCat} \n queryFlags: ${queryFlags} \n JokeType: ${JokeType} \n Url: ${url}`
    );
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching joke:", data.message);
          JokeType == "single"
            ? setOnePartJoke(`Error fetching joke:" ${data.message}`)
            : setTwoPartJoke(["Error fetching joke:", data.message]);
          return;
        }
        JokeType == "single"
          ? setOnePartJoke(data.joke)
          : setTwoPartJoke([data.setup, data.delivery]);
        setCurrentCategory((prev) =>
          JokeType == "single"
            ? [data.category, prev[1]]
            : [prev[0], data.category]
        );
      });
  };

  return (
    <div className="Joke">
      <div className="switches">
        <JokeTypeSelector
          jokeType={JokeType}
          onTypeChange={handleJokeTypeChange}
        />
        <JokeCatSelector
          isAnyChecked={isAnyChecked}
          activeCatArray={activeCat}
          handleAnyChange={handleAnyChange}
          handleChanges={handleCategoryChange}
        />
        <JokeBlacklistSelector
          isNoneChecked={isNoneChecked}
          activeFlags={activeFlags}
          handleNoneChange={handleNoneChange}
          handleChanges={handleFlagChange}
        />
      </div>
      <br />
      <JokeButton callApi={fetchApi} />
      {JokeType == "single" ? (
        <p className="Joke">{OnePartJoke}</p>
      ) : (
        <p className="Joke">
          {TwoPartJoke[0]}
          <br />
          {TwoPartJoke[1]}
        </p>
      )}
      <p
        style={{ display: getRenderStatusOfCatDisplay() }}
        className="Category"
      >
        Category:{" "}
        {JokeType == "single" ? currentCategory[0] : currentCategory[1]}
      </p>
    </div>
  );
}

export default Joke;
