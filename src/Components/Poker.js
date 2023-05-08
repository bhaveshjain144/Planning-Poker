/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import Logo from "./Logo";
import ShareLink from "./invite/ShareLink";

import StoryDescription from "./StoryDescription";
import "./poker.css";
import { useHistory } from "react-router";
import Card from "./Card";
import Table from "./Table";
import Hamburger from "./Hamburger";
import UsersInRoom from "./UsersInRoom";
import Cofee from "./Cofee";
import $ from 'jquery';

const socket = io.connect("http://localhost:3001");
var chooseTime = 0;

var series = "";
var cardVales = "";
var value = "";

const Poker = () => {
  const history = useHistory();
  var [name, setName] = useState("");
  const [room, setRoom] = useState("");
  var [cardVale, setCardVal] = useState([""]);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [hand, setHand] = useState([]);
  const [hand2, setHand2] = useState([]);
  const [selected, setSelected] = useState("");
  const [placed, setPlaced] = useState([]);
  const [numberofuser, setNumberofuser] = useState(null);
  const [flag, setFlag] = useState(false);

  const [on, setOn] = useState(false);
  const [chatT, setChatT] = useState(false);
  const [onBlur, setOnBlur] = useState(true);
  var [noName, setNoName] = useState(false);
  var [flags, noflags] = useState(0);

 
  const[valuelist,setValuelist]=useState([]);

  useEffect(() => {
    var { name, room, cardVale } = queryString.parse(location.search);

    setRoom(room);
    setName(name);
    if (!name) {
      setNoName(true);
    }
    series = cardVale;
    console.log(series);
    cardVale = series.split(",");
    cardVales = series.split(",");
    cardVale.forEach((element) => {
      console.log(element.toString());
      setCardVal([...cardVale, element]);
    });
    console.log(cardVales);
    // setCardVal(...cardVal,cardVal);

    socket.emit("join", { name, room, cardVale }, (error) => {
      // if (error) {
      //   alert(error);
      //   // setBackerror('1');
      // }
    });
  }, [socket, location.search]);
  useEffect(() => {}, [socket]);
  //Chat

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    
    socket.on("receive", (data) => {});

   
  }, []);

  //cards
  useEffect(() => {
    addCards();
  }, []);

  useEffect(() => {
    socket.on("playerdet", (data) => {
      setNumberofuser(data);
      console.log(numberofuser);
    });
    socket.on("preach", (data) => {
      if (data === "reset") {
        setFlag(0);
        addCards();
        setValuelist([])
      }
    });
    
    socket.on("selected", (data) => {
      setSelected(data);
    });
   
  }, [socket]);

  //goback reset

  const goback = () => {
    console.log("Reset");
    socket.emit("preach", "reset");
  };
  const addCards = () => {
    let count = cardVales.length;
    setHand([cardVales[count - 1]]);
    setHand2([cardVales[count - 1]]);
    const interval = setInterval(() => {
      --count;
      if (count === 0) return clearInterval(interval);
      setHand((prevValues) => [...prevValues, cardVales[count - 1]]);
      setHand2((prevValues) => [...prevValues, cardVales[count - 1]]);
    }, 100);
    
  };
  const removeCard = (value) => {
    setHand((prevValues) => prevValues.filter((e) => e !== value));
    setPlaced(value);
    setFlag(1);
    //Unmount required
    console.log('selected')
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  //Name Functions
  function handleFlag(e) {
    setName(value);
    setOn(!on);
    console.log(value);
    history.push(`/poker?name=${value}&room=${room}&cardVale=${series}`, {
      some: "state",
    });
  }
const cafe = ()=>{
  var { name, room, cardVale } = queryString.parse(location.search);

  console.log(flags)
 if(flags===0){
   
  socket.disconnect()

   console.log("disconnect")

   noflags(1)
 }
 else{
  
  socket.emit("join", { name, room, cardVale }, (error) => {
    // if (error) {
    //   alert(error);
    //   // setBackerror('1');
    // }
  });
  socket.open();
  history.push(`/poker?name=${name}&room=${room}&cardVale=${series}`, {
    some: "state",
  });
  console.log("connect")
  noflags(0)
 }
}
  const Log = (props) => {
    return (
      <div className={on ? "off" : null} id="name">
        <div className="overlay-name">
        <div  className="noname-form">
          <input
            type="text"
            name="sda"
            id="asd"
            placeholder="Enter your name"
            onChange={(e) => {
              value = e.target.value;
            }}
            required
          />
          <button
            type="button"
            className="name-button"
            onClick={(e) => {
              handleFlag(value);
            }}
          >
            Submit
          </button>
        </div>
        </div>
      </div>
    );
  };
  const RemoveLog = (props) => {
    return( 
    <div>

    </div>
    );
  };

  function Status(props) {
    const noName = props.noName;
    
    if (noName) {
      return (
      <Log />
      );
    }
    return( <RemoveLog />);
  }
const showUsers = () =>{
  
  socket.emit('getusers', { name, room }, (error) => {
    // if(error) {
    //   alert(error);
    // }
  });

}
const [linkChange, setLinkChange] = useState('');
const [showLinks, setShowLinks] = useState(true);
const [showJira, setShowJira] = useState(true);
const sendJira = (event) =>{
  event.preventDefault();
  
  if(linkChange){
      socket.emit("jira",linkChange)
  }
}
useEffect(()=>{
  socket.on("jira",(data)=>{
      setLinkChange(data);
  })
},[socket])

  return (
    <div
      className={
        onBlur ? "notBlur" : "Blur"
      }
    >
      <div className="unBlurred">
        <Status noName={noName} />
      </div>
      <header className="NavBar">
              <nav className="navbar navbar-expand-lg navbar-light">
              <Logo className="hbLogo" room={room} name={name} />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  d-flex Title">
              <li className="nav-item">
                <div className="User">      
                  <div className="UserName">
                      {name}
                  </div>  
                </div>
              </li>
              <li className="nav-item">
                <UsersInRoom users={users}  onClick={() => showUsers()}/>
              </li>
              <li className="nav-item">
              <ShareLink room={room} cardVal={cardVale} />
              </li>
             
              

                 </ul>
          </div>
          
        </nav>
       
      </header>
      <main className="main-content">
          <div className="Jira-outer-link">
          <div className={showLinks ? "Jira-link": "dispnone"}>
            <p className={showJira ?"Jira-text":"dispnone" }>Jira Link </p>
            <a className="Jira-text" href={""+linkChange} target="_blank" rel="noopener noreferrer">
     
              <p className="LinkChange">{linkChange}</p>
              </a>
            <label htmlFor="Jira-pencil"  className="sr-only" >Jira Link Edit</label>
            <button aria-label="Jira Link Edit" id="Jira-pencil" className="btn rounded" onClick={()=>setShowLinks(false)}>  <i className="fa fa-pencil" ></i></button>
          </div>
            <div className={showLinks ?"dispnone" : "Jira-link"}>
              <input type="text" className="Jira-Text" value={linkChange} onChange={({ target: { value } })=>setLinkChange(value)}/>
              <button className="btn Jira-button" onClick={(event)=>{setShowLinks(true);setShowJira(false); sendJira(event)}}>Enter</button>
            </div>
        </div>
      <div className="storyDes ">
        <StoryDescription socket={socket} />
      </div>
      <div className={flags===1 ? "disconnect" : "connect"}>
        <Cofee onClick={() =>cafe()}/>
      </div>

          {flag !== 1 ? (
          <div className="Cards">
            <div className="cardK" role="group"     aria-labelledby="cardgroup">
              <label id="cardgroup" className="sr-only">Pointer stories</label>
            {hand.map((value, index) => (
              <Card
                key={value}
                index={index}
                value={value}
                onClick={() => {removeCard(value);showUsers()}}
              />
            ))
            }
          </div>  
      </div>
          )
          :
           (
            <Table
              hand={hand2}
              value={placed}
              socket={socket}
              usersnum={numberofuser}
              goback={goback}
              users={users}
              valuelist={valuelist}
              setValuelist={setValuelist}
            />
          )}       
       
      <div className="Hamburgericon" >
      <Hamburger
                  chatT={chatT}
                  setMessage={setMessage}
                  room={room}
                  name={name}
                  sendMessage={sendMessage}
                  message={message}
                  messages={messages}
                />
      </div>  
    </main>
    </div>
  );
};

export default Poker;
