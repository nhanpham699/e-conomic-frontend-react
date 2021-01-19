import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import TextField from '@material-ui/core/TextField';
import UserIcon from '../img/user.png';
import PassIcon from '../img/password.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import './login.css';
import FacebookLogin from '../components/facebook.login'
import GoogleLogin from '../components/google.login'
require('dotenv').config()


var md5 = require('md5');
const api = process.env.REACT_APP_API_KEY
const key = process.env.REACT_APP_PASS_KEY

const cookies = new Cookies();

class Login extends Component{    
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }  

    componentDidMount(){
        if(cookies.get("userId")){
            window.location.href = "/"
        }
        if(document.URL.search('search?q=') < 0){
            document.getElementById("search-text").value = null
        }
    }

    login(event) {
        event.preventDefault();
        document.getElementsByClassName("login-user-err")[0].innerHTML = ""
        document.getElementsByClassName("login-pass-err")[0].innerHTML = ""
        let { username } = event.target
        let { password } = event.target
        username.style.borderBottom = "1px solid black"
        password.style.borderBottom = "1px solid black"
        let response = {
            username: username.value,
            password: md5(md5(password.value) + key)
        }
        axios.post(api + "/login", response)
        .then(res => {
            console.log(res.data);
            if(res.data.username_val == false){
                username.style.borderBottom = "2px solid red" 
                document.getElementsByClassName("login-user-err")[0].innerHTML = "User not found!"
            }else{
                if(res.data.password_val == false){
                    password.style.borderButtom = "2px solid red"
                    document.getElementsByClassName("login-pass-err")[0].innerHTML = "Wrong password!"
                }else{
                    let d = new Date();
                    d.setTime(d.getTime() + (10000*60*1000));
                    cookies.set('name', res.data.name, { path: '/', expires: d }); 
                    cookies.set('userId', res.data.userId, { path: '/', expires: d }); 
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'log in successfully!',
                        showConfirmButton: false,
                        timer: 1500
                      }).then(() => {
                         window.location.href = "/"
                      }) 
                }
            }
        })
        .catch( err => {
            console.log(err);
        })
    }

    render(){
        return(   
            <div className="login">
                <div className="login-form">
                    <h1 className="login-title">LOG IN</h1>
                    <form onSubmit={(event) => this.login(event)}>
                        <div className="login-content">
                            <div className="username-layout">
                                <div><img className="user-icon form-icon" src={UserIcon} /></div>
                                <div className="username-text">
                                    <TextField id="username" name="username" label="Username" variant="outlined" />
                                    <span className="login-user-err"></span>
                                </div>
                            </div> 
                            <div className="password-layout">
                                <div><img className="pass-icon form-icon" src={PassIcon} /></div>
                                <div className="password-text">
                                    <TextField id="password" name="password" type="password" label="Password" variant="outlined" />
                                    <span className="login-pass-err"></span>
                                </div>
                            </div>
                        </div>
                        <div className="login-btn-layout">
                            <button type="submit" className="login-btn">LOG IN</button>
                        </div>
                        </form>
                        <div className="fb-gg">
                            <FacebookLogin />
                            <GoogleLogin />
                        </div>
                        <div className="login-bottom">
                            <Link to="/register"><i>Did you have an account?</i></Link>
                        </div>
                </div>
            </div>
        )
    }
}
export default Login