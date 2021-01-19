import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import '../index.css';
import './nav.css';
import SearchLive from './search.live';
import logo from '../img/logo.png';
import CartIcon from '../img/cart.png';
import SearchIcon from '../img/search.png';
import HeartIcon from '../img/heart2.png';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
// var classNames = require('classnames');
const cookies = new Cookies();


class Nav extends Component {
  constructor(props){
    super(props);
    this.onMenu = this.onMenu.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.logOut = this.logOut.bind(this);
    this.offMenu = this.offMenu.bind(this);
    this.offMenuClick = this.offMenuClick.bind(this);
    this.wrapperRefMenu = React.createRef();
    this.wrapperRefSearch = React.createRef();
    this.offSearchLive = this.offSearchLive.bind(this);
    this.offSearchLiveClick = this.offSearchLiveClick.bind(this);
    this.state={
       classname : 'menu-top',
       classnameSearch: "search-live-layout",
       cookies: null,
       cart : [],
       allProducts: [],
       productFilter: []
    }
  }

  componentDidMount(){
      // console.log(this.props.history);
      document.addEventListener('mousedown', this.offMenu);
      document.addEventListener('mousedown', this.offSearchLive);
      let getCookies = cookies.get('name')
      this.setState({
        cookies: getCookies
      })

      const userId = cookies.get('userId')
      const response = {
        userId : userId
      }

      axios.post(api + '/cart', response).then((res) => {
        this.setState(state => {
            return {
                cart : res.data
            }
        });
      })

      axios.get(api + "/data/").then(res =>{
        this.setState(state => {
            return {
                allProducts : res.data
            }
        });
      });
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.offMenu);
      document.removeEventListener('mousedown', this.offSearchLive);
  }

  onMenu(){
      this.setState({
         classname : this.state.classname + " menu-active"
      });
  }

  offMenu(event){
    if (this.wrapperRefMenu && !this.wrapperRefMenu.current.contains(event.target)) {
      this.setState({
          classname : "menu-top" 
      });
    }
  }

  offMenuClick(){
    this.setState({
        classname : "menu-top" 
    });
  }

  offSearchLive(event){
    if (this.wrapperRefSearch && !this.wrapperRefSearch.current.contains(event.target)) {
      this.setState({
          classnameSearch : "search-live-layout" 
      });
    }
  }

  offSearchLiveClick(){
    this.setState({
        classnameSearch : "search-live-layout" 
    });
  }

  searchProduct(e){ 
     e.preventDefault();
     var q = document.getElementById("search-text").value 
     this.props.history.push('/products/search?q=' + q);
  }

  searchLive(p){
      this.setState({
          classnameSearch : "search-live-layout search-active" 
      });
      var q = document.getElementById("search-text").value 
      if(q == ""){
        this.setState({
            classnameSearch : "search-live-layout" 
        });
      }else{
        const productFilter = p.filter(data => {
            return data.name.toLowerCase().indexOf(q.toLowerCase()) != -1
        })
        if(productFilter.length > 0){
            this.setState({
                productFilter: productFilter,
            })
        }else{
          this.setState({
              classnameSearch : "search-live-layout" 
          });
        }
      }
  }

  logOut(){
     cookies.remove('name', { path: '/' });
     cookies.remove('userId', { path: '/' });
     cookies.remove('email', { path: '/' });
     window.location.reload();
  }
  
  render(){
    
     const { productFilter} = this.state
     const { cart } = this.state;
     let { classname, classnameSearch } = this.state;

     var count = 0 ;
     for(var product of cart){
        count += product.quantity
     }
    //  console.log(classname);
    var wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return(
        <div className="site-top">
          <div className="header">
            <span className="header-text">
              {this.state.cookies && 
              <i><ul className="user-menu">
                    <b><Link className="user-name" to="#">{this.state.cookies}</Link></b>
                       <li><Link onClick={this.logOut} to="#">Log out</Link></li>
                  </ul></i> }
              {!this.state.cookies && <i><Link to="/login">Log in</Link></i>}
            </span>
            <span className="header-text"><i><Link to="/order">Orders</Link></i></span>
          </div>
          <div className="Navbar">
              <div className="navbar-left">   
                <Link className="logo" onClick = {this.onMenu} to="#">
                  <img className="logo-img" src={logo} atl="Logo"/>
                </Link>
              </div>
              <div className="navbar-middle"> 
                <ul onClick={this.offMenuClick} ref = {this.wrapperRefMenu} className={classname}>
                  <li><Link onClick={() => window.scroll(0,0)} to="/">Home</Link></li>
                  <li><Link onClick={() => window.scroll(0,0)} to="/products/original">original</Link></li>
                  <li><Link onClick={() => window.scroll(0,0)} to="/products/sport">sport</Link></li>
                  <li><Link onClick={() => window.scroll(0,0)} to="/products/football">football</Link></li>
                </ul>
              </div>
              <div className="navbar-right">
                <div className="search-layout">
                  <form onSubmit={(e) => this.searchProduct(e)} className="search-form">
                    <div className="search-bar">
                      <input
                       onKeyUp={(p) => this.searchLive(this.state.allProducts)} 
                       autocomplete="off" 
                       id="search-text" 
                       className="search-text" 
                       type="search-text" 
                       placeholder="Search..." />
                      <button className="search-btn" type="submit" to='#'>
                          <img className="search-icon" src={SearchIcon} alt="search-icon" />
                      </button>
                    </div>
                  </form>
                </div>
                <SearchLive 
                onClick={this.offSearchLiveClick} 
                classnameSearch={classnameSearch} 
                Ref={this.wrapperRefSearch} 
                productFilter={productFilter} />
                <div className="heart2-layout">
                  <Link className="heart2-logo" to="/wishlist">
                    <img className="heart2-icon" src={HeartIcon} />
                    <span className="heart2-count">{wishlist.length}</span>
                  </Link> 
                </div>
                <div className="cart">
                  <Link className="cart-logo" to="/cart">
                    <img className="cart-img" src={CartIcon} atl="Cart"/>
                    <span className="count-cart">{count}</span>
                  </Link> 
                </div>
              </div>
          </div>
        </div>
    )
  }
}
export default withRouter(Nav);
