import React from 'react';

import './message.css'

const Message = ({message : {sentObj, recievedObj, text}, name}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase()
    console.log(sentObj, trimmedName);
    if(sentObj == trimmedName) {
        isSentByCurrentUser = true
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sendText pr-10">{trimmedName}</p>
                    <div className="messageBoxAdmin backgroundBlueAdmin">
                        <p className="messageText colorWhite">{text}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBoxAdmin backgroundLightAdmin">
                        <p className="messageText colorDark">{text}</p>
                    </div>
                    <p className="sendText pl-10">{sentObj}</p>
                </div>
            )
    )
}
export default Message