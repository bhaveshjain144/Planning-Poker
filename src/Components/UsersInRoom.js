
// import onlineIcon from '../../icons/onlineIcon.png';

import './UsersInRoom.css'
const UsersInRoom = ({ users, onClick }) => {
   
    return ( 
    <div className="dropdown heightd">
        <button className="btn dropdown-toggle userbutton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false" onClick={onClick}>
            Users In Room
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {
                users
                    ? (
                        <div className="HeightD">
                       
                           
                            {users.map(({name}) => (
                                <div key={name} className="dropdown-item namesx ">
                                    {name}
                               </div>
                                ))}
                               
                        </div>
                        
                    )
                    : null
                }
            
        </div>        
    </div>
    );
}
 
export default UsersInRoom;