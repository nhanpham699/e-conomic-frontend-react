import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import TextField from '@material-ui/core/TextField';
import UserIcon from '../img/user.png';
import PassIcon from '../img/password.png';
import ProfileIcon from '../img/profile.png';
import EmailIcon from '../img/mail.png';
import AddressIcon from '../img/address.png';
import PhoneIcon from '../img/phone.png';
import NameIcon from '../img/name.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import './register.css';
require('dotenv').config()

var md5 = require('md5');
const api = process.env.REACT_APP_API_KEY
const key = process.env.REACT_APP_PASS_KEY

const cookies = new Cookies();

var nameErr = false
var usernameErr = false
var passwordErr = false
var repasswordErr = false
var emailErr = false
var phoneErr = false

class Register extends Component{    
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.check = this.check.bind(this);
        this.testName = this.testName.bind(this);
        this.checkExist = this.checkExist.bind(this);
        this.state = {
            username: []
        }
    }  

    componentDidMount(){
        if(document.URL.search('search?q=') < 0){
            document.getElementById("search-text").value = null
        }
        axios.post(api + "/username")
        .then(res => {
            this.setState({ username : res.data} )
        });
    }

    checkExist(value){
        var flag = true
        for(var username of this.state.username){
            if(value == username){
                flag = false
                break;
            }
        }
        return flag
    }

    testName(value){
        if(value.length < 5){
            document.getElementsByClassName("register-name-err")[0].innerHTML = "Can't be less than 5 characters!" 
            document.getElementById("name").style.borderBottom = "2px solid red"
            nameErr = true 
         }else{
             document.getElementsByClassName("register-name-err")[0].innerHTML = ""
             document.getElementById("name").style.borderBottom = "1px solid black"
             nameErr = false
         }
    }

    testUsername(value){
        if(value.length < 4){
            document.getElementsByClassName("register-user-err")[0].innerHTML = "Can't be less than 4 characters!" 
            document.getElementById("username").style.borderBottom = "2px solid red"
            usernameErr = true
        }else if(value.length > 15){
            document.getElementsByClassName("register-user-err")[0].innerHTML = "Can't belarger than 15 characters!" 
            document.getElementById("username").style.borderBottom = "2px solid red"
            usernameErr = true
        }else if(!this.checkExist(value)){
            document.getElementsByClassName("register-user-err")[0].innerHTML = "Username was exist!" 
            document.getElementById("username").style.borderBottom = "2px solid red"
            usernameErr = true
        }else{
            document.getElementsByClassName("register-user-err")[0].innerHTML = ""
            document.getElementById("username").style.borderBottom = "1px solid black"
            usernameErr = false
        }
    }

    testPassword(value){
        if(value.length < 6 || value.length > 25){
            document.getElementsByClassName("register-pass-err")[0].innerHTML = "Invalid password!" 
            document.getElementById("password").style.borderBottom = "2px solid red"
            passwordErr = true
        }else{
            document.getElementsByClassName("register-pass-err")[0].innerHTML = ""
            document.getElementById("password").style.borderBottom = "1px solid black"
            passwordErr = false
        }
    }

    testRepassword(value){
        var password = document.getElementById("password").value
        if(value != password ){
            document.getElementsByClassName("register-re-pass-err")[0].innerHTML = "Invalid re-enter password!" 
            document.getElementById("repassword").style.borderBottom = "2px solid red"
            repasswordErr = true
        }else{
            document.getElementsByClassName("register-re-pass-err")[0].innerHTML = ""
            document.getElementById("repassword").style.borderBottom = "1px solid black"
            repasswordErr = false
        }
    }

    testEmail(value){
        var testEmail = /^\w+@[a-zA-Z]{3,}\.com$/i;
        if(!testEmail.test(value)){
            document.getElementsByClassName("register-email-err")[0].innerHTML = "Invalid email!" 
            document.getElementById("email").style.borderBottom = "2px solid red"
            emailErr = true
        }else{
            document.getElementsByClassName("register-email-err")[0].innerHTML = ""
            document.getElementById("email").style.borderBottom = "1px solid black"
            emailErr = false
        }
    }

    testPhone(value){
        var testPhone = /^\d{10}$/;
        if(!testPhone.test(value)){
            document.getElementsByClassName("register-phone-err")[0].innerHTML = "Invalid phone!" 
            document.getElementById("phone").style.borderBottom = "2px solid red"
            phoneErr = true
        }else{
            document.getElementsByClassName("register-phone-err")[0].innerHTML = ""
            document.getElementById("phone").style.borderBottom = "1px solid black"
            phoneErr = false
        }
    }

    check(event){
        event.preventDefault();
        const { name, value } = event.target ;
        switch(name) {
            case 'name':
                this.testName(value)
                break;
            case 'username':
                this.testUsername(value)
                break;    
            case 'password':
                this.testPassword(value)
                break;
            case 'repassword':
                this.testRepassword(value)
                break;     
            case 'email':
                this.testEmail(value)
                break; 
            case 'phone':
                this.testPhone(value)
                break;                  
          }
    }

    register(event){
        event.preventDefault();
        const name = document.getElementById("name")
        const { username, password, repassword, email, phone, profile } = event.target
        this.testName(name.value)
        this.testUsername(username.value)
        this.testPassword(password.value)
        this.testRepassword(repassword.value)
        this.testEmail(email.value)
        this.testPhone(phone.value)
        console.log(nameErr, usernameErr, passwordErr, repasswordErr, emailErr, phoneErr);
        if( nameErr == false &&
            usernameErr == false && 
            passwordErr == false && 
            repasswordErr == false &&
            emailErr == false && 
            phoneErr == false ) {
                const response = {
                    name : name.value,
                    username: username.value,
                    password: md5(md5(password.value) + key),
                    email: email.value,
                    phone: phone.value
                }
                axios.post(api + "/register", response)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Register successfully!',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {
                     this.props.history.push("/login")
                  }) 
            }else{
                console.log("Register failed");
            }
    }

    render(){
        return(   
            <div className="register">
                <div className="register-form">
                    <h1 className="register-title">SIGN UP</h1>
                    <form id="my-form" onSubmit={(event) => this.register(event)}>
                        <div className="register-content">
                            <div className="input-layout">
                                <div><img className="name-icon form-icon" src={NameIcon} /></div>
                                <div  className="input-text">
                                    <TextField onChange={this.check} id="name" name="name"  label="Name" variant="outlined" />
                                    <span className="register-name-err"></span>
                                </div>
                            </div>
                            <div  className="input-layout">
                                <div><img className="user-icon form-icon" src={UserIcon} /></div>
                                <div className="input-text">
                                    <TextField onChange={this.check} id="username" name="username"  label="Username" variant="outlined" />
                                    <span className="register-user-err"></span>
                                </div>
                            </div> 
                            <div  className="input-layout">
                                <div><img className="pass-icon form-icon" src={PassIcon} /></div>
                                <div className="input-text">
                                    <TextField onChange={this.check} id="password" type="password" name="password"  label="Password" variant="outlined" />
                                    <span className="register-pass-err"></span>
                                </div>
                            </div>
                            <div  className="input-layout">
                                <div><img className="re-pass-icon form-icon" src={PassIcon} /></div>
                                <div className="input-text">
                                    <TextField onChange={this.check} id="repassword" type="password" name="repasswrod"  label="Re-Password" variant="outlined" />
                                    <span className="register-re-pass-err"></span>
                                </div>
                            </div>
                            <div className="input-layout">
                                <div><img className="email-icon form-icon" src={EmailIcon} /></div>
                                <div className="input-text">
                                    <TextField onChange={this.check} id="email" name="email"  label="Email" variant="outlined" />
                                    <span className="register-email-err"></span>
                                </div>
                            </div>
                            <div className="input-layout">
                                <div><img className="phone-icon form-icon" src={PhoneIcon} /></div>
                                <div className="input-text">
                                    <TextField onChange={this.check} id="phone" name="phone"  label="Phone" variant="outlined" />
                                    <span className="register-phone-err"></span>
                                </div>
                            </div>
                        </div>
                        <div className="register-btn-layout">
                            <button type="submit" className="register-btn">SIGN UP</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Register