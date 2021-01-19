import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './detail.image.css'
import ModalZoom from './img.zoom.modal';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
 
export default class DetailImage extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false,
            Img: 0
        }
    }

    toggle(i){
        this.setState({
            modal : !this.state.modal,
            Img : i
        })
    }


    render() {
        const { Img } = this.state
        const { image } = this.props
        return (
            <div>
                <ModalZoom image={image[Img]} toggle={this.toggle} modal={this.state.modal} />
                <Carousel className="carousel-layout">
                    {image.map( (img,index) => (
                        <div onClick={(i) => this.toggle(index)}  className="pd-img-layout">
                            <img className="pd-img" src={api + img} />
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    }
}
 