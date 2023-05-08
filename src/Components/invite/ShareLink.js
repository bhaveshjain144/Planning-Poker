/*import Popup from "../invite/popup";*/
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import "./Sharelink.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';


function ShareLink() {
  /* const prom = new Promise();*/
  /* setTimeout(() => {
    const myURL = new URL(window.location.href);
    console.log(myURL.searchParams.get("name"));
  }, 2000);*/
  const [copied, setCopied] =useState(false);
  const [k, sk] = useState("");
  useEffect(() => {
    /*var myURL = window.location.href;
    alert(myURL.searchParams.("name"));*/
    const queryParams = new URLSearchParams(window.location.search);
    const cal = queryParams.get("cardVale");
      // const name = queryParams.get("name");
    const type = queryParams.get("room");
    const linkz = window.location.href.slice(0,window.location.href.lastIndexOf('/'));

    var kite =
      linkz + "/poker?name=&room=" + type + "&cardVale=" + cal;
    // queryParams.set(name, "eafesf")
    
    sk(kite);
  }, []);
  /*const offset = {
    left: 150,
    top: 50,
  };*/
 
  return (
    <div className="Share">
      <label htmlFor="popup-2" className="sr-only">ShareLink</label>
        <Popup aria-label="Copied"
          trigger={<button className="btn invitebutton" id="popup-2"> Invite Link</button>}>     
      <CopyToClipboard aria-hidden="true" text={k} onCopy={() => setCopied(true)}>
            <textarea className="pop" value={k} readOnly></textarea>
      </CopyToClipboard>
      {copied ? <span className="copyText" style={{color: 'red'}}>Copied.</span> : null}
        </Popup>
    </div>
  );
}

export default ShareLink;