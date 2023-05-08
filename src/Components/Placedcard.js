import './Table.css'
const Placedcard = ({ value, user}) => {
  
    return (
        <div className="d-flex card-total">
          <label className="visuallyhidden">
            The value clicked by {user.name} is {value}.  
          </label>
        <button aria-disabled="true" className="placedcard">
              <div className="value">{value}</div>
      </button>
        <div className="user-name" >
        {user.name}
        </div>
      </div>
      
    );
  };
  
  export default Placedcard;
  