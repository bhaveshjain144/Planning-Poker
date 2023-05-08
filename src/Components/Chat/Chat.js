

import Messages from "../Messages/Messages";

import Input from "../Input/Input";
import "../Chat/Chat.css"

const Chat = (props) => {
  
  const messages = props.messages
  const message = props.message
  const setMessage = props.setMessage
  const sendMessage = props.sendMessage
  const name = props.name
 


// function closMsg(){
//   setTimeout(() =>{document.getElementById('myMsg').style.width= "0%"}, 1000)
// }


  return (
    <>
   
    {/* <div onClick= { closMsg() }  > hello </div> */}
   <div id="myMsg" className='overlay'>
    <div  className="outerContainer">
      <div className="container ChatInner">
        
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  </div>
  </>
    
  );
};

export default Chat;
