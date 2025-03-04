function JokeTypeSelector(props) {
  return (
    <span className="Type">
      <p>Type</p>
      <input
        type="radio"
        name="JokeType"
        id="single"
        value="single"
        checked={props.jokeType === "single"}
        onChange={() => props.onTypeChange("single")}
      />
      <label htmlFor="single">Single</label>
      <br />
      <input
        type="radio"
        name="JokeType"
        id="twopart"
        value="twopart"
        checked={props.jokeType === "twopart"}
        onChange={() => props.onTypeChange("twopart")}
      />
      <label htmlFor="twopart">Two Part</label>
    </span>
  );
}
export default JokeTypeSelector;
