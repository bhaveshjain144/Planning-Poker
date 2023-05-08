import React from 'react'
import coffee from '../assets/Icons/Coffee-icon.png'
function Cofee({onClick}) {
    return (
        <div>
            
            <button  aria-label="Coffee Break "  className="Coffee-button" onClick={onClick}> <img src={coffee} alt="Coffee Icon" /></button>
        </div>
    )
}

export default Cofee
