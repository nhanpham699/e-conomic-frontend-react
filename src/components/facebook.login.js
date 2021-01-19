import React, { Component } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import './facebook.login.css';
import FacebookIcon from '../img/facebook.png'

const cookies = new Cookies();


class Facebook extends Component{
    
    handleResponse = (data) => {
        let d = new Date();
        d.setTime(d.getTime() + (10000*60*1000));
        cookies.set('name', data.profile.name, { path: '/', expires: d }); 
        cookies.set('userId', data.profile.id, { path: '/', expires: d }); 
        cookies.set('email', data.profile.email, { path: '/', expires: d }); 
        // console.log(data);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'log in successfully!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
             window.location.href = "/"
          })  
        // console.log(data.profile);
      }

    render(){
        return(
            <FacebookProvider appId="1058092377942205">
                <div className="fb">
                    <LoginButton
                    className="fb-button" 
                    scope="email"
                    onCompleted={this.handleResponse}
                    >
                        <img className="fb-img" src={FacebookIcon} />
                    </LoginButton>
                </div>
            </FacebookProvider>
        )
    }
}

export default Facebook