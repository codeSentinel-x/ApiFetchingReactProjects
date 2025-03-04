function JokeBlacklist(props) {
  return (
    <>
      <input
        className="JokeBlacklist"
        type="checkbox"
        id={props.id}
        value={props.flag}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label htmlFor={props.id}>{props.flag}</label>
      <br />
    </>
  );
}
export default JokeBlacklist;
