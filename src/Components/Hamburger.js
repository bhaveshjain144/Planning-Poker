import "./Hamburger.css"
import React from "react";
import styled from 'styled-components';
import Chat from '../Components/Chat/Chat';
import InfoBar from "../Components/InfoBar/InfoBar";

const StyledMenu = styled.nav`
display: flex;
flex-direction: column;
justify-content: center;
background: white;
transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
height: 100vh;
text-align: left;
margin-left:900px;
position: absolute;

top: 0;
right: 0;
transition: transform 0.3s ease-in-out;

@media (max-width: 576px) {
    width: 100%;
  }

  @media (max-width: 576px) {
    font-size: 1.5rem;
    text-align: center;
  }

  &:hover {
    color: #343078;
  }
}
`

const Menu = ({ open, setMessage, room, name, sendMessage, message, messages, setOpen}) => {
  return (
    <div className={open ? "Hide" : "NotHide"}>
      
    <StyledMenu open={open}>
      <InfoBar room={room} />
      <div className="insideicon">
    <label htmlFor="Closeicon"  className="sr-only" >Close Messages</label>
    <StyledBurger aria-label="Close Message" id="Closeicon" className="buttonburgermessage" open={open} onClick={() => setOpen(!open)}>
        <span  className="fa fa-close" style={{fontSize:'20px',zIndex:300, color:"#C10E21"}}></span>
    </StyledBurger>
    </div>
     <Chat  setMessage={setMessage} room={room} name={name} sendMessage={sendMessage} message={message} messages={messages} />
     
    </StyledMenu>
    </div>
  )
}


const StyledBurger = styled.button`
width:50px;
height:50px;
z-index: 80;
margin:5px;

border-radius: 80%;
.center {
  display:flex;
  justify-content:center;
  align-items:center;
  width: 50%;
  height: 50%;
 
 
}

.notification.icon {
  
  background-color: #D54634;
  border: 4px solid rgba(0, 0, 0, 0);
  border-radius: 50%;
  height: 50px;
  width: 50px;
  z-index:30;
}
.iconsz{
  font-size:20px;
 
}

`

const Burger = ({ open, setOpen }) => {
  return (

    <StyledBurger aria-label="Message" id="Messageicon" className="buttonburger" open={open} onClick={() => setOpen(!open)}>
     
      <span  className="center notification icon">
        <span  className="fa fa-envelope iconsz" style={{fontSize:20+'px',color:"white"}}></span>
    </span> 
    </StyledBurger>
    
   
  )
}


const Hamburger = (props) => {
  const room = props.room
  const messages = props.messages
  const message = props.message
  const setMessage = props.setMessage
  const sendMessage = props.sendMessage
  const name = props.name
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  return (
    <div>

      <div ref={node}>
      <label htmlFor="Messageicon"  className="sr-only" >Message</label>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} setMessage={setMessage} room={room} name={name} sendMessage={sendMessage} message={message} messages={messages}/>
      </div>
    </div>
  )  
}

export default Hamburger


