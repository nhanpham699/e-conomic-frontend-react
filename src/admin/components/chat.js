import React ,{useState, useEffect} from 'react';
import io from 'socket.io-client';
import './chat.css';
import axios from 'axios';
import queryString from 'query-string';
import equal from 'fast-deep-equal';

import InfoBar from './infoBar';
import Messages from './messages';
import Input from './input';
import { withRouter } from 'react-router';
// import Cookies from 'universal-cookie';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY

// const cookies = new Cookies();
let socket;
// let userRecieve = null;


function Chat(props){
  
    const [name, setName] = useState('');
    const [room1, setRoom1] = useState('');
    const [rooms, setRooms] = useState([]);
    // const [isConmpleted, setIsCompleted] = useState(false);
    const [userRecieve, setUserRecieve] = useState('');
    // console.log(name, room);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'http://localhost:8080';

    useEffect(() => {
        const name = "admin";
        // const username = cookies.get('name').toString();
        const parsed = queryString.parse(props.location.search);
        const room = parsed.room
        console.log(room);
        socket = io(ENDPOINT)

        axios.get(api + '/rooms')
        .then(res => {
            setRooms(res.data.reverse())
        })

        axios.post(api + "/message", {room : room})
        .then(res => {
            setMessages(res.data)
        })
        
        if(room){
            socket.emit('join', { userRecieve, name, room }, () => {
                console.log(name,room);
            });
        }
        

        setName(name)
        // setRoom(room)

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT, props.location.search])



    useEffect(() => {

        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })

    },[messages])



    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage',userRecieve, room1, message, () => setMessage(''))
        }
    }


    const showMessage = (e) => {
        const room = e.target.innerText
        
        setRoom1(room)

        let index = room.indexOf('-')
        let userRecieve = room.slice(0,index)

        setUserRecieve(userRecieve)
        // console.log(userRecieve);

        props.history.push("/admin/messages?room=" + room)
    }

    console.log(message);

    const parsed = queryString.parse(props.location.search);
    const room = parsed.room

    return(
        <div className="message-item">
            <div className="rooms">
                {rooms.map(r => (
                    <div className ="room-name" onClick={showMessage}>{r}</div>
                ))}
            </div>
            { room && 
            <div className="outerContainerAdmin">
                <div className="containerAdmin">
                    <InfoBar room={room.slice(0,room.indexOf('-'))} />
                    <Messages messages={messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
            }
        </div>
        
    )
} 

export default withRouter(Chat)