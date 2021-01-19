import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import Products from '../pages/products';
import Orders from '../pages/orders';
import Statistics from '../pages/statistics';
import './content.css'
import Chat from './chat'

export default function Content(){
    console.log("content rendering...");
    return(
        <div className="admin-content">
            <Switch>
                <Route path="/admin/messages" exact component={Chat} />
                <Route path="/admin/products" exact component={Products} />
                <Route path="/admin/orders" exact component={Orders} />
                <Route path="/admin/statistics" exact component={Statistics} />
            </Switch>
        </div>
    )
}