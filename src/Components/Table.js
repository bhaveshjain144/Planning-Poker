/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect} from "react";
import Placedcard from "./Placedcard";
import Result from "./Result";
import Backcard from "./backcard";
import './Table.css'
const Table = (props) =>{
  const hand= props.hand;
    const socket = props.socket;
    var [valuelist,setValuelist]=useState([]);
    valuelist=props.valuelist
    setValuelist= props.setValuelist
    useEffect(()=>{
        socket.emit("selected",props.value)
      },[props.value, socket]);

      useEffect(()=>{
        socket.on("preach",(data)=>{
          if(data !=='reset'){
            console.log(data)
            setValuelist(data.map((value)=>value.worth));
            
            console.log(valuelist)
          }
          if(data === 'reset'){
            // let count = 0;
            // setInterval(() => {
            //   socket.volatile.emit("ping", ++count);
            // }, 1000);
          setValuelist([]);
          console.log(valuelist)
          }
        })

      },[socket])
    return(
        <div className="theTable">
          <div className="cardplaced">
            <div className="Results">
                        {valuelist.indexOf("waiting")<0 ? (
                            <Result
                            hand={hand}
                            valuelist = {valuelist}
                            goback = {props.goback}/>
                        ):(<p></p>)}
              </div>
              <div className="placedCards">
                      {valuelist.map((value,index)=>
                        value !== 'waiting' ? (
                          <Placedcard
                          key={index}
                          value={value}
                           user={props.users[index]} 
                          />
                      ) : (
                        <Backcard key ={index}/>
                      ))}      
                    </div>     
                  </div>
        </div>
    )
}
export default Table;