import React, { useState, useEffect, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './products.css';
import axios from 'axios';
import Pen from '../../img/pen.png';
import Disable from '../../img/cancel.png';
import Delete from '../../img/delete.png';
import Save from '../../img/diskette.png';
import Plus from '../../img/plus.png';
import AdditionModal from '../components/addtion.modal';
require('dotenv').config()

const api = process.env.REACT_APP_API_KEY

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Product() {
  const el = useRef(); 
  const classes = useStyles();
  const [product, setProduct] = useState([])
  const [id, setId] = useState(null)
  const [file1, setFile1] = useState('')
  const [file2, setFile2] = useState('')
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [nameInput, setNameInput] = useState({
        id: null,
        name: null,
        price: null,
        color: null,
        num: null,
        type: null
  });

  useEffect(() => {
      axios.get(api + "/data")
      .then(res => {
          setProduct(res.data.reverse())
      })
  }, [])

  const updatePr = (id) => {
      setNameInput({
          id: null,
          name: null,
          price: null,
          color: null,
          num: null,
          type: null
      })
      setId(id)
  }


  const handlleChange1 = (e) => {
      const file1 = e.target.files[0]; //access file
      // console.log(e.target)
      setFile1(file1);
  }

  const handlleChange2 = (e) => {
      const file2 = e.target.files[0]; //access file
      // console.log(e.target)
      setFile2(file2);
  }

  const uploadfile = (id,e) => {
      let name = document.getElementById("name-"+id).value
      let price = document.getElementById("price-"+id).value
      let color = document.getElementById("color-"+id).value
      let num = document.getElementById("num-"+id).value
      let type = document.getElementById("type-"+id).value
      const config = {     
          headers: { 'content-type': 'multipart/form-data' }
      }
      var formData = new FormData();
      formData.append('file2', file2)
      formData.append('file1', file1) //appending file
      formData.append('id', id)
      formData.append('name', name)
      formData.append('price', price)
      formData.append('color', color)
      formData.append('num', num)
      formData.append('type', type)
      axios.post(api + "/updateWareHouse", formData, config)
      .then(res => {
          setProduct(res.data.reverse())
          setId(null)
      })
    }
    const onChange = (e) => {
       setNameInput({ 
         [e.target.name] : e.target.value 
       })
      //  console.log(e.target.name, e.target.value);
    }
    const deleteProduct = (id) => {
        axios.post(api + "/deleteFromWareHouse", { id: id })
        .then(res => {
            setProduct(res.data.reverse())
        })
    }

    const searchPr = (e,product) => {
        const q = e.target.value.toLowerCase();
        axios.get(api + "/data/search?q=" + q)
        .then(res => {
            setProduct(res.data.reverse())
        })

    }

  return (
    <div>
      <AdditionModal handleClose={handleClose} open={open} />
      <div>
          <TextField name="search" onKeyUp={searchPr} className="search-ip-admin" label="search" />
          <img className="plus-icon" onClick={handleOpen} src={Plus} />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Color</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Update</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((product) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell component="th" scope="row">
                   <input disabled="false" className="update-ip update-id" value={product._id} />
                </StyledTableCell>
                  {(id != product._id)  && <img className="product-img-admin" src={api + product.image[0]} /> }
                  { (id === product._id) && <input ref={el} className="update-ip update-file" name="file" onChange={(e) => handlleChange1(e)} type="file"/>}
                  { (id === product._id) && <input ref={el} className="update-ip update-file" name="file" onChange={(e) => handlleChange2(e)} type="file"/>}
                <StyledTableCell>
                  {(id === product._id) && <input id={"name-" + product._id} name={"name"} className="update-ip update-border" value={
                    (nameInput.id != null ||
                    nameInput.name !=null || 
                    nameInput.price !=null || 
                    nameInput.type !=null || 
                    nameInput.num !=null || 
                    nameInput.color !=null
                    ) ? nameInput.name : product.name} onChange={onChange} />}
                  {(id != product._id) && <input disabled="false" className="update-ip" value={product.name} />}
                </StyledTableCell>
                <StyledTableCell>
                  {(id === product._id) && <input id={"price-" + product._id} name="price" className="update-ip update-border" value={
                    (nameInput.id != null ||
                    nameInput.name !=null || 
                    nameInput.price !=null || 
                    nameInput.type !=null || 
                    nameInput.num !=null || 
                    nameInput.color !=null
                    ) ? nameInput.price : product.price} onChange={onChange} />}
                  {(id != product._id) && <input disabled="false" className="update-ip" value={product.price} />}
                </StyledTableCell>
                <StyledTableCell>
                  {(id === product._id) && <input id={"type-" + product._id} name="type" className="update-ip update-border" value={
                    (nameInput.id != null ||
                    nameInput.name !=null || 
                    nameInput.price !=null || 
                    nameInput.type !=null || 
                    nameInput.num !=null || 
                    nameInput.color !=null
                    ) ? nameInput.type : product.kind} onChange={onChange} />}
                  {(id != product._id) && <input disabled="false" className="update-ip" value={product.kind} />}
                </StyledTableCell>
                <StyledTableCell>
                  {(id === product._id) && <input id={"color-" + product._id} name="color" className="update-ip update-border" value={
                    (nameInput.id != null ||
                    nameInput.name !=null || 
                    nameInput.price !=null || 
                    nameInput.type !=null || 
                    nameInput.num !=null || 
                    nameInput.color !=null
                    ) ? nameInput.color : product.color} onChange={onChange}/>}
                  {(id != product._id) && <input disabled="false" className="update-ip" value={product.color} />} 
                </StyledTableCell>
                <StyledTableCell>
                  {(id === product._id) && <input id={"num-" + product._id} name="num" className="update-ip update-border" value={(nameInput.num != null) ? nameInput.num : product.quantity} onChange={onChange} />}
                  {(id != product._id) && <input disabled="false" className="update-ip" value={product.quantity} />}
                </StyledTableCell>
                <StyledTableCell>
                  {(id != product._id) && <img onClick={(id) => updatePr(product._id)} className="pen-icon-admin" src={Pen} /> }
                  {(id === product._id) && <img className="save-icon-admin" onClick={(id) => uploadfile(product._id)} src={Save} /> }
                  {(id === product._id) && <img onClick={()=>setId(null)} className="disable-icon-admin" src={Disable} />}
                </StyledTableCell>
                <StyledTableCell>
                    <img onClick ={ (id) => deleteProduct(product._id)} className="delete-icon-admin" src={Delete} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>  
  );
}
