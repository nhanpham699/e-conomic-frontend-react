import React , { Component } from 'react'
import './order.css'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Down from '../img/down.png'
import Up from '../img/up.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
const cookies = new Cookies();
const userId = cookies.get("userId")
var i = 0

class Order extends Component{
    constructor(props){
        super(props)
        this.state = {
            order: []
        }
        this.show = this.show.bind(this)
    }
    componentDidMount(){
        
        if(document.URL.search('search?q=') < 0){
            document.getElementById("search-text").value = null
        }

        if(!userId){
            this.props.history.push("/login")
        }
        axios.get(api + "/order?userId=" + userId)
        .then( res => {
            this.setState(state => {
                return {
                    order : res.data,
                }
            });
        })
    }

    show(id){
        (document.getElementById(id).getAttribute("class").indexOf("order-active")) != -1 ? i = 0 : i = 1
        if(i % 2 == 0){ 
            document.getElementById(id).setAttribute("class", "order-products")
            document.getElementById("img-" + id).setAttribute("src", Up);
         }else{
            document.getElementById(id).setAttribute("class", "order-products order-active")
            document.getElementById("img-" + id).setAttribute("src", Down);
         }  
        i++;
        console.log(i);
    }

    render(){
        const { order } = this.state
        if(!order.length) return <h1 className="nothing">Nothing</h1>
        return(
            <div className="order">
                <h2 className="order-title">Orders</h2>
                <br /> 
                <br />
                { order.map( (order, index) => (     
                <div className="order-infor">
                    <div className="order-item">
                        <div className="order-left">
                            <div className="order-num">
                                <p>{++index}</p>
                            </div>
                            <div className="order-description">
                                <p><b>Order ID:</b> {order._id}</p>
                                <p><b>Date:</b> {order.date.slice(0,10)}</p>
                                <p><b>Total price:</b> ${order.total}</p>
                            </div>
                        </div>
                        <div className="order-right">
                            {(order.status == 0) && <p className="pending">Pending confirmation</p>}
                            {(order.status == 1) && <p className="confirmed">Confirmed</p>}
                            {(order.status == 2) && <p className="delivery">Shipping</p>}
                            {(order.status == 3) && <p className="canceled">Canceled</p>}
                            <Link onClick={(id) => this.show(order._id)}>
                                <img id={"img-" + order._id} className="order-down" src={Down} />
                            </Link>
                        </div> 
                    </div>          
                    <div id={order._id} className="order-products order-active">
                        {order.products.map(products => ( 
                        <div className="order-product-item">
                            <div className="order-product-left">
                                <div className="order-product-image">
                                    <img src={api + products.image[0]} />
                                </div>
                                <div className="order-product-description">
                                    <p><b>{products.name}</b></p>
                                    <p>Size: {products.size}</p>
                                    <p>Price: ${products.price}</p>
                                </div>
                            </div>
                            <div className="order-product-right">
                                <div className="order-product-quantity">
                                    <p>{products.quantity}</p>
                                </div>            
                            </div>  
                        </div>
                        ))}
                    </div>
                </div>
                ))}
            </div>
        )
    }
}

export default Order