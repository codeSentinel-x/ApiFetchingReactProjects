import JokeBlacklist from "./JokeBlacklist";

function JokeBlacklistSelector(props) {
  const flags = [
    "nsfw",
    "religious",
    "political",
    "racist",
    "sexist",
    "explicit",
  ];
  return (
    <span className="Blacklist">
      <p>BlackList:</p>
      <input
        type="checkbox"
        id="None"
        value="None"
        checked={props.isNoneChecked}
        onChange={props.handleNoneChange}
      />
      <label htmlFor="None">None</label>
      <br />
      {flags.map((x, i) => (
        <JokeBlacklist
          flag={x}
          id={i}
          key={i}
          checked={props.activeFlags.includes(x)}
          onChange={() => props.handleChanges(x)}
        />
      ))}
    </span>
  );
}
export default JokeBlacklistSelector;
