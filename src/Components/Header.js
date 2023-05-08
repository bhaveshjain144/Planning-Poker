import React from "react";
import './header.css';
import Logo from "../assets/Logo/HB-Logo.png";

const Header = () =>{
//    const onex = './assets/Logo/HB-Logo.png';
//    const twox = './assets/Logo/HB-Logo@2x.png';
    return(
    <header>
        <div className="site-logo">
            <img src={Logo} srcSet={`${require('../assets/Logo/HB-Logo.png')} 1x,
            ${require('../assets/Logo/HB-Logo@2x.png')} 2x`} alt="HBlogo" aria-label="Heart bangalore logo" />

           
        </div>

    </header>
    )
}

export default Header;