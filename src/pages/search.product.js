import React, {Component} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import equal from 'fast-deep-equal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Pagination from "../components/pagination"    
import './products.css';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY

class SearchProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            products : []
        }
        this.updateData = this.updateData.bind(this);
        this.hoverImage = this.hoverImage.bind(this);
    }

    hoverImage(id, img){
      document.getElementById("products-img-" + id).src = img
    }

    componentDidMount(){
        this.updateData();
        // console.log(this.props.location.search);
    }
    componentDidUpdate(prevProps) {
        if(!equal(this.props.location.search, prevProps.location.search)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
          this.updateData();
        }
    }

    updateData(){
        const parsed = queryString.parse(this.props.location.search);
        // console.log(parsed.q);
        axios.get(api + "/data/search?q=" + parsed.q).then(res =>{
            this.setState(state => {
                return {
                    products : res.data
                }
            });
        });
    }
    
    render(){
        const { products } = this.state;
        const search = queryString.parse(this.props.location.search).q;
        const page = queryString.parse(this.props.location.search).page || 1  
        const perPage = 6
        const begin = (page - 1) * perPage
        const end = page * perPage
        const pages = []
        const totalPage = Math.ceil(products.length/perPage)
        console.log(search);
        for (let i = 1 ; i <= totalPage; i++){
            pages.push(i) 
        }
        const Products = products.slice(begin,end)
        console.log(search);

        if(!Products.length){
           return <h1 className="nothing">NOTHING..</h1>
        }
        return(
            <Container>
              {/* <h2 className="products-title">{productType + "s"}</h2> */}
              <br />
              <Row>
                { Products.map(products =>(
                    <Col sm="4">  
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

              <Pagination page={page} search={search} pages={pages} />     

            </Container>
        )
    }
}
export default SearchProduct;