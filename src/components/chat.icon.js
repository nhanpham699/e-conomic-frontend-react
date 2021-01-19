import React, {Component} from 'react';
import MessageIcon from '../img/message.png';
import './chat.icon.css';
class ChatIcon extends Component {
    
     


    render() {
        const { onClick } = this.props
        return(
            <div className="message-icon-layout">
                <img onClick={onClick} className="message-icon" src={MessageIcon} />
            </div>
        )
    }
}

export default ChatIcon