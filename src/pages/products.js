import React, {Component} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import equal from 'fast-deep-equal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Pagination from "../components/pagination";
import Brand from "../components/brand"; 
import './products.css';
import Heart1Icon from '../img/heart1.png';
import Heart2Icon from '../img/heart2.png';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY

class Products extends Component{
    constructor(props){
        super(props);
        this.data = this.data.bind(this);
        this.hoverImage = this.hoverImage.bind(this);
        this.brand = this.brand.bind(this);
        this.addToHeart = this.addToHeart.bind(this);
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.state = {
            products : [],
            wishlist: wishlist
        }
    }

    componentDidMount(){
        // remove value in search text
        if(document.URL.search('search?q=') < 0){
            document.getElementById("search-text").value = null
        }
        this.brand();
    }
    // get data by product type
    data(){
        // console.log("apiiiiiiiiii:" + api);
        const productType = this.props.match.params.productType;
        axios.get(api + "/data/productType/" + productType).then(res =>{
            this.setState(state => {
                return {
                    products : res.data
                }
            });
        });
    } 

    brand(){
        const productType = this.props.match.params.productType;
        var brand = ""
        // get value brand from url and brand products
        if(document.URL.search('brand=') >= 0){
            brand += queryString.parse(this.props.location.search).brand  
            var brandArray = brand.split(','); 
            var colorArray = brandArray.slice(0, brandArray.length-1)
            var priceArray = brandArray.slice(brandArray.length-1)
            priceArray = priceArray.toString().split('-');
            
            priceArray = priceArray.map(data => {
                return Number(data)
           })

            colorArray = colorArray.map(data => {
                 return Number(data)
            })

            // console.log(colorArray, priceArray);
            const response = { 
                color : colorArray,
                productType : productType,
                price: priceArray 
            }
            axios.post(api + '/brand', response)
            .then(res =>{
                this.setState(state => {
                    return {
                        products : res.data
                    }
                });
            });  
        }
        // check url
        if(brand == ""  && document.URL.indexOf('page=') == -1 ){
            this.props.history.push("/products/" + productType)
            this.data()
        }else if(brand == "" && document.URL.indexOf('page=') > 0 ){
            this.data()
        }    
    }

    componentDidUpdate(prevProps) {
        //checking when change prop
        if(!equal(this.props.match.params.productType, prevProps.match.params.productType)){
             this.data();
        }
    
        if(!equal(this.props.location.search, prevProps.location.search)){
            this.brand();
        }
    }
    
    // add to Wish List
    addToHeart(id){
        var { wishlist } = this.state
        var count = Number(document.getElementsByClassName("heart2-count")[0].innerText)
        if(document.getElementById("heart-icon-"+id).getAttribute("class").indexOf("heart1icon") != -1 ){
            wishlist.push(id)   
            count += 1
            document.getElementsByClassName("heart2-count")[0].innerHTML = count
        }else{
            var index = wishlist.indexOf(id)
            wishlist.splice(index, 1)
            count -= 1
            document.getElementsByClassName("heart2-count")[0].innerHTML = count
        }
        this.setState({
            wishlist: wishlist
        })
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
    //when hover products
    hoverImage(id, img){
        document.getElementById("products-img-" + id).src = img
    }
    
    render(){
        const { products, wishlist } = this.state;
        const productType = this.props.match.params.productType
        const page = queryString.parse(this.props.location.search).page || 1
        const brand = queryString.parse(this.props.location.search).brand  
        const perPage = 6
        const begin = (page - 1) * perPage
        const end = page * perPage
        const pages = []
        const totalPage = Math.ceil(products.length/perPage)
        const Products = products.slice(begin,end)
        for (let i = 1 ; i <= totalPage; i++){
            pages.push(i) 
        }
        
        return(
            <div className="products-main-content">
              <div className="products-left-content">
                 <Brand productType={productType} />
              </div>  
              <div className="products-right-content">
                    <h2 className="products-title">{productType}</h2>
                    <Row>
                        { Products.map(products =>(
                            <Col className="mt-4" sm="4">  
                                <div onClick={(id) => this.addToHeart(products._id)} className="Heart-layout">
                                    <img
                                    id={"heart-icon-" + products._id} 
                                    className={((wishlist.toString().indexOf(products._id) !=-1 ) ? "heart2icon" : "heart1icon") + " Heart-icon"} 
                                    src={(wishlist.toString().indexOf(products._id) !=-1 ) ? Heart2Icon : Heart1Icon} />
                                </div>
                                <Card>
                                    <Link 
                                    onMouseOver = {(id, img) => this.hoverImage(products._id, api + products.image[1])} 
                                    onMouseOut = {(id, img) => this.hoverImage(products._id, api + products.image[0])} 
                                    to={"/products/"+products.kind+"/"+products._id} 
                                    className="products"> 
                                    <CardImg 
                                        id={"products-img-" + products._id}
                                        top width="100%" 
                                        src={api + products.image[0]} 
                                        alt="Card image cap" />
                                    <CardBody>
                                        <p className="product-type">{products.kind}</p>   
                                        <CardTitle><p className="product-name">{products.name}</p></CardTitle>
                                        <p>${products.price} </p>
                                    </CardBody>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Pagination brand={brand} page={page} productType={productType} pages={pages} />   
              </div>  
            </div>
        )
    }
}
export default Products;