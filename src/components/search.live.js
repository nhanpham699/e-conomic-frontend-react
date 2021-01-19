import React, { Component } from 'react';
import axios from 'axios';
import './search.live.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
export default class SearchLive extends Component{
    render(){
        const { productFilter, classnameSearch, Ref, onClick} = this.props
        return (
            <div onClick={onClick} ref={Ref} className={classnameSearch}>
                { productFilter.slice(0,4).map((products) => (
                    <Link className="search-link" to={"/products/" + products.kind + "/" + products._id}>
                        <div className="search-item">
                            <div className="search-item-left">
                                <img className="search-img" src={ api + products.image[0]} />
                            </div>
                            <div className="search-item-right">
                                <p className="search-item-type">{products.kind}</p>
                                <p className="search-item-name"><b>{products.name}</b></p>
                                <p className="search-tem-price">${products.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>    
        )
    }
}