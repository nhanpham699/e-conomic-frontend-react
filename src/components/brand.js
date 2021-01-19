import React, { Component } from 'react';
import queryString from 'query-string';
import './brand.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PriceRange from './range.slider';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY

class Brand extends Component{
    constructor(props){
        super(props);
        this.state = {
          products : [],
          brandProducts : [] 
        }
        this.brand = this.brand.bind(this)
    }  


    componentDidMount(){
        axios.get(api + "/data").then(res =>{
          this.setState(state => {
              return {
                  products : res.data
              }
          });
        });    
    }


    brand(value){
        const productType = this.props.productType
        var checkedValue = [];
        const inputElements = document.getElementsByClassName('brand-checkbox');
        for(var i=0; inputElements[i]; ++i){
              if(inputElements[i].checked){
                   checkedValue.push(inputElements[i].value)
              }
        }
        if(value.length){
            var brandPrice = value.toString().replace("," , "-")
            checkedValue.push(brandPrice)
        }else{
            var brandPrice = document.getElementsByClassName("MuiSlider-root")[0].children[2].value.replace(',' , '-'); 
            checkedValue.push(brandPrice)   
        }

        const brand = checkedValue.toString()
        // brand = brand.substring(0, brand.length-1)
        // console.log(brand);
        this.props.history.push("/products/" + productType + "?brand=" + brand)
    }

    render(){   
        let color = []
        let price = []
        const { products } = this.state
        for ( let product of products){
            color.push(product.color)
            price.push(product.price)
        }

        const maxPrice = Math.max(...price)
        const minPrice = Math.min(...price)
        // console.log(maxPrice, minPrice)

        var colorArray = color.filter((a,b) => {
            return color.indexOf(a) == b
        })

        var brand = queryString.parse(this.props.location.search).brand || "" 
        brand = brand.split(',')
        var brandPrice = brand.slice(-1).toString().split('-')
        brandPrice = brandPrice.map(price => {
            return Number(price)
        }) 
        // console.log(brandPrice);
        const brandColor = brand.slice(0, -1).toString()
        // console.log(brand);

        return(
            <div className="brand-layout">
                <div className="brand-price">
                   <h3>Price</h3>
                   <div className="price-range">
                        <PriceRange brandPrice={brandPrice} onChange={this.brand} maxprice={maxPrice} minprice={minPrice} />
                   </div>
                </div>
                <br /><br /> 
                <div onChange={this.brand} className="brand-color">
                    <h3 className="color-title">Color</h3>   
                    <div className="color-content">
                        {colorArray.map((color,index) => (   
                        <label class="brand-color-label"> {color}
                            <input onClick={() => window.scroll(0,0)} checked= {brandColor.indexOf(index) != -1 ? true : false} class="brand-checkbox" name="filter[]" value={index} type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                        ))}
                    </div>                 
                </div>
            </div>
        )
    }
}
export default  withRouter(Brand);