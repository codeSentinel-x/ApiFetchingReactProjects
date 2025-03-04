// import ".././index.css";

function JokeButton(props) {
  return (
    <button className="JokeB" onClick={props.callApi}>
      Generate a joke
    </button>
  );
}
export default JokeButton;
