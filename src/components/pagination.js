import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './pagination.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
const Example = (props) => {
  // define 
  var productType = "" ; 
  var search = "" ;
  var pageUrl = "" ;
  var brand = "" ;
  // check product type in url
  if(props.productType) productType = props.productType
  // check brand
  if(props.brand) brand = "&brand=" + props.brand  
  // check search in url
  if(props.search == "") search = "search?q="
  else if(props.search)  search = "search?q=" + props.search
  // check url page
  if(search == "")  pageUrl = "?page="
  else pageUrl = "&page="
  // pages: array of pages number , pageNow: page now
  const pages = props.pages  
  const pageNow = Number(props.page)
  const url = search + productType + pageUrl 
  // console.log(productType);
  // console.log(search);
  // console.log(pageNow);  
  return (
    <Pagination className="pagination-layout" aria-label="Page navigation">
      <PaginationItem>
        { (pageNow > 1) && <Link className="pageLink" onClick={() => window.scrollTo(0, 0)} to={"/products/" + url + (pageNow - 1) + brand}><PaginationLink previous href="javascript:void(0)" /></Link>}
        { (pageNow == 1) && <PaginationLink previous href="javascript:void(0)" /> }
      </PaginationItem>
      { pages.map(page => (
      <PaginationItem>
        {
            (pageNow == page) &&
            <PaginationLink className="page-active" href="javascript:void(0)">
                { page }
            </PaginationLink> 
        }
        {
            (pageNow != page) &&
            <Link className="pageLink" onClick={() => window.scrollTo(0, 0)} to={ "/products/" + url + page + brand }>
              <PaginationLink href="javascript:void(0)">
                  { page }
              </PaginationLink> 
            </Link>
        }
      </PaginationItem>
      ))}
      <PaginationItem>
        { (pageNow < pages.length) && <Link className="pageLink" onClick={() => window.scrollTo(0, 0)} to={"/products/" + url + (pageNow + 1) + brand}><PaginationLink next href="javascript:void(0)"/> </Link>}
        { (pageNow == pages.length) && <PaginationLink  next href="javascript:void(0)" /> }
      </PaginationItem>
    </Pagination>
  );
}

export default Example;