import './poker.css'

const Card = ({ value, onClick, index}) => {
  const unknown = "question mark"
  return (
      // <div className="d-flex">
      // {/* <label htmlFor={value} className="sr-only" >Card Clicked is {value==="?" ? unknown : value }</label> */}
    <button id={value}  className="cardBox" onClick={onClick}>
       <label className="visuallyhidden" >Pointing Poker Point {value==="?" ? unknown : value }</label>
      <span  className="values">{value}</span>
    </button>
      //  </div>
    
  );
};

export default Card;
