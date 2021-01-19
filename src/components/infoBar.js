import React from 'react';

import './inforBar.css';
 
function InfoBar({ room, onClick }){
    return(
        <div onClick={onClick} className="inforBar">
            <div className="leftInnerContainer">
                <h5>Chatting</h5>
            </div>
        </div>
    )  
}
export default InfoBar