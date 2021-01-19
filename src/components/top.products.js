import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './top.products.css'
import ProductCarousel from './product.carousel';

export default function TopProducts() {
  return (
    <div className="top-products">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Top products</Typography>
        </AccordionSummary>
        {/* <AccordionDetails> */}
            <ProductCarousel />
        {/* </AccordionDetails> */}
      </Accordion>
    </div>
  );
}
