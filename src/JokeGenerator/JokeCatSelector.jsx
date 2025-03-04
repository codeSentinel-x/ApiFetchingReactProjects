import JokeCat from "./JokeCat";
function JokeCatSelector(props) {
  const cat = [
    "Programming",
    "Miscellaneous",
    "Dark",
    "Pun",
    "Spooky",
    "Christmas",
  ];
  return (
    <span className="Category">
      <p>Category:</p>
      <input
        type="checkbox"
        id="Any"
        value="Any"
        checked={props.isAnyChecked}
        onChange={props.handleAnyChange}
      />
      <label htmlFor="Any">Any</label>
      <br />
      {cat.map((x, i) => (
        <JokeCat
          cat={x}
          id={i}
          key={i}
          checked={props.activeCatArray.includes(x)}
          onChange={() => props.handleChanges(x)}
        />
      ))}
    </span>
  );
}
export default JokeCatSelector;
