import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Route } from "react-router-dom"; 

import Nav from './components/nav';
import Content from './components/content';
import Cookies from 'universal-cookie';
import TopProducts from './components/top.products';
import Footer from './components/footer';
import ChatIcon from './components/chat.icon';
import Chat from './components/chat';
const cookies = new Cookies();

class AppClient extends Component{

  constructor(){
      super();
      this.state = {
          isCompleted : false
      }
      this.chat = this.chat.bind(this);
  }

  chat() {
      if(!cookies.get('name')){
          // alert("Please log in to continue!!")
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Please login to go to message!!!',
              showConfirmButton: false,
              timer: 1500
          })
      }else{
          this.setState({
            isCompleted : !this.state.isCompleted
          })
        }
  }
      

  render(){
    return (
      <Router>        
        <div className="App">
            <Nav />
            <TopProducts />
            <div className="content">
                <Content />
            </div>  
            <div className="footer">
              <Footer />
            </div>  
            {!this.state.isCompleted && <ChatIcon onClick={this.chat} />}
            {this.state.isCompleted && <Chat onClick={this.chat} />}
        </div>
      </Router>
    );
  }
}
export default AppClient;
