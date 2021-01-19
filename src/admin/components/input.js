import React from 'react';
import './input.css';
function Input({ message, setMessage, sendMessage}) {
    // console.log(message, setMessage, sendMessage);
    return(
        <form className="form">
            <input
                className="inputAdmin"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButtonAdmin" onClick={event => sendMessage(event)}>Send</button>
        </form>
    )
}
export default Input