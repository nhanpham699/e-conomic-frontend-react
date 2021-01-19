import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import './addition.modal.css';
import axios from 'axios';

require('dotenv').config()

const api = process.env.REACT_APP_API_KEY

function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AdditionModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [file1, setFile1] = useState('');
  const [file2, setFile2] = useState('');

  const el = useRef();   
  const addproduct = (e) => {
        e.preventDefault();
        const {name, price, type, color, num, description} = e.target;
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        var formData = new FormData();
        formData.append('file1', file1) //appending file
        formData.append('file2', file2) //appending file
        formData.append('name', name.value)
        formData.append('price', price.value)
        formData.append('color', color.value)
        formData.append('num', num.value)
        formData.append('type', type.value)
        formData.append('des', description.value)
        // console.log(formData);
        axios.post(api + "/addWareHouse", formData, config)
        .then(res => {
            console.log(res.data.add);
        })
  }

  const handlleChange1 = (e) => {
    const file1 = e.target.files[0]; //access file
    setFile1(file1);
  }
  const handlleChange2 = (e) => {
    const file2 = e.target.files[0]; //access file
    setFile2(file2);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add product</h2>
      <form onSubmit={addproduct} noValidate autoComplete="off">
        <TextField name="name" className="add-input" label="Name" />
        <TextField name="price" className="add-input" label="Price" />
        <TextField name="type" className="add-input" label="Type" />
        <TextField name="color" className="add-input" label="Color" />
        <TextField name="num" className="add-input" label="Quantity" />
        <TextField name="description" className="add-input" label="Description" />
        <input ref={el} onChange={(e) => handlleChange1(e)} className="add-image-file" type="file" label="Image" />
        <input ref={el} onChange={(e) => handlleChange2(e)} className="add-image-file" type="file" label="Image" />  
        <button className="add-comfirm" type="submit">Comfirm</button>       
       </form> 
    </div>
  );
  const { open, handleClose } = props;  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
