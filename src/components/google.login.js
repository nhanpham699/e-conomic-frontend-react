import React , {Component} from 'react';
import GoogleLogin from 'react-google-login';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import './google.login.css'
import GoogleIcon from '../img/google.png'

const cookies = new Cookies();


class Google extends Component {
     responseGoogle = (data) => {
        let d = new Date();
        d.setTime(d.getTime() + (10000*60*1000));
        console.log(data);
        cookies.set('name', data.profileObj.name, { path: '/', expires: d }); 
        cookies.set('userId', data.profileObj.googleId, { path: '/', expires: d }); 
        cookies.set('email', data.profileObj.email, { path: '/', expires: d }); 
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'log in successfully!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
             window.location.href = "/"
          })  
        // console.log(data.profileObj);
    }
    render(){
        return(
            <div className="gg">
                <GoogleLogin
                    clientId="720037714149-us0f5cak5h846vgfitlq4bgjk34lbrhp.apps.googleusercontent.com"
                    render={renderProps => (
                    <button className="gg-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <img className="gg-img" src={GoogleIcon} />
                    </button>
                    )}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}

export default Google
