import React , {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 150
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([props.minprice, props.maxprice]);
  const { brandPrice } = props;
  const { onChange } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue)
    onChange(newValue)
  };
  // console.log(brandPrice.length);
  // console.log(value);
  // console.log(brandPrice);
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {/* ${props.minprice} - ${props.maxprice} */}
      </Typography>
      <Slider
        min={props.minprice}
        max={props.maxprice}  
        value={brandPrice.length == 1 ? [props.minprice, props.maxprice] : brandPrice}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
