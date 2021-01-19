import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Carousel from 'react-elastic-carousel';
import './product.carousel.css';
require('dotenv').config()


const api = process.env.REACT_APP_API_KEY

class ProductCarousel extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          products: []
      }
  }


  componentDidMount(){
      axios.get(api + "/topproducts")
      .then(res => {
          this.setState({
              products: res.data
          })
      })
  }

  render() {
    const { products } = this.state
    var settings = {
        dots: false,
        infinite : true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1150,
                settings:{
                    slidesToShow: 4,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 960,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 580,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    } 
    return (
          <div className="products-carousel">
              <Slider {...settings}>  
                {products.slice(0,9).map( product => (
                    <div className="card-carousel">
                    <Card>
                        <Link 
                        to={"/products/"+product.kind+"/"+product.productId} 
                        className="products">
                        <CardImg 
                            top width="100%" 
                            src={api + product.image} 
                            alt="Card image cap" />
                        <CardBody> 
                            <CardTitle><p className="product-name">{product.name}</p></CardTitle>
                            <p>${product.price} </p>
                        </CardBody>
                        </Link>
                    </Card>
                    </div>
                ))}
              </Slider>
          </div>
    );
  }
}
export default ProductCarousel