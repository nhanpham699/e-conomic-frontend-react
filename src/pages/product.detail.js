import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import axios from 'axios';
import equal from 'fast-deep-equal';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import './product.detail.css';
import DetailImage from '../components/detail.image';
import LearnMore from '../components/learnmore.modal';
import BusIcon from '../img/bus.png';
import ListIcon from '../img/list.png';
import ArrowIcon from '../img/arrow.png'
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
const cookies = new Cookies();

class ProductDetail extends Component{
    constructor(props){
        super(props);
        this.updateData = this.updateData.bind(this);
        this.increaseSize = this.increaseSize.bind(this);
        this.reduceSize = this.reduceSize.bind(this);
        this.increaseNum = this.increaseNum.bind(this);
        this.reduceNum = this.reduceNum.bind(this);
        this.addCart = this.addCart.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            products : [],
            modal: false,
            type: 10,
            similarProduct:[]
        }
    }

    componentDidMount(){
        if(document.URL.search('search?q=') < 0){
            document.getElementById("search-text").value = null
        }
        this.updateData();
        const productType = this.props.match.params.productType;
        axios.get(api + "/data/productType/" + productType).then(res =>{
            this.setState(state => {
                return {
                    similarProduct : res.data
                }
            });
        });
        // console.log(this.props.match.params.productId);
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.match.params.productId, prevProps.match.params.productId)) 
        {
          this.updateData();
        }
    }

    updateData(){
        const productId = this.props.match.params.productId;
        axios.get(api + "/data/productId/" + productId).then(res =>{
            this.setState(state => {
                return {
                    products : res.data
                }
            });
        });
    }

    increaseSize(){
        let size = Number(document.getElementsByClassName("pd-value-size")[0].value) 
        let upSize = size + 1;
        if(size <43){
            document.getElementsByClassName("pd-value-size")[0].value = upSize;
        }
    }

    reduceSize(){
        let size = Number(document.getElementsByClassName("pd-value-size")[0].value) 
        let reSize = size - 1;
        if(size > 38){
            document.getElementsByClassName("pd-value-size")[0].value = reSize;
        }
    }

    increaseNum(){
        let num = Number(document.getElementsByClassName("pd-value-num")[0].value) 
        let upNum = num + 1;
        if(upNum < 6){
            document.getElementsByClassName("pd-value-num")[0].value = upNum
        }
    }

    reduceNum(){
        let num = Number(document.getElementsByClassName("pd-value-num")[0].value) 
        let reNum = num - 1;
        if(num > 1){
            document.getElementsByClassName("pd-value-num")[0].value = reNum;
        }
    }

    addCart(id){
        if(!cookies.get("userId")){
            Swal.fire(
                'Sorry!!',
                "You must be logged in if you want to add products!",
                'warning'
              )
        }else{
            let userId = cookies.get('userId')
            let count = Number(document.getElementsByClassName("count-cart")[0].innerText)
            let num = Number(document.getElementsByClassName("pd-value-num")[0].value);
            let size = Number(document.getElementsByClassName("pd-value-size")[0].value);
            let upCount = count + num; 
            console.log(id);
            let response = {
                id : id,
                num: num,
                size: size,
                userId: userId
            }
            axios.post(api + "/addcart", response)
            .then(res => {
                if(res.data.add == false){
                    Swal.fire(
                        'Sorry!!',
                        "You can't add more 5 products!",
                        'warning'
                    )
                }else{
                    Swal.fire(
                        'Good job!!',
                        "Add products successfully!",
                        'success'
                    )
                    document.getElementsByClassName("count-cart")[0].innerText = upCount  
                }
            })
        }
        
    }

    toggle(k){
        this.setState({
            modal : !this.state.modal,
            type: k
        })
    }

    render(){ 
        const { products } = this.state;
        const { similarProduct } = this.state
        const productId = this.props.match.params.productId;
        const similar = similarProduct.filter(dt => {
            return dt._id != productId
        })
        return (
            <div className="pd-page">
                <LearnMore modal={this.state.modal} type={this.state.type} toggle={this.toggle} />
                { products.map(products =>(
                    <div className="product-detail">
                       <div className="pd-preview">
                            <DetailImage image={products.image} />
                       </div>
                       <div className="pd-data">
                           <h1 className="pd-name"><i>{products.name}</i></h1>
                           <p className="pd-description">{products.description}</p> 
                           <p className="pd-price">${products.price}</p>
                           <div className="quantity-size">
                                <div className="pd-quantity">
                                    <span className="pd-quantity-header">Quantity</span>
                                    <div className="pd-quantity-btn">
                                        <button onClick={this.reduceNum} className="pd-reduction">-</button>
                                        <input className="pd-value-num" value="1" />
                                        <button onClick={this.increaseNum} className="pd-increase">+</button>
                                    </div>
                                </div>
                                <div className="pd-size">
                                    <span className="pd-size-header">Size</span>
                                    <div className="pd-size-btn">
                                        <button onClick={this.reduceSize} className="pd-reduction">-</button>
                                        <input className="pd-value-size" value="38" />
                                        <button onClick={this.increaseSize} className="pd-increase">+</button>
                                    </div>
                                </div>
                           </div>
                           <button onClick={(id) => this.addCart(products._id)} className="pd-buy">
                                <span>ADD TO CART</span>
                                <img className="arrow-icon" src={ArrowIcon} />
                           </button> 
                           <div className="pd-school">
                               <img className="bus-icon" src={BusIcon} /> 
                               <div className="school-text">
                                    <Link onClick={(k) => this.toggle(0)}>LEARN MORE</Link> 
                                    <p>READY FOR SCHOOL</p>
                               </div>
                           </div>           
                           <div className="pd-notsure">
                               <img className="list-icon" src={ListIcon} /> 
                               <div className="notsure-text">
                                    <Link onClick={(k) => this.toggle(1)}>LEARN MORE</Link> 
                                    <p>Not the right size or colour? Visit our returns page for details.</p>
                                </div>
                           </div>                
                       </div>
                    </div> 
                ))}
                <div className="pd-similar">
                <h3>Similar Products</h3>
                    <br/>
                    <Row onClick={() => window.scrollTo(0, 0)} className="similar-row">
                        { similar.slice(0,3).map(products =>(
                            <Col className="similar-col">  
                            <Card className="similar-card">
                                <Link 
                                to={"/products/"+products.kind+"/"+products._id} 
                                className="products"> 
                                <CardImg 
                                    top width="100%" 
                                    src={api + products.image[0]} 
                                    alt="Card image cap" />
                                <CardBody className="similar-cardbody">
                                    <p className="product-type">{products.kind}</p>   
                                    <CardTitle><p className="product-name">{products.name}</p></CardTitle>
                                    <p>${products.price} </p>
                                </CardBody>
                                </Link>
                            </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        )
    }
}    
export default  ProductDetail