import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import ArrowIcon from '../img/arrow.png'
import './wishlist.css';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
export default class WishList extends Component{
    constructor(props){
        super(props);
        this.removeWish = this.removeWish.bind(this);
        this.state = {
            products : []
        }
    }

    componentDidMount(){
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []

        if(document.URL.search('search?q=') < 0){
            document.getElementById("search-text").value = null
        }
        
        for(var productId of wishlist){
            axios.get(api + "/data/productId/" + productId).then(res =>{
                // console.log(res.data[0])
                this.setState({ 
                    products: [...this.state.products, res.data[0]]
                 })
            });
        }
    }

    removeWish(id){
        var count = Number(document.getElementsByClassName("heart2-count")[0].innerText) - 1
        var filnalProducts = []
        var { products } = this.state
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
        const index = wishlist.indexOf(id)
        document.getElementsByClassName("heart2-count")[0].innerHTML = count
        if(index != -1){
            wishlist.splice(index, 1)
            localStorage.setItem('wishlist', JSON.stringify(wishlist))
            for(var wish of wishlist){
                var array = products.filter(product => {
                    console.log(product._id + "--------------" + wish);
                    return product._id === wish 
                })
                for(var i of array){
                    filnalProducts.push(i)
                }
            }
        }
        console.log(filnalProducts);
        this.setState({
            products : filnalProducts 
        })
    }

    render(){
        const { products } = this.state;
        return(
            <div className="wish-list">
                <h1 className="wish-title">Wish List</h1>
                <br />
                {(!products.length) && <h1 className="nothing">Nothing..</h1>}
                {(products.length != 0) &&
                    <div className="wish-item-layout">
                    { products.map(products =>(
                        <div className="wish-item">
                            <div className="wish-left">
                                <div className="wish-image">
                                    <img src={api + products.image[0]} />
                                </div>
                                <div className="wish-description">
                                    <p><b>{products.name}</b></p>
                                    <p>Price: ${products.price}</p>
                                    <p onClick={(id) => this.removeWish(products._id)} className="wish-remove">Remove</p>
                                </div>
                            </div>
                            <div className="wish-right">
                                <Link to={"/products/" + products.kind + "/" + products._id }>
                                    <button className="to-view">
                                        <span>VIEW DETAIL</span>
                                        <img className="wish-arrow-icon" src={ArrowIcon} />
                                    </button> 
                                </Link>
                            </div>
                        </div>
                    ))}
                    </div>
                }
            </div>
        )
    }
}