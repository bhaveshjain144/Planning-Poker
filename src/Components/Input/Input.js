import React from "react";

import "../Input/Input.css";

const Input = ({ setMessage, sendMessage, message }) => (
  
  <form className="form">
   
    <div className='inputDiv' >
      <textarea
      id="inputs"
      
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    </div>
    <div>
    <button className="btn chatButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
    </div>
   
  </form>

);

export default Input;
