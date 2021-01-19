import React ,{useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './statistics.css'
import { now } from 'jquery';
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

export default function Statistics(props){
    const classes = useStyles();

    const [product1, setProduct1] = useState([]);
    const [product2, setProduct2] = useState([]);
    const [month, SetMonth] = useState("")
    useEffect( () => {

        const search = props.location.search;
        let month = new URLSearchParams(search).get('month');
        const today = new Date()
        const currentMonth = (Number(today.getMonth()) + 1).toString()
        if(month == null) {
            month = currentMonth
        }
        // console.log(month);
        SetMonth(month)
        axios.get(api + '/statistics?month=' + month)
        .then( res => {
            setProduct1(res.data)
        })

        axios.get(api + '/statistic/type?month=' + month)
        .then( res => {
            setProduct2(res.data)
        })

    },[props.location.search])    

    const setMonth = (e) => {
        const month = e.target.value
        props.history.push("/admin/statistics?month=" + month)
    } 


    // const search = props.location.search;
    // const today = new Date() 

    return(
        <div className="statistic">
            <div>
                <select value={month} onChange={setMonth}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
            </div>
            <div className="statistic-table">
                { (product1.length != 0) && 
                <div className="statistic-product">
                    <h2 className="statistic-product-title">Statistic by products</h2>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Numberical order</StyledTableCell>
                                    <StyledTableCell>Image</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Quantity</StyledTableCell>
                                    <StyledTableCell>Total</StyledTableCell>
                                    <StyledTableCell>Type</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {product1.map((pr,index) => (
                                <StyledTableRow key={pr._id}>
                                    <StyledTableCell>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <img className="st-pr-img" src={api + pr.image} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {pr.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {pr.quantity}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        ${pr.price * pr.quantity}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {pr.kind}
                                    </StyledTableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                }
                
                { (product2.length != 0) &&
                <div className="statistic-type">
                    <h2 className="statistic-type-title">Statistic by types</h2>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Numberical order</StyledTableCell>
                                    <StyledTableCell>Type</StyledTableCell>
                                    <StyledTableCell>Quantity</StyledTableCell>
                                    <StyledTableCell>Total</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {product2.map((pr,index) => (
                                <StyledTableRow key={pr._id}>
                                    <StyledTableCell>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {pr.kind}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {pr.quantity}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        ${pr.price}
                                    </StyledTableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                }
            </div>   
            <div className="diagram-layout">
                {/* <Chart /> */}
            </div>
        </div>
    )
}