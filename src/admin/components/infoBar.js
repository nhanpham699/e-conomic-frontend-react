import React from 'react';

import './inforBar.css';
 
function InfoBar({room}){
    return(
        <div className="inforBarAdmin">
            <div className="leftInnerContainerAdmin">
                <h3>{room}</h3>
            </div>
            <div>
                {/* <a></a> */}
            </div>
        </div>
    )  
}
export default InfoBar