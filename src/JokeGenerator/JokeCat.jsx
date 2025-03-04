function JokeCat(props) {
  return (
    <>
      <input
        className="JokeCat"
        type="checkbox"
        id={props.id}
        value={props.cat}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label htmlFor={props.id}>{props.cat}</label>
      <br></br>
    </>
  );
}
export default JokeCat;
