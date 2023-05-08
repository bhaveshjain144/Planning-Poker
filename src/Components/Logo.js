/* import Logos from "../assets/Logo/HB-Logo.png"; */
import './header.css';
/* import planningTitle from '../assets/Title/Group 58173.svg' */
import planningLogo from "../assets/Logo/planningLogo.svg";
const Logo = (props) => {
    
    const room = props.room;
    room.toUpperCase();
    return ( <div className="head2">
            {/* <div className="rooms d-flex">
                <img src={Logos} className="Random-imgs" srcSet={`${require('../assets/Logo/HB-Logo.png')} 1x,
                ${require('../assets/Logo/HB-Logo@2x.png')} 2x`} alt="HBlogo" aria-label="Heart bangalore logo" />
                
              
            </div>
            <div className='vlBar'></div> */}
        
            <div className="postionings">
                     <img className="Random-img" src={planningLogo} alt="Title Text Pointing Poker" />
                    
                  </div>
                  
    </div> 
     );
}
 
export default Logo;