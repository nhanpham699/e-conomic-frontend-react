import React ,{useState, useEffect} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './chat.css'
import InfoBar from './infoBar';
import Messages from './messages';
import Input from './input';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY

const cookies = new Cookies();
let socket;
function Chat({onClick}){
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    // console.log(name, room);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'http://localhost:8080';

    useEffect(() => {
        // const userRecive ='admin'
        const name = cookies.get('name').toString();
        const room = name + "-" + cookies.get('userId').toString();
        socket = io(ENDPOINT);

        axios.post(api + "/message", {room : room})
        .then(res => {
            setMessages(res.data)
        })

        // console.log(room);
        

        socket.emit('join', {name, name, room}, () => {
            console.log(name,room);
        });

        setName(name)
        setRoom(room)

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT])



    useEffect(() => {
        
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })


    },[messages])



    const sendMessage = (event) => {
        event.preventDefault();
        
        if(message) {
            socket.emit('sendMessage',name, "", message, () => setMessage(''))
        }
    }


    console.log(messages);

    return(
        <div className="outerContainer">
            <div className="containerChat">
                <InfoBar onClick={onClick} room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
} 
export default withRouter(Chat)