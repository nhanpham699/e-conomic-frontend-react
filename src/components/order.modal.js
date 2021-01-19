import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
require('dotenv').config();

const api = process.env.REACT_APP_API_KEY

const cookies = new Cookies()
const userId = cookies.get("userId")
const username = cookies.get("name")
const email = cookies.get("email")
const phone = cookies.get("phone")


class OrderModal extends Component{
  constructor(props){
    super(props)
    this.state = {
       user: {},
       name: null,
       email: null,
       phone: null
    }
    this.order = this.order.bind(this);
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount(){
      axios.get(api + "/user/" + userId)
      .then(res => {
         console.log(res.data);
         (!res.data) 
         ? this.setState({
              name: username,
              email: email,
           })
         : this.setState({
              name: res.data.name,
              email: res.data.email,
              phone: res.data.phone
            })
      })
  }

  //onchange
  onChange(e){
      this.setState({
          [e.target.name] : e.target.value
      })
  }

  order(){
     const { cart, total } = this.props
     const name = document.getElementById("fullname").value
     const email = document.getElementById("email").value
     const phone = document.getElementById("phone").value
     const address = document.getElementById("address").value
     const note = document.getElementById("note").value
     const res = {
        name : name,
        email: email,
        phone: phone,
        address: address,
        note: note,
        userId: userId,
        products: cart,
        total: total
     } 
     document.getElementsByClassName('count-cart')[0].innerHTML = "0";
     axios.post(api + "/checkout", res)
     .then(res => {
        if(res.data.order){
          Swal.fire(
            'Good job!!',
            "Check out successfully",
            'success'
          ).then(result => {
              if(result) this.props.history.push("/order")
          })
        }
     }) 
  }

  render(){
    var { name, phone, email } = this.state
    const modal = this.props.modal
    const toggle = this.props.toggle
    const { className } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className + " order-modal"}>
          <ModalHeader toggle={toggle}>Order Information</ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Email" value={email} onChange={this.onChange} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="fullname">Full name</Label>
                        <Input type="text" name="name" id="fullname" placeholder="Full name" onChange={this.onChange} value={name}/>
                    </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" id="phone" placeholder="Phone" onChange={this.onChange} value={phone} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" placeholder="Address"/>
              </FormGroup>
              <FormGroup>
                <Label for="note">Note</Label>
                <Input type="textarea" name="note" id="note" placeholder="Note" />
              </FormGroup>
            </Form>   
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.order}>Check out</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(OrderModal);