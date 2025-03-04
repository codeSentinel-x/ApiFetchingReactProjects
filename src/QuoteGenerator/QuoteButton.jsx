function QuoteButton(props) {
  return (
    <button className="QuoteB" onClick={props.callApi}>
      Generate Quote
    </button>
  );
}
export default QuoteButton;
