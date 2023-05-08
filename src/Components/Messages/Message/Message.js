import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';


const Message = ({ message: { text, user }, name }) => {



  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (  
        <div className="messageContainer d-flex">
          <p className="sentText">{trimmedName}</p>
          <div className="messageBox ">
            <p className="messageText ">{ReactEmoji.emojify(text)}</p>
          </div>
          
        </div>
        )
        : (
          <div className="messageContainer d-flex">
            <p className="sentText">{user}</p>
            <div className="messageBox ">
              <p className="messageText ">{ReactEmoji.emojify(text)}</p>
            </div>
            
          </div>
        )
  );
}

export default Message;