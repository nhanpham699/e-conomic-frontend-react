import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './message';
import './messages.css';

const Messages = ({messages, name}) => {
    return(
        <ScrollToBottom className="messagesAdmin">
            {messages.map((message, i) => 
                <div key={i}>
                    <Message message={message} name={name} />
                </div>
            )}
        </ScrollToBottom>
    )
    
}
export default Messages