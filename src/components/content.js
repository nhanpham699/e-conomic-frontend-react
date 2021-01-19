import React, { Component } from 'react';

import ProductDetail from '../pages/product.detail';
import Products from '../pages/products';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"; 
import Login from '../pages/login';
import Home from '../pages/home';
import Register from '../pages/register';
import Cart from '../pages/cart';
import Order from '../pages/order'
import SearchProduct from '../pages/search.product';
import WishList from '../pages/wishlist';

class Content extends Component {
    render(){
        return(
            <div>
                <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path={"/wishlist"} exact component={WishList} />
                    <Route path={"/order"} exact component={Order} />
                    <Route path={"/cart"} exact component={Cart} />
                    <Route path={"/login"} exact component={Login} />
                    <Route path={"/register"} exact component={Register} />
                    <Route path={"/products/search/"} exact component={SearchProduct} />
                    <Route path={"/products/:productType"} exact component={Products} />
                    <Route path={"/products/:productType/:productId"} exact component={ProductDetail} /> 
                </Switch>    
                </div>
            </div>
        )
    }
}
export default Content