import React, { Component } from 'react';
import axios from 'axios';
import OrderModal from '../components/order.modal'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import Trash from '../img/delete.png';
import './cart.css';
import Cookies from 'universal-cookie';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
const cookies = new Cookies();
const userId = cookies.get("userId")

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart : [],
            modal: false
        }
        this.increaseNum = this.increaseNum.bind(this);
        this.reduceNum = this.reduceNum.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
        this.cart = this.cart.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    cart(){
        const response = {
            userId : userId
        }
        if(!userId){
            this.props.history.push("/login");
        }
        axios.post(api + '/cart', response).then((res) => {
            this.setState(state => {
                return {
                    cart : res.data
                }
            });
        })
    }

    componentDidMount(){
        if(document.URL.search('search?q=') < 0){
            document.getElementById("search-text").value = null
        }
        this.cart()
    }

    increaseNum(id){
        let count = Number(document.getElementsByClassName("count-cart")[0].innerText)
        let upCount = count + 1;
        let num = Number(document.getElementById("cart-num-" + id).value) 
        let upNum = num + 1;
        if(upNum < 6){
            document.getElementById("cart-num-" + id).value = upNum;
            this.updateCart(id, upNum)
            document.getElementsByClassName("count-cart")[0].innerHTML = upCount
        }
    }

    reduceNum(id){
        let count = Number(document.getElementsByClassName("count-cart")[0].innerText)
        let reCount = count - 1;
        let num = Number(document.getElementById("cart-num-" + id).value) 
        let reNum = num - 1;
        if(reNum > 0){
            document.getElementById("cart-num-" + id).value = reNum;
            this.updateCart(id,reNum)
            document.getElementsByClassName("count-cart")[0].innerHTML = reCount
        }
    }

    updateCart(id, num){ 
        console.log("updated");
        let response = { id : id, num: num, userId: userId }
        axios.post(api + "/updatecart", response)
        .then( res => {
            this.setState(state => {
                return {
                    cart : res.data
                }
            });
        })
    }

    deleteCart(id){
        var num = document.getElementById("cart-num-" + id).value
        let count = Number(document.getElementsByClassName("count-cart")[0].innerText)
        let reCount = count - num;
        document.getElementsByClassName("count-cart")[0].innerText = reCount
        let response = { id : id, userId: userId}
        axios.post(api + "/deletecart", response)
        .then( res => {
            this.setState(state => {
                return {
                    cart : res.data
                }
            });
        })
    }

    toggle(){
        this.setState({
            modal : !this.state.modal
        })
    }

    render(){
        const { cart } = this.state;
        var total = 0;

        for(var product of cart){
            total += product.price * product.quantity;
        }
        if(!cart.length) return <h1 className="nothing">Nothing</h1>
        return(
            <div className="shopping-cart">
                <OrderModal total={total} cart={cart} modal={this.state.modal} toggle={this.toggle} />
                <h1 className="cart-title">Shopping bag</h1>
                <br />
                <div className="cart-item-layout">
                { cart.map(products =>(
                    <div className="cart-item">
                        <div className="cart-left">
                            <div className="cart-image">
                                <img src={api + products.image[0]} />
                            </div>
                            <div className="cart-description">
                                <p><b>{products.name}</b></p>
                                <p>Size: {products.size}</p>
                                <p>Price: ${products.price}</p>
                            </div>
                        </div>
                        <div className="cart-right">
                            <div className="cart-quantity">
                                <button onClick={(id) => this.reduceNum(products._id)} className="cart-minus">-</button>
                                <input id={"cart-num-"+ products._id} type="text" value={products.quantity} />
                                <button onClick={(id) => this.increaseNum(products._id)} className="cart-plus">+</button>
                            </div>
                            <div className="cart-total">
                                <p>${products.price * products.quantity}</p>
                            </div>
                            <div className="cart-trash">
                                <button onClick={(id) => this.deleteCart(products._id)}><img src={Trash} /></button>
                            </div>
                        </div>  
                    </div>
                ))}
                </div>
                <div className="cart-total-price">
                    <p><b>Total:</b> ${total}</p>
                </div>
                <div className="cart-bottom">
                    <Link to="/products/original">
                        <button className="continue-buy">Continue to buy</button>     
                    </Link>
                    <button onClick={this.toggle} className="check-out">Check out</button>
                </div>
            </div>
        )
    }
}
export default Cart