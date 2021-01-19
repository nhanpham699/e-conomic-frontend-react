import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import './orders.css';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Order() {
  const classes = useStyles();
  
  const [order,setOrder] = useState([])

  useEffect(()=>{
      axios.get(api + "/admin/order")
      .then((res) => {
          setOrder(res.data.reverse())
      })
  },[])

  const changeStatus = (e,id) => {
      const status = Number(e.target.value)
      // console.log(id,status);
      axios.post(api + "/status", { status : status, id: id})
      .then(res => {
          setOrder(res.data.reverse())
      })
  }

  return (
    <div className={classes.root}>
      {order.map(or => (
      <div>
        <div className="or-status">
            <select name="select" onChange={(e,id) => changeStatus(e,or._id)}>
                <option value="0" selected={(or.status == 0) ? true : false} >Unconfirmed</option>
                <option value="1" selected={(or.status == 1) ? true : false} >Confirmed</option>
                <option value="2" selected={(or.status == 2) ? true : false} >Shipping</option>
                <option value="3" selected={(or.status == 3) ? true : false} >Cancel</option>
            </select>
        </div>
        <Accordion>
        
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
              <div className="or-infor">
                  <p><b>OrderID:</b> {or._id}</p>
                  <p><b>Date: </b> {or.date}</p>
                  <p><b>CustomerID:</b> {or.userId}</p>
                  <p><b>Total price:</b> ${or.total}</p>
              </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className="detail-order-admin">
                {or.products.map(pr => (
                <div className="order-product-item-admin">
                    <div className="order-product-left-admin">
                        <div className="order-product-image-admin">
                            <img className="or-img-admin" src={api + pr.image[0]} />
                        </div>
                        <div className="order-product-description-admin">
                            <p><b>{pr.name}</b></p>
                            <p>Size: {pr.size}</p>
                            <p>Price: {pr.price}</p>
                        </div>
                    </div>
                    <div className="order-product-right-admin">
                        <div className="order-product-quantity-admin">
                            <p><b>{pr.quantity}</b></p>
                        </div>            
                    </div>  
                </div>
                ))}
            </div>  
          </AccordionDetails>
        </Accordion> 
      </div>     
      ))}
    </div>
  );
}
