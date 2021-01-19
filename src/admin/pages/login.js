import React from 'react';
import Cookies from 'universal-cookie';
import TextField from '@material-ui/core/TextField';
import UserIcon from '../../img/user.png';
import PassIcon from '../../img/password.png';
import axios from 'axios';
import './login.css'
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
const cookies = new Cookies();


function AdminLogin() {
    const login = (e) => {
        e.preventDefault();
        // console.log('hihihi');
        let { username } = e.target
        let { password } = e.target
        console.log(username, password);
        let response = {
            username: username.value,
            password: password.value
        }
        axios.post(api + "/admin/login", response)
        .then(res => {
            console.log(res.data);
            if(res.data.username_val == false){
                alert("User not found!")
            }else{
                if(res.data.password_val == false){
                    alert("Wrong password!")
                }else{
                    let d = new Date();
                    d.setTime(d.getTime() + (10000*60*1000));
                    cookies.set('user.admin', res.data.name, { path: '/', expires: d }); 
                    cookies.set('userId.admin', res.data.userId, { path: '/', expires: d }); 
                    alert("log in successfully!")
                }
            }
        })
        .catch( err => {
            console.log(err);
        })

    }
    return(
        <div className="login">
            <div className="login-form">
                <h1 className="login-title">LOG IN</h1>
                <form onSubmit = { e => login(e) }>
                    <div className="login-content">
                        <div className="username-layout">
                            <div><img className="user-icon form-icon" src={UserIcon} /></div>
                            <div className="username-text">
                                <TextField id="username" name="username" label="Username" variant="outlined" />
                            </div>
                        </div> 
                        <div className="password-layout">
                            <div><img className="pass-icon form-icon" src={PassIcon} /></div>
                            <div className="password-text">
                                <TextField id="password" name="password" type="password" label="Password" variant="outlined" />
                            </div>
                        </div>
                    </div>
                    <div className="login-btn-layout">
                        <button type="submit" className="login-btn">LOG IN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AdminLogin