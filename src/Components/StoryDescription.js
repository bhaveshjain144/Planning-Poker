import React, { useEffect, useState } from "react";
 import './Story.css';
 



const StoryDescription = (props) => {
    const socket = props.socket;
    const [stor,setStor] = useState('');
    const sendStory = (event) =>{
        event.preventDefault();
        
        if(stor){
            socket.emit("story",stor)
        }
    }
      useEffect(()=>{
        socket.on("story",(data)=>{
            setStor(data);
        })
      },[socket])


  return (
            <div className="story" >
             {/* <h1 className="story-dis" >Story Description</h1>*/}
              <form className="form-story">
              <textarea className="textArea"
              rows="5"
              placeholder="Brief Your Story"
              value={stor}
              onChange={({ target: { value } }) => setStor(value)}
              onKeyPress={event => event.key === 'Enter' ? sendStory(event) : null}
              ></textarea>
              <button className="btn sendButtons" onClick={e => sendStory(e)}>Send</button>
              </form>
            </div>

  );
};

export default StoryDescription;
